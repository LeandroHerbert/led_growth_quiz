CREATE TABLE `quiz_completions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`session_id` varchar(64) NOT NULL,
	`primary_model` varchar(10) NOT NULL,
	`scores` text NOT NULL,
	`completed_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quiz_completions_id` PRIMARY KEY(`id`),
	CONSTRAINT `quiz_completions_session_id_unique` UNIQUE(`session_id`)
);
--> statement-breakpoint
CREATE TABLE `quiz_responses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`session_id` varchar(64) NOT NULL,
	`question_id` int NOT NULL,
	`selected_model` varchar(10) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quiz_responses_id` PRIMARY KEY(`id`)
);
