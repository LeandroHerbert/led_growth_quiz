CREATE TABLE `agendamentos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`whatsapp` varchar(20) NOT NULL,
	`empresa` varchar(255),
	`data_hora` varchar(30) NOT NULL,
	`duracao` int NOT NULL DEFAULT 30,
	`status` enum('pendente','confirmado','cancelado','realizado') NOT NULL DEFAULT 'pendente',
	`google_event_id` varchar(255),
	`meet_link` varchar(500),
	`notas` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `agendamentos_id` PRIMARY KEY(`id`)
);
