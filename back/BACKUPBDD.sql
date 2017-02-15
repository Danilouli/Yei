-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Client :  crabbixfildaniel.mysql.db
-- Généré le :  Sam 05 Novembre 2016 à 17:03
-- Version du serveur :  5.5.52-0+deb7u1-log
-- Version de PHP :  5.4.45-0+deb7u5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `crabbixfildaniel`
--

-- --------------------------------------------------------

--
-- Structure de la table `bets`
--

CREATE TABLE IF NOT EXISTS `bets` (
  `ID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `proofsIDser` tinytext NOT NULL,
  `playersIDser` tinytext NOT NULL,
  `creatorID` int(11) NOT NULL,
  `deadline` datetime NOT NULL,
  `creationTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `betPictExt` varchar(5) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `bets`
--

INSERT INTO `bets` (`ID`, `name`, `proofsIDser`, `playersIDser`, `creatorID`, `deadline`, `creationTime`, `betPictExt`) VALUES
(1, 'le chien abboie', '[3,4,5,6,12,14,15,18,22,25]', '[1,2,3]', 1, '2016-09-02 09:30:00', '2016-08-24 06:00:00', '.png'),
(3, 'je range ma chambre', '[2,7,8,9,10,11,13,16,17,21,23,24,26,27,28]', '[1,2]', 2, '2016-09-15 16:20:00', '2016-08-23 19:54:37', '.jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `ID` int(11) NOT NULL,
  `value` mediumtext NOT NULL,
  `timePosted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `writerID` int(11) NOT NULL,
  `parentProofID` int(11) NOT NULL,
  `writerFirstName` varchar(20) NOT NULL,
  `writerLastName` varchar(20) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `comments`
--

INSERT INTO `comments` (`ID`, `value`, `timePosted`, `writerID`, `parentProofID`, `writerFirstName`, `writerLastName`) VALUES
(1, 'Lalali', '2016-09-06 07:24:35', 2, 4, '', ''),
(2, 'Lilalal', '2016-09-06 07:24:44', 2, 4, '', ''),
(3, 'Lilalal', '2016-09-06 07:24:44', 2, 4, '', ''),
(4, 'bhhjhj', '2016-09-06 09:04:00', 2, 5, '', ''),
(5, 'daiohaodj', '2016-09-06 13:28:06', 2, 4, '', ''),
(6, 'dada', '2016-09-07 09:45:36', 2, 5, '', ''),
(7, 'daodja', '2016-09-08 08:55:31', 2, 6, '', ''),
(8, 'iijiij', '2016-09-08 09:00:31', 2, 8, '', ''),
(9, 'ojj', '2016-09-08 09:03:03', 2, 9, '', ''),
(10, 'gygyg', '2016-09-08 09:03:15', 2, 10, '', ''),
(11, 'jji', '2016-09-08 09:11:20', 2, 11, '', ''),
(12, 'olis', '2016-09-08 09:24:17', 2, 12, '', ''),
(13, 'ilus', '2016-09-08 09:24:24', 2, 13, '', ''),
(14, 'hello', '2016-09-08 09:26:55', 2, 14, '', ''),
(15, 'KO', '2016-09-08 09:28:14', 2, 15, '', ''),
(16, 'huuhuh', '2016-09-08 09:36:51', 2, 16, '', ''),
(17, 'ertre', '2016-09-08 09:39:48', 2, 17, '', ''),
(18, 'Hululu', '2016-09-08 09:44:00', 2, 18, '', ''),
(19, 'illl', '2016-09-08 09:54:46', 2, 22, '', ''),
(20, 'Merci', '2016-09-08 09:57:38', 2, 23, '', ''),
(21, 'asasa', '2016-09-08 15:45:53', 2, 22, '', ''),
(22, 'asasasadffg', '2016-09-08 15:46:05', 2, 18, '', ''),
(23, 'uiy', '2016-09-08 15:46:11', 2, 18, '', ''),
(24, 'dada', '2016-09-08 15:53:39', 2, 28, '', ''),
(25, 'daggr', '2016-09-08 15:53:46', 2, 27, '', ''),
(26, 'uilollk', '2016-09-08 15:53:52', 2, 26, '', ''),
(27, 'poiliuj', '2016-09-08 15:53:59', 2, 25, '', ''),
(28, 'ftrey', '2016-09-08 15:54:05', 2, 24, '', ''),
(29, 'Bonjour', '2016-09-08 15:58:12', 2, 28, '', ''),
(30, 'Merci', '2016-09-08 15:58:16', 2, 27, '', ''),
(31, 'Bonjour', '2016-09-08 15:58:22', 2, 26, '', ''),
(32, 'Je', '2016-09-08 15:58:27', 2, 25, '', ''),
(33, 'Je vous', '2016-09-08 15:58:32', 2, 24, '', ''),
(34, 'Je ne suis pas', '2016-09-08 15:58:38', 2, 23, '', ''),
(35, 'Bonjour à', '2016-09-08 15:58:45', 2, 23, '', ''),
(36, 'Jdkd', '2016-09-27 21:28:39', 2, 28, '', '');

-- --------------------------------------------------------

--
-- Structure de la table `proofs`
--

CREATE TABLE IF NOT EXISTS `proofs` (
  `ID` int(11) NOT NULL,
  `type` char(255) NOT NULL,
  `extension` varchar(5) NOT NULL,
  `posterID` int(11) NOT NULL,
  `parentBetID` int(11) NOT NULL,
  `comments` longtext NOT NULL,
  `presText` varchar(255) NOT NULL,
  `proofWidth` float NOT NULL,
  `proofHeight` float NOT NULL,
  `commentsIDser` mediumtext NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `proofs`
--

INSERT INTO `proofs` (`ID`, `type`, `extension`, `posterID`, `parentBetID`, `comments`, `presText`, `proofWidth`, `proofHeight`, `commentsIDser`) VALUES
(1, 'video', '.mp4', 2, 0, '', 'Allo', 360, 640, '[]'),
(2, 'video', '.mp4', 2, 3, '', 'LE CHIENNN', 360, 640, '[]'),
(3, 'video', '.mp4', 2, 1, '', 'RECHIENN', 360, 640, '[]'),
(4, 'image', '.jpg', 2, 1, '', 'NEBULEUSE', 1500, 1000, '[1,2,3,5]'),
(5, 'image', '.jpg', 2, 1, '', 'UUUU', 1280, 848, '[4,6]'),
(6, 'image', '.jpg', 2, 1, '', 'ESCP', 960, 234, '[7]'),
(7, 'image', '.png', 2, 3, '', 'nj', 170, 200, '[]'),
(8, 'image', '.png', 2, 3, '', '?', 309, 400, '[8]'),
(9, 'image', '.jpg', 2, 3, '', 'dark', 1600, 1067, '[9]'),
(10, 'image', '.jpg', 2, 3, '', 'dark', 1600, 1067, '[10]'),
(11, 'image', '.png', 2, 3, '', 'YES', 244, 183, '[11]'),
(12, 'image', '.jpg', 2, 1, '', 'GLOU', 1611, 1008, '[12]'),
(13, 'image', '.png', 2, 3, '', 'huhhu', 170, 200, '[13]'),
(14, 'image', '.png', 2, 1, '', 'oiuy', 774, 710, '[14]'),
(15, 'image', '.png', 2, 1, '', 'kook', 1890, 1890, '[15]'),
(16, 'image', '.jpg', 2, 3, '', 'ilo', 1280, 848, '[16]'),
(17, 'image', '.png', 2, 3, '', 'iuytr', 170, 200, '[17]'),
(18, 'image', '.png', 2, 1, '', 'LS', 960, 728, '[18,22,23]'),
(19, 'image', '.jpg', 2, 3, '', 'E', 2432, 3286, ''),
(20, 'image', '.jpg', 2, 3, '', 'E', 2432, 3286, ''),
(21, 'image', '.png', 2, 3, '', 'IUE', 170, 200, '[]'),
(22, 'image', '.jpg', 2, 1, '', 'Hh', 2432, 3286, '[19,21]'),
(23, 'image', '.png', 2, 3, '', 'po', 309, 400, '[20,34,35]'),
(24, 'image', '.jpg', 2, 3, '', 'Merci', 3286, 2432, '[28,33]'),
(25, 'image', '.jpg', 2, 1, '', 'tuy', 960, 234, '[27,32]'),
(26, 'image', '.png', 2, 3, '', 'ZER', 309, 400, '[26,31]'),
(27, 'image', '.jpg', 2, 3, '', 'sa', 1500, 1000, '[25,30]'),
(28, 'image', '.jpg', 2, 3, '', 'ss', 1611, 1008, '[24,29,36]');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `ID` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `friendsIDser` text NOT NULL,
  `friendsReqIDser` text NOT NULL,
  `betsIDser` text NOT NULL,
  `proofsIDser` mediumtext NOT NULL,
  `profPictExt` varchar(5) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`ID`, `firstName`, `lastName`, `mail`, `password`, `friendsIDser`, `friendsReqIDser`, `betsIDser`, `proofsIDser`, `profPictExt`) VALUES
(1, 'Daniel', 'Saadia', 'danielsaadia0907@gmail.com', 'bcb8de9f87fd30bc5d8eeb36c364469a4d26e04d', '[2,3]', '[]', '[1,3]', '[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,21,22,23,24,25,26,27,28]', '.jpg'),
(2, 'Ahah', 'Hehe', 'abc@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '[1,3]', '[4]', '[1,3]', '[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,21,22,23,24,25,26,27,28]', '.png'),
(3, 'Maxime', 'Luque', 'Maxluque@hotmail.fr', '9ce7e5501ac992e35cdb83c7a0799a515155ef98', '[1,3]', '[]', '[1]', '[3,4,5,6,12,14,15,18,22,25]', '.jpg'),
(4, 'nfiankn', 'nkj', 'jojoj', 'effdb5f96a28acd2eb19dcb15d8f43af762bd0ae', '[]', '[]', '[1]', '[3,4,5]', ''),
(7, 'Didi', 'Dada', 'dada@gmail.com', 'a9993e364706816aba3e25717850c26c9cd0d89d', '[]', '[]', '[]', '[]', '');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `bets`
--
ALTER TABLE `bets`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `proofs`
--
ALTER TABLE `proofs`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `bets`
--
ALTER TABLE `bets`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT pour la table `proofs`
--
ALTER TABLE `proofs`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
