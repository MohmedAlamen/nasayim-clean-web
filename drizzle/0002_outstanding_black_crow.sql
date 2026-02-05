CREATE TABLE `customerSubscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customerId` int NOT NULL,
	`planId` int NOT NULL,
	`status` enum('active','paused','cancelled') NOT NULL DEFAULT 'active',
	`startDate` timestamp NOT NULL,
	`renewalDate` timestamp NOT NULL,
	`billingCycle` enum('monthly','annual') NOT NULL,
	`servicesUsed` int DEFAULT 0,
	`autoRenew` enum('true','false') NOT NULL DEFAULT 'true',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `customerSubscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `promotions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(50) NOT NULL,
	`description` text,
	`discountType` enum('percentage','fixed') NOT NULL,
	`discountValue` varchar(10) NOT NULL,
	`maxUses` int,
	`currentUses` int DEFAULT 0,
	`minOrderAmount` varchar(10),
	`validFrom` timestamp NOT NULL,
	`validUntil` timestamp NOT NULL,
	`isActive` enum('true','false') NOT NULL DEFAULT 'true',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `promotions_id` PRIMARY KEY(`id`),
	CONSTRAINT `promotions_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `ratings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`customerId` int NOT NULL,
	`technicianId` int,
	`rating` int NOT NULL,
	`review` text,
	`serviceQuality` int,
	`punctuality` int,
	`professionalism` int,
	`isVerified` enum('true','false') NOT NULL DEFAULT 'false',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ratings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptionPlans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`monthlyPrice` varchar(10) NOT NULL,
	`annualPrice` varchar(10),
	`servicesIncluded` int NOT NULL,
	`discountPercentage` int DEFAULT 0,
	`features` text,
	`isActive` enum('true','false') NOT NULL DEFAULT 'true',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptionPlans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `technicianTracking` (
	`id` int AUTO_INCREMENT NOT NULL,
	`technicianId` int NOT NULL,
	`orderId` int,
	`latitude` varchar(20) NOT NULL,
	`longitude` varchar(20) NOT NULL,
	`accuracy` int,
	`status` enum('available','en_route','on_site','completed') NOT NULL,
	`eta` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `technicianTracking_id` PRIMARY KEY(`id`)
);
