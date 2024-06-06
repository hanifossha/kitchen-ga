CREATE TABLE `users` (
	`id` text,
	`name` text DEFAULT '' NOT NULL,
	`int_modifiers` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `shift_entries` (
	`id` text,
	`personel_id` text NOT NULL,
	`task` text DEFAULT '' NOT NULL,
	`job` text DEFAULT '' NOT NULL,
	`preferred_shifts` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` text,
	`name` text DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL
);
