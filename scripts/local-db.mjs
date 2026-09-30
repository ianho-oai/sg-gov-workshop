import { DatabaseSync } from 'node:sqlite';
import { readdirSync, readFileSync } from 'node:fs';
export function localDatabase(path = ':memory:') {
  const sqlite = new DatabaseSync(path);
  sqlite.exec('CREATE TABLE IF NOT EXISTS local_migrations (name TEXT PRIMARY KEY)');
  for (const name of readdirSync(new URL('../drizzle/', import.meta.url)).filter(x => x.endsWith('.sql')).sort()) {
    if (sqlite.prepare('SELECT name FROM local_migrations WHERE name = ?').get(name)) continue;
    sqlite.exec('BEGIN');
    try {
      sqlite.exec(readFileSync(new URL('../drizzle/' + name, import.meta.url), 'utf8'));
      sqlite.prepare('INSERT INTO local_migrations (name) VALUES (?)').run(name);
      sqlite.exec('COMMIT');
    } catch (e) { sqlite.exec('ROLLBACK'); throw e; }
  }
  return {
    prepare(sql) {
      const stmt = sqlite.prepare(sql);
      const prepared = args => ({
        bind: (...values) => prepared(values),
        first: async () => stmt.get(...args) || null,
        run: async () => ({ success: true, meta: stmt.run(...args) }),
        all: async () => ({ results: stmt.all(...args) }),
      });
      return prepared([]);
    },
    close() { sqlite.close(); },
  };
}
