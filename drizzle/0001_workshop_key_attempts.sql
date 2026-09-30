CREATE TABLE `workshop_key_attempts` (
	`scope` text PRIMARY KEY NOT NULL,
	`used` integer DEFAULT 0 NOT NULL
);
