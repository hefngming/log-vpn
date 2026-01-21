ALTER TABLE `nodes` MODIFY COLUMN `country` varchar(50);--> statement-breakpoint
ALTER TABLE `nodes` MODIFY COLUMN `countryCode` varchar(10);--> statement-breakpoint
ALTER TABLE `nodes` MODIFY COLUMN `protocol` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `nodes` ADD `xuiId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `nodes` ADD `displayName` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `nodes` ADD `encryptedConfig` text NOT NULL;--> statement-breakpoint
ALTER TABLE `nodes` ADD `streamSettings` text;--> statement-breakpoint
ALTER TABLE `nodes` ADD `lastSyncAt` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `nodes` ADD CONSTRAINT `nodes_xuiId_unique` UNIQUE(`xuiId`);