-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 28, 2024 at 05:59 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tes_praktek`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_transaction` float NOT NULL,
  `level_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `created_at`, `updated_at`, `name`, `menu_id`, `quantity`, `total_transaction`, `level_id`) VALUES
(1, '2024-02-28 04:56:20', NULL, 'Odis Rinehart', 1, 12, 600000, 1),
(2, '2024-02-28 04:56:39', NULL, 'Kris Roher', 4, 1, 30000, 1),
(3, '2024-02-28 04:56:55', NULL, 'Serenity Fisher', 2, 1, 40000, 2),
(4, '2024-02-28 04:57:15', NULL, 'Brooklyn Warren', 4, 1, 30000, 3),
(5, '2024-02-28 04:57:33', NULL, 'Franco Delort', 1, 1, 50000, 2),
(6, '2024-02-28 04:57:55', NULL, 'Saul Geoghegan', 1, 1, 50000, 2),
(7, '2024-02-28 04:58:11', NULL, 'Alfredo Vetrovs', 5, 1, 30000, 2),
(8, '2024-02-28 04:58:34', NULL, 'Cristofer Vetrovs', 6, 1, 120000, 4),
(9, '2024-02-28 04:58:48', NULL, 'Calvin Steward', 7, 1, 110000, 4),
(10, '2024-02-28 04:59:01', NULL, 'Calvin Steward', 7, 1, 110000, 4),
(11, '2024-02-28 04:59:11', NULL, 'Calvin Steward', 3, 1, 50000, 4),
(12, '2024-02-28 04:59:29', NULL, 'Fandi Aziz', 1, 1, 50000, 1);

-- --------------------------------------------------------

--
-- Table structure for table `level`
--

CREATE TABLE `level` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `level`
--

INSERT INTO `level` (`id`, `name`) VALUES
(1, 'Warga'),
(2, 'Juragan'),
(3, 'Sultan'),
(4, 'Konglomerat');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `name`, `price`) VALUES
(1, 'Chicken & Ribs Combo', 50000),
(2, 'Fried Chicken Dinner', 40000),
(3, 'Chicken & Ribs Combo', 50000),
(4, 'Surf & Turf Gift Basket', 30000),
(5, 'Dark & Stormy', 30000),
(6, 'Shaking Beef Tri-Tip', 120000),
(7, 'BBQ Rib Dinner', 110000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `level`
--
ALTER TABLE `level`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
