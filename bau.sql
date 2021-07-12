CREATE DATABASE  IF NOT EXISTS `bau` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bau`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bau
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `abschluesse`
--

DROP TABLE IF EXISTS `abschluesse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abschluesse` (
  `idAbschluss` int NOT NULL AUTO_INCREMENT,
  `Bezeichnung` varchar(45) NOT NULL,
  PRIMARY KEY (`idAbschluss`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abschluesse`
--

LOCK TABLES `abschluesse` WRITE;
/*!40000 ALTER TABLE `abschluesse` DISABLE KEYS */;
INSERT INTO `abschluesse` VALUES (0,'keine'),(1,'Bachelor'),(2,'Master'),(3,'Promotion'),(4,'Ausbildung'),(5,'Abgebrochen'),(6,'Diplom'),(7,'Facharbeiter'),(8,'Meister'),(9,'Techniker');
/*!40000 ALTER TABLE `abschluesse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'test','$2y$10$SfhYIDtn.iOuCW7zfoFLuuZHX6lja4lF4XA4JqNmpiH/.P3zB8JCa','test@test.com'),(11,'a','$2b$12$ia0GTw22Cs4QeW1mjKi33eHV5Uc2rG20uX2kNewAvrr5JM/qJjZwS','a@a.de'),(12,'b','$2b$12$/d97LKE4QCwGz5j3IddNr.9i6rWNnTFzd8gJRBOKvsGCxDWdZKZaO','b@b.de'),(13,'c','$2b$12$CUjt6jPLls6ZabZ2Dis5cOwQaKa2CgEZkXRTYgLLc/5BK/9zTlKTa','c@c.de'),(21,'d','243262243132243554754b6f5473417537413146364d396b2e766f734f52572f7a4934553464664f3033616f64454537456a7839326942496338354b','d@d.de'),(22,'e','24326224313224343138667142455a4475716a4c554d424f61437676755943654f7341502e4952696a6535554574775072726d764b453232786d4553','e@e.de'),(23,'f','243262243132246e494c4d467a6754496e73584544744f46354d305065434e617849617933747378596a413946784465426664667447516336566e69','f@f.de'),(24,'g','$2b$12$45gK0wD81iEtWSqz/SsL1.NbpTVzTbVeUuTrcKULtmqIrZVqiMh3S','g@g.de'),(25,'bb','$2b$12$WLVw0ZXPKjmgSG2tViFgz..ov7uGvZaVq1iSiQ2kO1lJv0mJBmWNm','bb@abc.de');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baustellen`
--

DROP TABLE IF EXISTS `baustellen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `baustellen` (
  `idBaustelle` int NOT NULL AUTO_INCREMENT,
  `Auftragsnummer` varchar(45) NOT NULL DEFAULT '0',
  `Auftraggeber` varchar(45) NOT NULL DEFAULT '0',
  `PLZ` varchar(45) DEFAULT NULL,
  `Ort` varchar(45) DEFAULT NULL,
  `Strasse` varchar(45) DEFAULT NULL,
  `Beginn` date DEFAULT '2020-01-01',
  `Ende` date DEFAULT '2020-01-01',
  `Bemerkung` varchar(255) DEFAULT '',
  `Bezeichnung` varchar(255) DEFAULT 'Baustelle ohne Namen',
  `Umfang` varchar(255) DEFAULT '',
  `Nr` varchar(20) DEFAULT '',
  PRIMARY KEY (`idBaustelle`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baustellen`
--

LOCK TABLES `baustellen` WRITE;
/*!40000 ALTER TABLE `baustellen` DISABLE KEYS */;
INSERT INTO `baustellen` VALUES (1,'740177','Bauamt Schöneiche','15566','Schöneiche','Brandenburgische Str. ','2020-09-20','2021-03-20','Damesweg bis Goethestraße','Baustelle 1','20 m³ Beton','97-200'),(2,'741000','Amt Neuenhagen','15678','Neuenhagen','Hauptstr.','2021-03-20','2021-05-20','Straßenbalag erneuern','Baustelle 2','30 m³ Asphalt','2'),(3,'742222','Amt Biesenthal','16112','Biesenthal','Feldweg ','2021-05-20','2021-08-20','Neuanlage','Baustelle 3','50 m³ Beton ','3'),(4,'753333','Amt Schönefeld','15785','Schönefeld','Flugfeld ','2021-08-20','2021-10-20','Ausbesserung','Baustelle 4','20 m³ Beton','4'),(5,'765432','Amt Wandlitz','16348','Wandlitz','Uferpromenade','2021-10-20','2021-11-20','Pflasterarbeiten','Baustelle 5','500 m² Pflaster','');
/*!40000 ALTER TABLE `baustellen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `berufe`
--

DROP TABLE IF EXISTS `berufe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `berufe` (
  `idBeruf` int NOT NULL AUTO_INCREMENT,
  `Bezeichnung` varchar(45) NOT NULL,
  PRIMARY KEY (`idBeruf`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `berufe`
--

LOCK TABLES `berufe` WRITE;
/*!40000 ALTER TABLE `berufe` DISABLE KEYS */;
INSERT INTO `berufe` VALUES (0,'keine'),(1,'Asphaltbauer'),(2,'Baugeraetefuehrer'),(3,'Fachkraft - Straßen- und Verkehrstechnik'),(4,'Fachkraft - Wasserwirtschaft'),(5,'Gleisbauer'),(6,'Kanalbauer'),(7,'Rohrleitungsbauer'),(8,'Spezialtiefbauer'),(9,'Straßenbauer'),(10,'Technischer Assistent - Bautechnik'),(11,'Tiefbaufacharbeiter'),(12,'Wasserbauer'),(13,'ohne Ausbildung'),(14,'Fachingenieur für Straßenbau'),(15,'Baustoffpruefer'),(16,'Bauzeichner'),(17,'Bauingenieur'),(18,'Berufskraftfahrer'),(19,'Informatiker');
/*!40000 ALTER TABLE `berufe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fahrzeuge`
--

DROP TABLE IF EXISTS `fahrzeuge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fahrzeuge` (
  `idFahrzeug` int NOT NULL AUTO_INCREMENT,
  `idTyp` int DEFAULT NULL,
  `Kennzeichen` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idFahrzeug`),
  KEY `fk_pb24` (`idTyp`),
  CONSTRAINT `fk_pb24` FOREIGN KEY (`idTyp`) REFERENCES `typen` (`idTyp`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fahrzeuge`
--

LOCK TABLES `fahrzeuge` WRITE;
/*!40000 ALTER TABLE `fahrzeuge` DISABLE KEYS */;
INSERT INTO `fahrzeuge` VALUES (0,0,NULL),(2,2,'B-AS 4228'),(3,2,'B-WB 722'),(5,1,'B-AS 100'),(6,1,'MOL-AS 101'),(7,1,'B-AS 102');
/*!40000 ALTER TABLE `fahrzeuge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kolonne_baustelle`
--

DROP TABLE IF EXISTS `kolonne_baustelle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kolonne_baustelle` (
  `idKolonne_Baustelle` int NOT NULL AUTO_INCREMENT,
  `idKolonne` int NOT NULL DEFAULT '0',
  `idBaustelle` int NOT NULL DEFAULT '0',
  `von` datetime DEFAULT NULL,
  `bis` datetime DEFAULT NULL,
  PRIMARY KEY (`idKolonne_Baustelle`),
  KEY `fk_baust122` (`idBaustelle`),
  KEY `fk_222` (`idKolonne`),
  KEY `fk_bau123` (`idBaustelle`),
  KEY `fk_pkm4` (`idKolonne`),
  KEY `fk_kol444` (`idKolonne`),
  KEY `fk_baustelle444` (`idBaustelle`),
  CONSTRAINT `fk_baustelle444` FOREIGN KEY (`idBaustelle`) REFERENCES `baustellen` (`idBaustelle`),
  CONSTRAINT `fk_kol444` FOREIGN KEY (`idKolonne`) REFERENCES `kolonnen` (`idKolonne`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kolonne_baustelle`
--

LOCK TABLES `kolonne_baustelle` WRITE;
/*!40000 ALTER TABLE `kolonne_baustelle` DISABLE KEYS */;
INSERT INTO `kolonne_baustelle` VALUES (1,1,1,'2020-09-20 00:00:00','2021-03-20 00:00:00'),(2,2,2,'2021-03-20 00:00:00','2021-05-20 00:00:00'),(3,3,3,'2021-05-20 00:00:00','2021-08-20 00:00:00'),(4,4,4,'2021-08-20 00:00:00','2021-10-20 00:00:00'),(5,5,5,'2021-10-20 00:00:00','2021-11-20 00:00:00');
/*!40000 ALTER TABLE `kolonne_baustelle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kolonnen`
--

DROP TABLE IF EXISTS `kolonnen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kolonnen` (
  `idKolonne` int NOT NULL AUTO_INCREMENT,
  `Bemerkung` varchar(255) DEFAULT '',
  `Bezeichnung` varchar(45) NOT NULL,
  PRIMARY KEY (`idKolonne`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kolonnen`
--

LOCK TABLES `kolonnen` WRITE;
/*!40000 ALTER TABLE `kolonnen` DISABLE KEYS */;
INSERT INTO `kolonnen` VALUES (0,'keine','0'),(1,'1. Kolonne (ABCDEF)','1'),(2,'2. Kolonne (GHIJ)','2'),(3,'3. Kolonne (ACEGI)  ','3'),(4,'4. Kolonne','4'),(5,'5. Kolonne','5');
/*!40000 ALTER TABLE `kolonnen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `krankheiten`
--

DROP TABLE IF EXISTS `krankheiten`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `krankheiten` (
  `idKrankheit` int NOT NULL AUTO_INCREMENT,
  `Bezeichnung` varchar(45) NOT NULL,
  `idPerson` int DEFAULT NULL,
  `Von` date DEFAULT NULL,
  `Bis` date DEFAULT NULL,
  PRIMARY KEY (`idKrankheit`),
  KEY `idPerson` (`idPerson`),
  CONSTRAINT `idPerson` FOREIGN KEY (`idPerson`) REFERENCES `personen` (`idPerson`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `krankheiten`
--

LOCK TABLES `krankheiten` WRITE;
/*!40000 ALTER TABLE `krankheiten` DISABLE KEYS */;
INSERT INTO `krankheiten` VALUES (0,'keine',NULL,NULL,NULL),(1,'Krankheit',10,'2021-06-07','2021-06-09'),(2,'Krankheit',14,'2021-06-01','2021-06-04'),(3,'Krankheit',5,'2021-05-20','2021-05-25');
/*!40000 ALTER TABLE `krankheiten` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maschine_buchung`
--

DROP TABLE IF EXISTS `maschine_buchung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maschine_buchung` (
  `idMaschine_Buchung` int NOT NULL AUTO_INCREMENT,
  `idMaschine` int NOT NULL,
  `idBaustelle` int NOT NULL,
  `von` datetime DEFAULT NULL,
  `bis` datetime DEFAULT NULL,
  PRIMARY KEY (`idMaschine_Buchung`),
  KEY `idMaschine` (`idMaschine`),
  KEY `idBaustelle` (`idBaustelle`),
  CONSTRAINT `idBaustelle` FOREIGN KEY (`idBaustelle`) REFERENCES `baustellen` (`idBaustelle`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idMaschine` FOREIGN KEY (`idMaschine`) REFERENCES `maschinen` (`idMaschine`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maschine_buchung`
--

LOCK TABLES `maschine_buchung` WRITE;
/*!40000 ALTER TABLE `maschine_buchung` DISABLE KEYS */;
INSERT INTO `maschine_buchung` VALUES (1,2,3,'2021-05-20 00:00:00','2021-07-15 00:00:00'),(3,5,3,'2021-06-23 00:00:00','2021-07-14 00:00:00'),(4,4,3,'2021-07-01 00:00:00','2021-08-05 00:00:00'),(5,8,3,'2021-08-01 00:00:00','2021-06-20 00:00:00'),(6,11,3,'2021-05-20 00:00:00','2021-06-14 00:00:00'),(16,4,3,'2021-05-19 22:00:00','2021-06-21 22:00:00'),(17,4,3,'2021-08-05 22:00:00','2021-08-17 22:00:00');
/*!40000 ALTER TABLE `maschine_buchung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maschinen`
--

DROP TABLE IF EXISTS `maschinen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maschinen` (
  `idMaschine` int NOT NULL AUTO_INCREMENT,
  `idTyp` int NOT NULL DEFAULT '0',
  `Kennzeichen` varchar(45) DEFAULT '',
  `Nummer` varchar(45) DEFAULT '',
  `Zustand` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idMaschine`),
  KEY `fk_typ1` (`idTyp`),
  CONSTRAINT `fk_typ1` FOREIGN KEY (`idTyp`) REFERENCES `typen` (`idTyp`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maschinen`
--

LOCK TABLES `maschinen` WRITE;
/*!40000 ALTER TABLE `maschinen` DISABLE KEYS */;
INSERT INTO `maschinen` VALUES (1,3,'B-AS 259','','Gut'),(2,3,'B-AS 108','','Gut'),(3,4,'B-EN 2970','','Defekt'),(4,4,'B-AS 109','','Sehr gut'),(5,5,'B-AS 103','','Sehr gut'),(6,5,'MOL-AS 110','','Defekt'),(7,6,'B-AS 104','','Gut'),(8,6,'MOL-AS 111','','Sehr gut'),(9,7,'B-AS 105','','Gut'),(10,7,'MOL-AS 112','','Gut'),(11,8,'B-AS 106','','Gut'),(12,9,'B-AS 107','','Gut'),(13,10,'','PH-1','Gut'),(14,10,'','PH-2','Gut'),(15,11,'','RP-1','Gut'),(16,11,'','RP-2','Gut'),(18,3,'B-AR-789','','Gut');
/*!40000 ALTER TABLE `maschinen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_beruf_abschluss`
--

DROP TABLE IF EXISTS `person_beruf_abschluss`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_beruf_abschluss` (
  `idPerson_Beruf_Abschluss` int NOT NULL AUTO_INCREMENT,
  `idPerson` int NOT NULL DEFAULT '0',
  `idBeruf` int NOT NULL DEFAULT '0',
  `idAbschluss` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`idPerson_Beruf_Abschluss`),
  KEY `fk_pb` (`idPerson`),
  KEY `fk_pb1` (`idBeruf`),
  KEY `fk_pb25` (`idAbschluss`),
  KEY `fk_pb2` (`idAbschluss`),
  CONSTRAINT `fk_pb` FOREIGN KEY (`idPerson`) REFERENCES `personen` (`idPerson`),
  CONSTRAINT `fk_pb1` FOREIGN KEY (`idBeruf`) REFERENCES `berufe` (`idBeruf`),
  CONSTRAINT `fk_pb2` FOREIGN KEY (`idAbschluss`) REFERENCES `abschluesse` (`idAbschluss`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_beruf_abschluss`
--

LOCK TABLES `person_beruf_abschluss` WRITE;
/*!40000 ALTER TABLE `person_beruf_abschluss` DISABLE KEYS */;
INSERT INTO `person_beruf_abschluss` VALUES (1,1,19,2),(2,2,19,6),(3,3,17,7),(4,4,17,7),(5,5,17,7),(6,6,9,7),(7,7,9,7),(8,8,9,7),(9,9,9,7),(10,10,9,7),(11,11,9,7),(12,11,18,4),(13,12,9,7),(14,13,9,7),(15,14,9,7),(16,15,9,7),(17,16,9,7),(18,17,9,7),(19,18,9,7),(20,19,9,7),(21,20,9,7),(22,21,9,7),(23,22,9,7),(24,23,9,7),(25,24,9,7),(26,25,1,7),(27,26,1,7),(28,27,1,7),(29,28,1,7),(30,29,1,7);
/*!40000 ALTER TABLE `person_beruf_abschluss` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_buchung`
--

DROP TABLE IF EXISTS `person_buchung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_buchung` (
  `idPerson_Buchung` int NOT NULL AUTO_INCREMENT,
  `idPerson` int NOT NULL,
  `idBaustelle` int DEFAULT '0',
  `idKrankheit` int DEFAULT '0',
  `idUrlaub` int DEFAULT '0',
  `von` datetime DEFAULT '2020-01-01 00:00:00',
  `bis` datetime DEFAULT '2020-01-01 00:00:00',
  PRIMARY KEY (`idPerson_Buchung`),
  KEY `fk_pb10` (`idPerson_Buchung`),
  KEY `fk_pb11` (`idPerson_Buchung`),
  KEY `fk_pers11` (`idPerson`),
  KEY `fk_baust11` (`idBaustelle`),
  KEY `fk_person123` (`idPerson`),
  KEY `fk_baustelle123` (`idBaustelle`),
  KEY `fk_kkkk123` (`idKrankheit`),
  KEY `fk_urlaub123` (`idUrlaub`),
  CONSTRAINT `fk_baustelle123` FOREIGN KEY (`idBaustelle`) REFERENCES `baustellen` (`idBaustelle`),
  CONSTRAINT `fk_kkkk123` FOREIGN KEY (`idKrankheit`) REFERENCES `krankheiten` (`idKrankheit`),
  CONSTRAINT `fk_person123` FOREIGN KEY (`idPerson`) REFERENCES `personen` (`idPerson`),
  CONSTRAINT `fk_urlaub123` FOREIGN KEY (`idUrlaub`) REFERENCES `urlaube` (`idUrlaub`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_buchung`
--

LOCK TABLES `person_buchung` WRITE;
/*!40000 ALTER TABLE `person_buchung` DISABLE KEYS */;
INSERT INTO `person_buchung` VALUES (1,4,1,0,0,'2020-09-20 00:00:00','2021-03-20 00:00:00'),(2,6,1,0,0,'2020-09-20 00:00:00','2021-03-20 00:00:00'),(3,7,1,0,0,'2020-09-20 00:00:00','2021-03-20 00:00:00'),(4,8,1,0,0,'2020-09-20 00:00:00','2021-03-20 00:00:00'),(5,9,1,0,0,'2020-09-20 00:00:00','2021-03-20 00:00:00'),(6,10,1,0,0,'2020-09-20 00:00:00','2021-03-20 00:00:00'),(7,11,1,0,0,'2020-09-20 00:00:00','2021-03-20 00:00:00'),(8,12,2,0,0,'2021-03-20 00:00:00','2021-05-20 00:00:00'),(9,13,2,0,0,'2021-03-20 00:00:00','2021-05-20 00:00:00'),(10,14,2,0,0,'2021-03-20 00:00:00','2021-05-20 00:00:00'),(11,15,2,0,0,'2021-03-20 00:00:00','2021-05-20 00:00:00'),(12,6,3,0,0,'2021-05-20 00:00:00','2021-08-20 00:00:00'),(13,8,3,0,0,'2021-05-20 00:00:00','2021-08-20 00:00:00'),(14,10,3,0,0,'2021-05-20 00:00:00','2021-08-20 00:00:00'),(15,12,3,0,0,'2021-05-20 00:00:00','2021-08-20 00:00:00'),(16,14,3,0,0,'2021-05-20 00:00:00','2021-08-20 00:00:00'),(17,5,1,0,0,'2020-09-20 00:00:00','2021-03-20 00:00:00'),(18,16,4,0,0,'2021-08-20 00:00:00','2021-10-20 00:00:00'),(19,17,4,0,0,'2021-08-20 00:00:00','2021-10-20 00:00:00'),(20,18,4,0,0,'2021-08-20 00:00:00','2021-10-20 00:00:00'),(21,19,4,0,0,'2021-08-20 00:00:00','2021-10-20 00:00:00'),(22,20,4,0,0,'2021-08-20 00:00:00','2021-10-20 00:00:00'),(23,21,5,0,0,'2021-10-20 00:00:00','2021-11-20 00:00:00'),(24,22,5,0,0,'2021-10-20 00:00:00','2021-11-20 00:00:00'),(25,23,5,0,0,'2021-10-20 00:00:00','2021-11-20 00:00:00'),(26,24,5,0,0,'2021-10-20 00:00:00','2021-11-20 00:00:00'),(27,25,5,0,0,'2021-10-20 00:00:00','2021-11-20 00:00:00'),(28,4,2,0,0,'2021-03-20 00:00:00','2021-05-20 00:00:00'),(30,4,4,0,0,'2021-08-20 00:00:00','2021-10-20 00:00:00'),(34,4,3,0,0,'2021-05-20 00:00:00','2021-08-20 00:00:00'),(39,5,3,0,0,'2021-06-23 00:00:00','2021-07-15 00:00:00'),(40,5,3,0,0,'2021-05-25 22:00:00','2021-06-21 22:00:00');
/*!40000 ALTER TABLE `person_buchung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_fahrzeug`
--

DROP TABLE IF EXISTS `person_fahrzeug`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_fahrzeug` (
  `idPerson_Fahrzeug` int NOT NULL AUTO_INCREMENT,
  `idPerson` int NOT NULL,
  `idFahrzeug` int NOT NULL,
  `einsatz_von` datetime DEFAULT NULL,
  `einsatz_bis` datetime DEFAULT NULL,
  PRIMARY KEY (`idPerson_Fahrzeug`),
  KEY `fk_pb6` (`idPerson`),
  KEY `fk_pb7` (`idFahrzeug`),
  CONSTRAINT `fk_pb6` FOREIGN KEY (`idPerson`) REFERENCES `personen` (`idPerson`),
  CONSTRAINT `fk_pb7` FOREIGN KEY (`idFahrzeug`) REFERENCES `fahrzeuge` (`idFahrzeug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_fahrzeug`
--

LOCK TABLES `person_fahrzeug` WRITE;
/*!40000 ALTER TABLE `person_fahrzeug` DISABLE KEYS */;
INSERT INTO `person_fahrzeug` VALUES (1,3,5,NULL,NULL),(2,4,6,NULL,NULL),(3,5,7,NULL,NULL),(5,7,2,NULL,NULL);
/*!40000 ALTER TABLE `person_fahrzeug` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_kolonne_maschine`
--

DROP TABLE IF EXISTS `person_kolonne_maschine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_kolonne_maschine` (
  `idPerson_Kolonne_Maschine` int NOT NULL AUTO_INCREMENT,
  `idPerson` int NOT NULL,
  `idKolonne` int NOT NULL,
  `idMaschine` int DEFAULT '0',
  PRIMARY KEY (`idPerson_Kolonne_Maschine`),
  KEY `fk_pb21` (`idPerson`),
  KEY `fk_pb22` (`idKolonne`),
  KEY `fk_pb23` (`idKolonne`),
  KEY `fk_kol123` (`idKolonne`),
  KEY `fk_mas1` (`idMaschine`),
  CONSTRAINT `fk_kol123` FOREIGN KEY (`idKolonne`) REFERENCES `kolonnen` (`idKolonne`),
  CONSTRAINT `fk_mas1` FOREIGN KEY (`idMaschine`) REFERENCES `maschinen` (`idMaschine`),
  CONSTRAINT `fk_pb21` FOREIGN KEY (`idPerson`) REFERENCES `personen` (`idPerson`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_kolonne_maschine`
--

LOCK TABLES `person_kolonne_maschine` WRITE;
/*!40000 ALTER TABLE `person_kolonne_maschine` DISABLE KEYS */;
INSERT INTO `person_kolonne_maschine` VALUES (1,6,1,1),(2,7,1,2),(3,8,1,3),(4,9,1,5),(5,10,1,7),(6,11,1,9),(7,12,2,2),(8,13,2,4),(9,14,2,6),(10,15,2,8),(11,6,3,1),(12,8,3,4),(13,10,3,8),(14,12,3,11),(15,14,3,12),(16,16,4,10),(17,17,4,11),(18,18,4,12),(19,19,4,15),(20,20,4,16),(21,21,5,10),(22,22,5,11),(23,23,5,12),(24,24,5,15),(25,25,5,16),(26,26,0,9),(27,27,0,9),(28,28,0,9),(29,29,0,9);
/*!40000 ALTER TABLE `person_kolonne_maschine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_rolle`
--

DROP TABLE IF EXISTS `person_rolle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_rolle` (
  `idPerson_Rolle` int NOT NULL AUTO_INCREMENT,
  `idPerson` int NOT NULL,
  `idRolle` int NOT NULL,
  PRIMARY KEY (`idPerson_Rolle`),
  KEY `fk_pb19` (`idPerson`),
  KEY `fk_pb20` (`idRolle`),
  KEY `fk_per20` (`idPerson`),
  CONSTRAINT `fk_pb20` FOREIGN KEY (`idRolle`) REFERENCES `rollen` (`idRolle`),
  CONSTRAINT `fk_per20` FOREIGN KEY (`idPerson`) REFERENCES `personen` (`idPerson`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_rolle`
--

LOCK TABLES `person_rolle` WRITE;
/*!40000 ALTER TABLE `person_rolle` DISABLE KEYS */;
INSERT INTO `person_rolle` VALUES (1,1,1),(2,2,1),(3,3,2),(4,4,3),(5,5,4),(6,6,5),(7,7,5),(8,8,5),(9,9,5),(10,10,5),(11,11,5),(17,12,5),(18,13,5),(19,14,5),(20,15,5),(21,16,5),(22,17,5),(23,18,5),(24,19,5),(25,20,5),(26,21,5),(27,22,5),(28,23,5),(29,24,5),(30,25,5),(31,26,5),(32,27,5),(33,28,5),(34,29,5),(37,0,3),(38,0,4),(39,0,5),(46,4,5);
/*!40000 ALTER TABLE `person_rolle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_schein`
--

DROP TABLE IF EXISTS `person_schein`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_schein` (
  `idPerson_Schein` int NOT NULL AUTO_INCREMENT,
  `idPerson` int NOT NULL,
  `idSchein` int NOT NULL,
  `von` date DEFAULT '2020-01-01',
  `bis` date DEFAULT '2020-01-01',
  PRIMARY KEY (`idPerson_Schein`),
  KEY `fk_pb4` (`idPerson`),
  KEY `fk_pb5` (`idSchein`),
  KEY `fk_pb17` (`idPerson`),
  KEY `fk_pb18` (`idSchein`),
  KEY `fk_sch17` (`idSchein`),
  CONSTRAINT `fk_pb17` FOREIGN KEY (`idPerson`) REFERENCES `personen` (`idPerson`),
  CONSTRAINT `fk_sch17` FOREIGN KEY (`idSchein`) REFERENCES `scheine` (`idSchein`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_schein`
--

LOCK TABLES `person_schein` WRITE;
/*!40000 ALTER TABLE `person_schein` DISABLE KEYS */;
INSERT INTO `person_schein` VALUES (0,0,0,'2020-01-01','2020-01-01'),(1,1,1,'2020-01-01','2023-01-01'),(2,2,1,'2020-01-01','2023-01-01'),(3,3,1,'2020-01-01','2023-01-01'),(4,4,1,'2020-01-01','2023-01-01'),(5,5,1,'2020-01-01','2023-01-01'),(6,6,1,'2020-01-01','2023-01-01'),(7,7,1,'2020-01-01','2023-01-01'),(8,8,1,'2020-01-01','2023-01-01'),(9,9,1,'2020-01-01','2023-01-01'),(10,10,1,'2020-01-01','2023-01-01'),(11,11,1,'2020-01-01','2023-01-01'),(12,3,2,'2020-01-01','2023-01-01'),(13,4,2,'2020-01-01','2023-01-01'),(14,5,3,'2020-01-01','2023-01-01'),(15,6,11,'2020-01-01','2023-01-01'),(16,7,4,'2020-01-01','2023-01-01'),(17,8,11,'2020-01-01','2023-01-01'),(18,9,5,'2020-01-01','2023-01-01'),(19,10,6,'2020-01-01','2023-01-01'),(20,11,11,'2020-01-01','2023-01-01'),(21,11,12,'2020-01-01','2023-01-01'),(22,12,12,'2020-01-01','2023-01-01'),(23,11,13,'2020-01-01','2023-01-01'),(24,12,13,'2020-01-01','2023-01-01');
/*!40000 ALTER TABLE `person_schein` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personen`
--

DROP TABLE IF EXISTS `personen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personen` (
  `idPerson` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Vorname` varchar(45) DEFAULT NULL,
  `Nutzername` varchar(45) NOT NULL DEFAULT '',
  `Passwort` varchar(70) NOT NULL DEFAULT 'gleich Nutzername',
  PRIMARY KEY (`idPerson`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personen`
--

LOCK TABLES `personen` WRITE;
/*!40000 ALTER TABLE `personen` DISABLE KEYS */;
INSERT INTO `personen` VALUES (0,'a','a','aaaa1111','$2b$10$9r4wzYR4AR7D0Mnb4SZ4u.bjJ9FxrnF7K3hT/ZlKPUOZabeLuOtZy'),(1,'Admin1','Anton','Admin1','$2b$10$IfL1/Wa9HJrboTE9lTXmJ.j1ExWV7P3zJzD0YkTG91zNmGNS0kBci'),(2,'Admin2','Bernd','Admin2','$2b$10$ab4RM9EIG5LadZcfWXCsTOuWwScAkep4DMxwn1XJQrNVYY8qpxj1C'),(3,'Löwes','Thomas','Thomas','$2b$10$NmvYIj9P6eccshaN3TBlF.4i3Zv7NjKkjYb0yoDfN2jard0UfJBLy'),(4,'Tiger','Marco','Marco','$2b$10$rmh6vuaBXkk79tlEMwN0oOkhaYrR561jtaswIYya6UjvJfvSToaUi'),(5,'Leopard','Andreas','Andreas','$2b$10$KN7IrU9oIHywNEZXMnkMk.vtCQ0EG.CnnvXuJHKs45NqvLFiyfYOW'),(6,'Ameise','Anton','Anton','$2b$10$f8MEdvigv.SQHcBbRTUwJuZUalCU1NdeQQMTg4cetPG3j88vW3yMW'),(7,'Biene','Bernd','Bernd','$2b$10$E/v.5iDSdjkLXJBQTr1MIORNUV/Kk6TqyayQu5AdRNFhAZgB0q34y'),(8,'Chamäleon','Chris','Chris','$2b$10$AXhpEy1Gyoxd9p3gyJfbX.eN/RAL8AkVZKC5tzN3eJAHDppugzCXa'),(9,'Dachs','Dieter','Dieter','$2b$10$VsmRAMKKRFgEVxY9ChqJVeWdqMX4cSFH2TD8bCDwqoqOP6sIS4l4C'),(10,'Ente','Emil','Emil','$2b$10$jWwePyAtDb/mlrE0ZEv0/eaDAd.5nEBEG2LhfzX8VnIZZsHyv/5Ra'),(11,'Fisch','Fritz','Fritz','$2b$10$AZfYft7W/2gppO/Ypz7XWOUyfdSxoF507GCEkDJ38lWnRjNHxYffG'),(12,'Gans','Günter','Günter','$2b$10$oBG26L0aM6Srbb8y0CNCcuhESFTwKZjD38Fap0.9uOhurXFpmQstS'),(13,'Hase','Heinz','Heinz','$2b$10$1se8qBq2HntZWpg8oDPv5.RzzNCn0/qHq8.Yf6Y157e4m4qGM.OMC'),(14,'Igel','Isaak','Issak','$2b$10$DQ5ZmACdUDIvfzFbAE358OB3FTrHK5X0.v63QskRZLg482Ez.vtx.'),(15,'Jaguar','Johann','Johann','$2b$10$Mp47wCrVpnQhFlr/AYOlTOM/DmEiaY60My46uQb4aVCM1Aqy4pK.G'),(16,'Kröte','Karl','Karl','$2b$10$dHme/G1hOOwzOtP8jYXDGOY6i7fT/w2R17XGn5uoyDz3fvKQwZPEC'),(17,'Luchs','Lars','Lars','$2b$10$.2c8WI31EFqXm34/G9BT0OYF9v/mUAGqkpBCk8TiBeVhl4J2lksSe'),(18,'Marder','Max','Max','$2b$10$XXyS54rdnYq.2sjrd40XK.avjy6pvmmoKxDPqbrawgg8MEqZE7cmG'),(19,'Nashorn','Norbert','Norbert','$2b$10$SxwE2mbVbRm1tQ98E58/feVHhyavC/j5Zx.Fi9GbFs9.rLMBRi8oe'),(20,'Otter','Otto','Otto','$2b$10$73J1.aSmE7QIZoWKCWCwCe8cAmKSudiEcmZ9nvFpv8Y2V7DqYBlJC'),(21,'Pinguin','Peter','Peter','$2b$10$QKzq814ehLA.4iHgGNI7ved80IKMZa3zkzc864KNnnmlpg6AT66VK'),(22,'Qualle','Quentin','Quentin','$2b$10$U/MIPu0AM5lT3yZwZBjFaONOPgGN/bHoRezthZo4q3WOiOdIVaLMm'),(23,'Ratte','Rico','Rico','$2b$10$M6WrqUbt73cFYhlpQxNOnO28nRe5z/pXmpxgf7kNFVha2jI7Wvs5u'),(24,'Schaf','Stefan','Stefan','$2b$10$HVZNrLsy/Nx9ZlwsxJRBWOFADp8iliZkfIo03nBLvpe4sf7JtABQm'),(25,'Taube','Theo','Theo','$2b$10$Wr1cAqfYrW2LxaL8JT.R8uUo/xAdGsUulY6LlZ0sTvKomGNrKskTm'),(26,'Uhu','Ulf','Ulf','$2b$10$pp0LYHoHrHmciM7e6spLcuMrB/ryCVj2deU978PWETm38iuxf0zJO'),(27,'Viper','Vico','Vico','$2b$10$lUjxGSlQbzp8ywvGQThIkeQX/BqKHl/C.6sxFBmTatNyxYwcmlAt.'),(28,'Wal','Willi','Willi','$2b$10$.JX2SO8MClA7Opxbg8CyN.N9VMfZCALLRf/oCb.6G63/8pOQdzWGy'),(29,'Zebra','Zacharias','Zacharias','$2b$10$n/R4pDB7cvExp6Y3rYceMeexax.PMrH3JOkcR.3uqSj6Ivp4TVQt6'),(50,'Gelbernacht','Gelbernacht','Gelbernacht','$2b$10$lD5Xf7QZGkpuvWgslOaMdO2Nyw2e/k3zDP6wHJ5/3JfAJvPhxOKGi'),(51,'Roternacht','Roternacht','Roternacht','$2b$10$k5IDwL6oJx9dUM36ojITmuyuJPQx.iEyMbREXwNXWFCOnHLSt7rNS'),(52,'Blauernacht','Blauernacht','Blauernacht','$2b$10$uzocIQezwljYNA0wvcBJO.2BmGA9GwN3sCOJroOvQDliOEqdQnbaO');
/*!40000 ALTER TABLE `personen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rollen`
--

DROP TABLE IF EXISTS `rollen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rollen` (
  `idRolle` int NOT NULL AUTO_INCREMENT,
  `Bezeichnung` varchar(45) NOT NULL,
  PRIMARY KEY (`idRolle`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rollen`
--

LOCK TABLES `rollen` WRITE;
/*!40000 ALTER TABLE `rollen` DISABLE KEYS */;
INSERT INTO `rollen` VALUES (0,'keine'),(1,'Admin'),(2,'Chef'),(3,'Bauleiter'),(4,'Polier'),(5,'Arbeiter');
/*!40000 ALTER TABLE `rollen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scheine`
--

DROP TABLE IF EXISTS `scheine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scheine` (
  `idSchein` int NOT NULL AUTO_INCREMENT,
  `Klasse` varchar(45) NOT NULL DEFAULT '0',
  `Fahrzeug` varchar(45) DEFAULT NULL,
  `zulässige Gesamtmasse in Tonnen` varchar(45) DEFAULT NULL,
  `Haengergewicht in Tonnen` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idSchein`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scheine`
--

LOCK TABLES `scheine` WRITE;
/*!40000 ALTER TABLE `scheine` DISABLE KEYS */;
INSERT INTO `scheine` VALUES (0,'keine',NULL,NULL,NULL),(1,'B','Pkw','3,5','0.75'),(2,'BE','Pkw','7','3,5'),(3,'B96','Pkw','4.25','egal'),(4,'C1','Lkw','11','0,75'),(5,'C1E','Lkw','12','egal'),(6,'C','Lkw','egal','0,75'),(7,'CE','Lkw','egal','egal'),(8,'T','Forstwirtschaftliche Geräte',NULL,NULL),(9,'L','Landwirtschaftliche Zugmaschienen',NULL,NULL),(10,'Stapler','Flurfördermittelschein',NULL,NULL),(11,'Baumaschinen','Fahrausweis für Erdbaumaschinenführer',NULL,NULL),(12,'Asphaltfertiger','Asphaltfertiger',NULL,NULL),(13,'Asphaltfräse','Asphaltfräse',NULL,NULL);
/*!40000 ALTER TABLE `scheine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `typen`
--

DROP TABLE IF EXISTS `typen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `typen` (
  `idTyp` int NOT NULL AUTO_INCREMENT,
  `Bezeichnung` varchar(45) NOT NULL,
  PRIMARY KEY (`idTyp`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `typen`
--

LOCK TABLES `typen` WRITE;
/*!40000 ALTER TABLE `typen` DISABLE KEYS */;
INSERT INTO `typen` VALUES (0,' '),(1,'Pkw'),(2,'Lkw'),(3,'Bagger'),(4,'Walze'),(5,'Gabelstapler'),(6,'Raupe'),(7,'Transporter'),(8,'Asphaltfertiger'),(9,'Radlader'),(10,'Presslufthammer'),(11,'Rüttelplatte');
/*!40000 ALTER TABLE `typen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `urlaube`
--

DROP TABLE IF EXISTS `urlaube`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `urlaube` (
  `idUrlaub` int NOT NULL AUTO_INCREMENT,
  `Bezeichnung` varchar(45) DEFAULT NULL,
  `idPerson` int DEFAULT NULL,
  `Von` date DEFAULT NULL,
  `Bis` date DEFAULT NULL,
  PRIMARY KEY (`idUrlaub`),
  KEY `personId` (`idPerson`),
  CONSTRAINT `personId` FOREIGN KEY (`idPerson`) REFERENCES `personen` (`idPerson`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `urlaube`
--

LOCK TABLES `urlaube` WRITE;
/*!40000 ALTER TABLE `urlaube` DISABLE KEYS */;
INSERT INTO `urlaube` VALUES (0,'keine',NULL,NULL,NULL),(1,'Urlaub',6,'2021-06-21','2021-06-30'),(2,'Sonderurlaub',15,'2021-08-02','2021-08-20'),(3,'Urlaub',20,'2021-07-08','2021-07-30'),(4,'Urlaub',8,'2021-06-21','2021-07-09'),(5,'Sonderurlaub',8,'2021-09-07','2021-09-09'),(6,'Urlaub',12,'2021-12-01','2021-12-23'),(7,'Urlaub',5,'2021-07-22','2021-08-20');
/*!40000 ALTER TABLE `urlaube` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-11 16:39:16
