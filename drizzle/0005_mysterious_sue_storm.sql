CREATE TABLE `videos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`file_key` varchar(500) NOT NULL,
	`url` text NOT NULL,
	`mime_type` varchar(100) NOT NULL DEFAULT 'video/mp4',
	`tamanho` int,
	`ativo` enum('sim','nao') NOT NULL DEFAULT 'nao',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `videos_id` PRIMARY KEY(`id`)
);
