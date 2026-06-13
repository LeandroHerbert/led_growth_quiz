CREATE TABLE `evento_leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(255) NOT NULL,
	`whatsapp` varchar(20) NOT NULL,
	`email` varchar(320) NOT NULL,
	`status` enum('lead','1a_mensagem','2a_mensagem','3a_mensagem','participou','nao_participou','marcou_reuniao','comprou','nao_comprou') NOT NULL DEFAULT 'lead',
	`notas` text,
	`evento_data` varchar(50),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `evento_leads_id` PRIMARY KEY(`id`)
);
