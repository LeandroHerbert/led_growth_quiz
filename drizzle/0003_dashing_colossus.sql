CREATE TABLE `quiz_leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`session_id` varchar(64) NOT NULL,
	`nome` varchar(255) NOT NULL,
	`whatsapp` varchar(20) NOT NULL,
	`email` varchar(320) NOT NULL,
	`resultado_modelo` varchar(10),
	`crm_status` enum('novo','em_contato','sessao_marcada','sessao_realizada','comprou','nao_comprou') NOT NULL DEFAULT 'novo',
	`data_sessao` varchar(30),
	`notas` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `quiz_leads_id` PRIMARY KEY(`id`)
);
