-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 26, 2025 at 04:46 PM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `announcement_id` int NOT NULL COMMENT 'Primary key for the announcements table.',
  `title` varchar(255) NOT NULL COMMENT 'The title of the announcement.',
  `content` text NOT NULL COMMENT 'The full content of the announcement.',
  `category` enum('News','Event','Notice') DEFAULT 'News' COMMENT 'The category of the announcement.',
  `author_id` int NOT NULL COMMENT 'Foreign key referencing the user (Secretary/Councilor) who created the announcement.',
  `approved_by` int DEFAULT NULL COMMENT 'Foreign key referencing the user (Chairperson) who approved the announcement.',
  `image` varchar(500) DEFAULT NULL COMMENT 'Path to an optional image for the announcement.',
  `status` enum('Draft','Pending Approval','Approved','Rejected') DEFAULT 'Draft' COMMENT 'The current status of the announcement.',
  `publish_date` datetime DEFAULT NULL COMMENT 'The date when the announcement should become public.',
  `date_created` datetime NOT NULL,
  `last_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`announcement_id`, `title`, `content`, `category`, `author_id`, `approved_by`, `image`, `status`, `publish_date`, `date_created`, `last_updated`) VALUES
(1, 'Fiesta', 'smckmkcskcns', 'News', 5, 1, NULL, 'Approved', '2025-11-03 11:30:11', '2025-11-03 11:13:34', '2025-11-03 11:30:11'),
(2, 'Barangay Clean-Up Drive', 'Join us this Saturday for a community clean-up drive at the town plaza. Let’s keep our surroundings clean!', 'Event', 5, 1, 'uploads/announcements/cleanup.png', 'Approved', '2025-11-22 08:00:00', '2025-11-20 09:00:00', '2025-11-20 09:00:00'),
(3, 'New Scholarship Program', 'We are launching a new scholarship program for deserving students. Applications are now open!', 'News', 5, 1, NULL, 'Approved', '2025-11-21 10:00:00', '2025-11-20 09:10:00', '2025-11-20 09:10:00'),
(4, 'Monthly Health Check-Up', 'The monthly free health check-up will be held at the barangay hall next Friday. Everyone is encouraged to participate.', 'Notice', 5, 1, 'uploads/announcements/health-checkup.jpg', 'Approved', '2025-11-25 09:00:00', '2025-11-20 09:20:00', '2025-11-20 09:20:00'),
(5, 'Sports Tournament Registration', 'Registration for the barangay sports tournament is now open! Sign up your teams and join the fun.', 'Event', 7, 1, NULL, 'Pending Approval', '2025-11-23 09:00:00', '2025-11-20 09:30:00', '2025-11-20 09:30:00'),
(6, 'Holiday Celebration Schedule', 'Here is the schedule of activities for the upcoming holiday celebration. Everyone is welcome to join!', 'News', 5, NULL, 'uploads/images/holiday.jpg', 'Draft', '2025-12-01 08:00:00', '2025-11-20 09:40:00', '2025-11-20 09:40:00');

-- --------------------------------------------------------

--
-- Table structure for table `expenditures`
--

CREATE TABLE `expenditures` (
  `expenditure_id` int NOT NULL COMMENT 'Unique ID for each expenditure entry.',
  `project_id` int NOT NULL COMMENT 'The project this expenditure belongs to.',
  `description` varchar(500) NOT NULL COMMENT 'Description of the expenditure (e.g., ''Venue rental'', ''Food supplies'').',
  `category` varchar(100) DEFAULT NULL COMMENT 'Category of expenditure (e.g., ''Materials'', ''Services'', ''Transportation'').',
  `amount` decimal(12,2) NOT NULL COMMENT 'Amount spent for this item.',
  `date_incurred` datetime DEFAULT NULL COMMENT 'Date when the expenditure was made.',
  `receipt_path` varchar(500) DEFAULT NULL COMMENT 'File path to the uploaded receipt or proof of payment.',
  `recorded_by` int NOT NULL COMMENT 'Treasurer who recorded this expenditure.',
  `remarks` text COMMENT 'Additional notes about the expenditure.',
  `date_created` datetime NOT NULL,
  `last_updated` datetime NOT NULL,
  `status` enum('Pending','Approved','Rejected') DEFAULT 'Pending' COMMENT 'Approval status of the expenditure.',
  `reviewed_by` int DEFAULT NULL COMMENT 'Chairperson who reviewed this expenditure.',
  `date_reviewed` datetime DEFAULT NULL COMMENT 'Date when the expenditure was reviewed.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `expenditures`
--

INSERT INTO `expenditures` (`expenditure_id`, `project_id`, `description`, `category`, `amount`, `date_incurred`, `receipt_path`, `recorded_by`, `remarks`, `date_created`, `last_updated`, `status`, `reviewed_by`, `date_reviewed`) VALUES
(1, 3, 'Food Supply', 'Food', 100000.00, '2025-11-20 00:00:00', 'uploads/financials/financial-report-1763644554838-307404396.pdf', 6, '', '2025-11-20 13:15:54', '2025-11-20 13:15:54', 'Pending', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedback_id` int NOT NULL COMMENT 'Primary key for the feedback table.',
  `subject` varchar(255) NOT NULL COMMENT 'The subject or title of the feedback.',
  `message` text NOT NULL COMMENT 'The detailed content of the feedback.',
  `category` varchar(100) DEFAULT NULL COMMENT 'Category of the feedback (e.g., Suggestion, Complaint, Inquiry).',
  `submitted_by` int DEFAULT NULL COMMENT 'Foreign key referencing the user ID (from sysusers) who submitted the feedback.',
  `status` enum('New','In Progress','Resolved','Archived') DEFAULT 'New' COMMENT 'The current status of the feedback.',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `submitted_by_name` varchar(255) DEFAULT NULL COMMENT 'Name of the person who submitted feedback, if not a registered user.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feedback_id`, `subject`, `message`, `category`, `submitted_by`, `status`, `createdAt`, `updatedAt`, `submitted_by_name`) VALUES
