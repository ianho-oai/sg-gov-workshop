CREATE TABLE `workshop_connections` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`event` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `workshop_quotas` (
	`scope` text PRIMARY KEY NOT NULL,
	`used` integer DEFAULT 0 NOT NULL
);
