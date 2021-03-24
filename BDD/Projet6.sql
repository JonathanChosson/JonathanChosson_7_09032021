-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: database_development_test
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `messageId` int NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `messageId` (`messageId`),
  KEY `userId` (`userId`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`messageId`) REFERENCES `messages` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (2,3,3,'2021-03-19 15:21:12','2021-03-19 15:21:12'),(3,1,3,'2021-03-19 15:21:18','2021-03-19 15:21:18'),(4,5,2,'2021-03-19 15:32:22','2021-03-19 15:32:22'),(11,1,2,'2021-03-22 10:22:02','2021-03-22 10:22:02');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(1024) NOT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `likes` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,1,'Bienvenue sur le réseau social Groupomania','Nous sommes heureux de vous proposer cette espace d\'échange  ','http://localhost:3000/images/messages/b97dc288d71e7938c1ce8b7faacdc9ac.gif1616167007599.gif','Admin',2,'2021-03-19 15:16:47','2021-03-22 10:22:02'),(2,2,'Les joies de push ','','http://localhost:3000/images/messages/O9xMG5D.jpg1616167060721.jpg','Uturn',0,'2021-03-19 15:17:40','2021-03-19 15:33:45'),(3,2,'Ne pas confondre UI et UX ','','http://localhost:3000/images/messages/c3088e62138ed304a1bb93ea5e186e53.jpg1616167099919.jpg','Uturn',1,'2021-03-19 15:18:19','2021-03-19 15:21:12'),(4,3,'Neige sur la momie','Il as neiger sur Marches(26300) ','http://localhost:3000/images/messages/49103799997_6f554dc684_c.jpg1616167248852.jpg','Beegood',0,'2021-03-19 15:20:48','2021-03-19 15:21:04'),(5,3,'Feux d\'artifice','Magnifique feux sur Tain l\'Hermitage','http://localhost:3000/images/messages/19643974090_8ec42fe85e_c.jpg1616167435261.jpg','Beegood',1,'2021-03-19 15:23:55','2021-03-19 15:32:22'),(6,2,'Pensez-y','Et c\'est tellement beau ','http://localhost:3000/images/messages/Dac2hSPXkAAraju.jpg1616167527905.jpg','Uturn',0,'2021-03-19 15:25:27','2021-03-22 08:26:23');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20210303104527-create-user.js'),('20210303104757-create-message.js'),('20210305084439-create-like.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@admin.com','Admin','$2b$10$52gsdV4iEk7zp786stt3quOZsWaiYZkIU60G6EjO4Ff3IjR3d5EUy','','http://localhost:3000/images/profil/admin-settings-male.png1616166793813.png',1,'2021-03-19 14:41:26','2021-03-19 15:13:13'),(2,'toto@toto.com','Uturn','$2b$10$a5Y5u5XU.crm9tur/Q5uBegmIOkxPaj99UIEyK4fd9IkRADR4.5TG','Super Uturn ','http://localhost:3000/images/profil/Uturn.jpg1616408199489.jpg',0,'2021-03-19 14:43:14','2021-03-22 10:16:39'),(3,'tata@tata.com','Beegood','$2b$10$qfyi4S58vs5cAyG8o59N1Ojb8gpU9zC.4SnfPCipNzXO7l67pfsEu','','http://localhost:3000/images/profil/uturn26.png1616167157578.png',0,'2021-03-19 15:19:04','2021-03-19 15:19:17');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-24 10:10:16