(1, 'ewfwef', 'gewvgrwfwe', NULL, NULL, 'New', '2025-11-05 12:09:52', '2025-11-20 10:19:53', 'Kram Vade');

-- --------------------------------------------------------

--
-- Table structure for table `financial_reports`
--

CREATE TABLE `financial_reports` (
  `report_id` int NOT NULL COMMENT 'Unique ID for each financial report.',
  `project_id` int NOT NULL COMMENT 'The project this financial report belongs to.',
  `submitted_by` int NOT NULL COMMENT 'SK Treasurer who uploaded or created the report.',
  `approved_by` int DEFAULT NULL COMMENT 'SK Chairperson who verified the report.',
  `amount_allocated` decimal(12,2) DEFAULT NULL COMMENT 'The budget approved for the project.',
  `amount_spent` decimal(12,2) DEFAULT NULL COMMENT 'The total funds actually spent.',
  `balance` decimal(12,2) DEFAULT NULL COMMENT 'Remaining funds (amount_allocated - amount_spent).',
  `attachments` varchar(500) DEFAULT NULL COMMENT 'File path or link to uploaded receipts or reports.',
  `remarks` text COMMENT 'Notes or financial clarifications.',
  `status` enum('Pending','Approved','Verified','Rejected') DEFAULT 'Pending' COMMENT 'Current review stage of the report.',
  `date_submitted` datetime DEFAULT NULL COMMENT 'Date the Treasurer submitted the report.',
  `date_approved` datetime DEFAULT NULL COMMENT 'Date the Chairperson approved it.',
  `last_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `financial_reports`
--

INSERT INTO `financial_reports` (`report_id`, `project_id`, `submitted_by`, `approved_by`, `amount_allocated`, `amount_spent`, `balance`, `attachments`, `remarks`, `status`, `date_submitted`, `date_approved`, `last_updated`) VALUES
(1, 1, 6, 1, 1000000.00, 20000.00, 980000.00, 'uploads/financials/financial-report-1762155233841-584570418.docx', 'wala', 'Approved', '2025-11-03 07:33:53', '2025-11-03 08:03:54', '2025-11-03 08:03:54'),
(2, 3, 6, 1, 50000.00, 48000.00, 2000.00, 'uploads/financials/library-report.docx', 'Expenses mostly for construction materials.', 'Approved', '2025-11-15 17:15:00', '2025-11-16 09:00:00', '2025-11-16 09:05:00'),
(3, 4, 6, 1, 20000.00, 19500.00, 500.00, 'uploads/financials/health-report.docx', 'Covers logistics and promotional materials.', 'Approved', '2025-11-10 16:35:00', '2025-11-11 10:00:00', '2025-11-11 10:05:00'),
(4, 5, 6, NULL, 75000.00, 72000.00, 3000.00, 'uploads/financials/basketball-report.docx', 'Ongoing construction expenses.', 'Pending', '2025-11-20 09:05:00', NULL, '2025-11-20 09:05:00'),
(5, 6, 6, 1, 15000.00, 12000.00, 3000.00, 'uploads/financials/tree-planting-report.docx', 'Expenses for seedlings and gardening tools.', 'Verified', '2025-11-08 15:35:00', '2025-11-09 11:00:00', '2025-11-09 11:05:00'),
(6, 7, 6, NULL, 100000.00, 95000.00, 5000.00, 'uploads/financials/scholarship-report.docx', 'Scholarship fund disbursement planned next month.', 'Pending', '2025-11-07 11:35:00', NULL, '2025-11-07 11:35:00');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `project_id` int NOT NULL,
  `project_title` varchar(255) NOT NULL COMMENT 'The official name or title of the project.',
  `description` text NOT NULL COMMENT 'A detailed description of the project''s objectives, scope, and activities.',
  `category` varchar(100) DEFAULT NULL COMMENT 'Category of the project (e.g., Education, Health, Sports, Environment).',
  `proposed_by` int NOT NULL,
  `approved_by` int DEFAULT NULL,
  `budget_estimate` decimal(12,2) DEFAULT NULL COMMENT 'The estimated budget required for the project proposal.',
  `actual_budget` decimal(12,2) DEFAULT NULL COMMENT 'The final, actual cost of the project after completion.',
  `status` enum('Pending','Approved','In Progress','Completed','Rejected') DEFAULT 'Pending' COMMENT 'The current status of the project lifecycle.',
  `date_proposed` datetime DEFAULT NULL COMMENT 'The date when the project was initially proposed. Defaults to the current date.',
  `date_approved` datetime DEFAULT NULL COMMENT 'The date when the project was approved by the Chairperson.',
  `start_date` datetime DEFAULT NULL COMMENT 'The official start date of project implementation.',
  `end_date` datetime DEFAULT NULL COMMENT 'The official end date or completion date of the project.',
  `remarks` text COMMENT 'Additional notes, comments, or reasons for rejection.',
  `last_updated` datetime NOT NULL,
  `attachment_path` varchar(255) DEFAULT NULL COMMENT 'Path to the project proposal attachment file.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`project_id`, `project_title`, `description`, `category`, `proposed_by`, `approved_by`, `budget_estimate`, `actual_budget`, `status`, `date_proposed`, `date_approved`, `start_date`, `end_date`, `remarks`, `last_updated`, `attachment_path`) VALUES
(1, 'mcksc', 'msvmsk', 'kscskc', 5, 1, 2999.00, NULL, 'Approved', '2025-11-01 11:34:54', '2025-11-01 11:35:54', NULL, NULL, NULL, '2025-11-01 11:35:54', NULL),
(2, 'vdv sdv', 'vsdvsv', 'vdvdvdv', 5, 1, 234567876.00, NULL, 'Approved', '2025-11-01 12:18:27', '2025-11-01 12:24:43', NULL, NULL, NULL, '2025-11-01 12:24:43', 'uploads/attachments/attachment-1761999507524-226756862.docx'),
(3, 'Community Library Renovation', 'Renovate and expand the local community library to provide better resources for students.', 'Education', 5, NULL, 50000.00, 48000.00, 'Approved', '2025-11-02 10:00:00', '2025-11-03 09:00:00', '2025-11-04 08:00:00', '2025-11-15 17:00:00', 'Project completed successfully.', '2025-11-15 17:10:00', 'uploads/attachments/library-proposal.docx'),
(4, 'Health Awareness Campaign', 'Organize workshops and seminars to promote healthy lifestyles in the community.', 'Health', 5, 1, 20000.00, 19500.00, 'Approved', '2025-11-03 11:00:00', NULL, '2025-11-05 09:00:00', '2025-11-10 16:00:00', 'Campaign achieved high participation.', '2025-11-10 16:30:00', 'uploads/attachments/health-campaign.docx'),
(5, 'Basketball Court Construction', 'Construct a new basketball court in the barangay for youth sports activities.', 'Sports', 7, NULL, 75000.00, 72000.00, 'Pending', '2025-11-04 09:30:00', NULL, '2025-11-06 08:00:00', NULL, NULL, '2025-11-20 09:00:00', 'uploads/attachments/basketball-court-plan.docx'),
(6, 'Tree Planting Drive', 'Plant 500 trees around the community park to promote environmental awareness.', 'Environment', 7, 1, 15000.00, 12000.00, 'Completed', '2025-11-05 13:00:00', '2025-11-06 14:00:00', '2025-11-07 08:00:00', '2025-11-08 15:00:00', 'Successfully planted 500 trees.', '2025-11-08 15:30:00', 'uploads/attachments/tree-planting.docx'),
(7, 'Scholarship Fund Setup', 'Establish a scholarship fund for underprivileged students in the community.', 'Education', 5, 1, 100000.00, 95000.00, 'Pending', '2025-11-06 10:00:00', '2025-11-07 11:00:00', NULL, NULL, 'Fund approved, awaiting disbursement.', '2025-11-07 11:30:00', 'uploads/attachments/scholarship-fund.docx');

-- --------------------------------------------------------

--
-- Table structure for table `project_files`
--

CREATE TABLE `project_files` (
  `file_id` int NOT NULL COMMENT 'Primary key for the project files table.',
  `project_id` int NOT NULL COMMENT 'Foreign key linking to the projects table.',
  `file_name` varchar(255) NOT NULL COMMENT 'The original name of the uploaded file.',
  `file_path` varchar(255) NOT NULL COMMENT 'The path where the file is stored on the server.',
  `uploaded_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sysusers`
--

CREATE TABLE `sysusers` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `position` enum('publicuser','secretary','treasurer','councilor','chairperson','admin') NOT NULL DEFAULT 'publicuser',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL COMMENT 'Path to the user''s profile picture.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sysusers`
--

INSERT INTO `sysusers` (`id`, `name`, `email`, `password`, `position`, `createdAt`, `updatedAt`, `imageUrl`) VALUES
(1, 'Gregor Santiago', 'chair@gmail.com', '$2b$10$TdB4z6tfFdvVdB85HwK5ZeBqzChtpD7n0t7qXv1hScmg.9pXxUj8S', 'chairperson', '2025-10-31 02:32:31', '2025-11-01 05:35:40', NULL),
(4, 'Mark Dave Manobo', 'markdaveako@gmail.com', '$2b$10$uQRGu2DsxBy5RzWI25vYBOQKi3FAye58tjXl3/28q1.RAnDKw6UVa', 'admin', '2025-11-01 06:15:20', '2025-11-01 06:15:20', NULL),
(5, 'Samantha Aguila', 'secretary@gmail.com', '$2b$10$tloaWti1GBE/G.z7sK5JtelhV/rTG7rQIDYBjsByLHBItBbeTdmM6', 'secretary', '2025-11-01 06:21:24', '2025-11-01 06:21:58', NULL),
(6, 'Juan Dela Cruz', 'treasurer@gmail.com', '$2b$10$g2a3R1/dKrM2v8EdOqDFYO2LccOD9a8xHwdr6NxakaMfBdpOTkZ02', 'treasurer', '2025-11-01 06:40:54', '2025-11-01 06:41:21', NULL),
(7, 'Noel Fabella', 'councilor@gmail.com', '$2b$10$Y7mbZoD0WaAhBSuRk2CnEeHldZR/7AwxPDDnIgyxcECbuwzw33jf2', 'councilor', '2025-11-01 06:52:14', '2025-11-01 06:52:31', NULL),
(8, 'Pedro Penduko', 'pedro@gmail.com', '$2b$10$VMdA8QAsQnDCpi56FwRbTu6GkCpH0hbN.DIyaqiLxnAn5RkSLS0tO', 'publicuser', '2025-11-01 07:05:24', '2025-11-01 07:05:24', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Kram', 'markdaveako@gmail.com', '$2b$10$ZHiM9px1kmuRQeS3cgfbrenyDINgdOsapeZK/nuqNWjAduoHa499O', '2025-09-17 01:37:29', '2025-09-17 01:37:29'),
(2, 'Kram Ako', 'kramvadeako@gmail.com', '$2b$10$ADCpHgf8b5GWw3sOqJrMmuYU75mR0vQ.IQ0fxZS8lNVM3zWLm3HRe', '2025-11-01 05:55:51', '2025-11-01 05:55:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`announcement_id`),
  ADD KEY `author_id` (`author_id`),
  ADD KEY `approved_by` (`approved_by`);

--
-- Indexes for table `expenditures`
--
ALTER TABLE `expenditures`
  ADD PRIMARY KEY (`expenditure_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `recorded_by` (`recorded_by`),
  ADD KEY `reviewed_by` (`reviewed_by`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `submitted_by` (`submitted_by`);

--
-- Indexes for table `financial_reports`
--
ALTER TABLE `financial_reports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `submitted_by` (`submitted_by`),
  ADD KEY `approved_by` (`approved_by`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `proposed_by` (`proposed_by`),
  ADD KEY `approved_by` (`approved_by`);

--
-- Indexes for table `project_files`
--
ALTER TABLE `project_files`
  ADD PRIMARY KEY (`file_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `sysusers`
--
ALTER TABLE `sysusers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `email_32` (`email`),
  ADD UNIQUE KEY `email_33` (`email`),
  ADD UNIQUE KEY `email_34` (`email`),
  ADD UNIQUE KEY `email_35` (`email`),
  ADD UNIQUE KEY `email_36` (`email`),
  ADD UNIQUE KEY `email_37` (`email`),
  ADD UNIQUE KEY `email_38` (`email`),
  ADD UNIQUE KEY `email_39` (`email`),
  ADD UNIQUE KEY `email_40` (`email`),
  ADD UNIQUE KEY `email_41` (`email`),
  ADD UNIQUE KEY `email_42` (`email`),
  ADD UNIQUE KEY `email_43` (`email`),
  ADD UNIQUE KEY `email_44` (`email`),
  ADD UNIQUE KEY `email_45` (`email`),
  ADD UNIQUE KEY `email_46` (`email`),
  ADD UNIQUE KEY `email_47` (`email`),
  ADD UNIQUE KEY `email_48` (`email`),
  ADD UNIQUE KEY `email_49` (`email`),
  ADD UNIQUE KEY `email_50` (`email`),
  ADD UNIQUE KEY `email_51` (`email`),
  ADD UNIQUE KEY `email_52` (`email`),
  ADD UNIQUE KEY `email_53` (`email`),
  ADD UNIQUE KEY `email_54` (`email`),
  ADD UNIQUE KEY `email_55` (`email`),
  ADD UNIQUE KEY `email_56` (`email`),
  ADD UNIQUE KEY `email_57` (`email`),
  ADD UNIQUE KEY `email_58` (`email`),
  ADD UNIQUE KEY `email_59` (`email`),
  ADD UNIQUE KEY `email_60` (`email`),
  ADD UNIQUE KEY `email_61` (`email`),
  ADD UNIQUE KEY `email_62` (`email`),
  ADD UNIQUE KEY `email_63` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `announcement_id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary key for the announcements table.', AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `expenditures`
--
ALTER TABLE `expenditures`
  MODIFY `expenditure_id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique ID for each expenditure entry.', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary key for the feedback table.', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `financial_reports`
--
ALTER TABLE `financial_reports`
  MODIFY `report_id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique ID for each financial report.', AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `project_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `project_files`
--
ALTER TABLE `project_files`
  MODIFY `file_id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary key for the project files table.';

--
-- AUTO_INCREMENT for table `sysusers`
--
ALTER TABLE `sysusers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `announcements`
--
ALTER TABLE `announcements`
  ADD CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `sysusers` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `announcements_ibfk_2` FOREIGN KEY (`approved_by`) REFERENCES `sysusers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `expenditures`
--
ALTER TABLE `expenditures`
  ADD CONSTRAINT `expenditures_ibfk_69` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `expenditures_ibfk_70` FOREIGN KEY (`recorded_by`) REFERENCES `sysusers` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `expenditures_ibfk_71` FOREIGN KEY (`reviewed_by`) REFERENCES `sysusers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`submitted_by`) REFERENCES `sysusers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `financial_reports`
--
ALTER TABLE `financial_reports`
  ADD CONSTRAINT `financial_reports_ibfk_667` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `financial_reports_ibfk_668` FOREIGN KEY (`submitted_by`) REFERENCES `sysusers` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `financial_reports_ibfk_669` FOREIGN KEY (`approved_by`) REFERENCES `sysusers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`proposed_by`) REFERENCES `sysusers` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`approved_by`) REFERENCES `sysusers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `project_files`
--
ALTER TABLE `project_files`
  ADD CONSTRAINT `project_files_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
