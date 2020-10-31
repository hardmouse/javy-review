-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 04, 2020 at 09:20 PM
-- Server version: 5.6.47
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hardm3_javyreview`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog_post`
--

CREATE TABLE `blog_post` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `catagory` enum('general','games','food','tv','book','place') NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `edit_date` datetime DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `body` text,
  `image_id` varchar(40) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog_post`
--

INSERT INTO `blog_post` (`id`, `user_id`, `catagory`, `date`, `edit_date`, `title`, `body`, `image_id`, `video_url`) VALUES
(1, 1, 'games', '2020-10-01 19:18:01', NULL, 'Paper Mario - Origami King', 'My dad took over my joystick so I didn\'t get a chance to play. >_<\r\n\r\nNo cookie for you! Old Man!', '1', 'https://www.youtube.com/embed/FX6DTLcWUdY'),
(2, 2, 'games', '2020-10-01 19:18:01', NULL, 'SpongeBob SquarePants: Battle for Bikini Bottom - Rehydrated', 'This game had been released for while but I haven\'t play it yet. Some part is spooky to me that I am afraid to play. Even thought it still a great game that I want to finish. Too bad I can only play during weekend.', '2', 'https://www.youtube.com/embed/V1iyBfjgjxk'),
(3, 1, 'games', '2020-10-01 19:18:01', NULL, 'Super Smash Bros. Ultimate', 'SUPER GAME!!! Period!', '3', 'https://www.youtube.com/embed/WLu7e8RZoYc'),
(5, 2, 'games', '2020-10-01 19:18:01', NULL, 'Animal Crossing: New Horizons ', 'Yesterday, Nintendo rolled out version 1.5.0 of Animal Crossing: New Horizons and while the main purpose of this update was to add some spooky seasonal content in time for Halloween, it seems to have also removed certain hacked items.\r\n\r\nOne item, in particular, that\'s gone missing since this update is a hacked fence - the same fence that appears on Harv\'s Island, Photopia. Just like Star Fragments it\'s not really meant to be accessible to the player. For some time though, hackers have been distributing stacks of this fence to other players - allowing them to place them around their own islands. As of the latest update, it appears these days are over.', '5', 'https://www.youtube.com/embed/_3YNL0OWio0'),
(4, 1, 'games', '2020-10-02 19:22:11', NULL, 'The Legend of Zelda: Breath of the Wild', 'The Legend of Zelda is a high fantasy action-adventure video game franchise created by Japanese game designers Shigeru Miyamoto and Takashi Tezuka. It is primarily developed and published by Nintendo, although some portable installments and re-releases have been outsourced to Capcom, Vanpool, and Grezzo. The gameplay incorporates action-adventure and elements of action RPG games.\r\n\r\nThe series centers on the various incarnations of Link; a courageous young man, with pointy elf-like ears and Princess Zelda; the mortal reincarnation of the goddess Hylia. Although his origins and backstory differ from game to game, Link is often given the task of rescuing the kingdom of Hyrule from Ganon, an evil warlord turned demon who is the principal antagonist of the series; however, other settings and antagonists have appeared in several games. The plots commonly involve the Triforce, a sacred relic left behind by goddesses that created Hyrule; Din, Farore and Nayru, representing the virtues of Courage, Wisdom and Power that when combined together are omnipotent.\r\n\r\nSince the original Legend of Zelda was released in 1986, the series has expanded to include 19 entries on all of Nintendo\'s major game consoles, as well as a number of spin-offs. An American animated TV series based on the games aired in 1989 and individual manga adaptations commissioned by Nintendo have been produced in Japan since 1997. The Legend of Zelda is one of Nintendo\'s most prominent and successful franchises; several of its entries are considered to be among the greatest video games of all time.', '4', 'https://www.youtube.com/embed/zw47_q9wbBE');

-- --------------------------------------------------------

--
-- Table structure for table `post_feedback`
--

CREATE TABLE `post_feedback` (
  `feed_id` int(255) NOT NULL,
  `feed_user_id` int(20) NOT NULL,
  `feed_type` enum('happy','like','hug','cry','sweat','rolleye','yike','hot','cold') NOT NULL,
  `feed_post_id` int(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post_feedback`
--

INSERT INTO `post_feedback` (`feed_id`, `feed_user_id`, `feed_type`, `feed_post_id`) VALUES
(1, 1, 'like', 2),
(2, 2, 'happy', 1),
(3, 1, 'like', 3),
(4, 3, 'happy', 1),
(5, 1, 'like', 1),
(6, 2, 'sweat', 2),
(7, 3, 'sweat', 2),
(8, 2, 'cold', 2),
(9, 1, 'rolleye', 2),
(10, 3, 'rolleye', 2),
(11, 0, 'cry', 2),
(12, 0, 'happy', 2),
(13, 1, 'like', 1),
(14, 1, 'hug', 1),
(15, 1, 'cold', 1),
(16, 0, '', 0),
(17, 1, 'hug', 1),
(18, 1, 'rolleye', 1),
(19, 1, 'happy', 1),
(20, 1, 'like', 1),
(21, 1, 'hot', 1),
(22, 1, 'like', 1),
(23, 1, 'like', 1),
(24, 1, 'like', 1),
(25, 1, 'sweat', 1),
(26, 1, 'cry', 1),
(27, 1, 'yike', 1),
(28, 1, 'hug', 3),
(29, 1, 'rolleye', 3),
(30, 1, 'sweat', 5),
(31, 1, 'cry', 5),
(32, 1, 'hot', 1),
(33, 1, 'like', 1);

-- --------------------------------------------------------

--
-- Table structure for table `post_photo`
--

CREATE TABLE `post_photo` (
  `id` int(20) NOT NULL,
  `user_id` int(10) NOT NULL,
  `post_id` int(20) NOT NULL,
  `photo_url` varchar(255) NOT NULL,
  `catagory` enum('general','games','food','tv','book','place') NOT NULL,
  `date` datetime NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post_photo`
--

INSERT INTO `post_photo` (`id`, `user_id`, `post_id`, `photo_url`, `catagory`, `date`, `description`) VALUES
(1, 1, 1, '[\r\n    {\"photo\": \"paper2header.jpg\",\"name\": \"mario 1\"},\r\n    {\"photo\": \"paperheader.jpg\",\"name\": \"mario 2\"}\r\n]', 'games', '2020-10-02 02:31:19', 'Paper Mario'),
(2, 2, 2, '[\r\n{\"photo\": \"sponge2header.jpg\",\"name\": \"spongebob 1\"},\r\n{\"photo\": \"spongeheader.jpg\",\"name\": \"spongebob 2\"}\r\n]', 'games', '2020-10-02 02:31:19', 'SpongeBob SquarePants Rehudrated'),
(3, 1, 3, '[{\"photo\": \"smashheader.jpg\",\"name\": \"Super Smash Bros : ULTIMATE\"}]', 'games', '2020-10-02 02:31:19', 'Super Smash Bros:ULTIMATE'),
(4, 1, 4, '[\r\n{\"photo\": \"zelda1.png\",\"name\": \"ZELDA\"},\r\n{\"photo\": \"zelda2.jpg\",\"name\": \"ZELDA\"},\r\n{\"photo\": \"zelda3.jpg\",\"name\": \"ZELDA\"},\r\n{\"photo\": \"zelda4.jpg\",\"name\": \"ZELDA\"},\r\n{\"photo\": \"zelda5.jpg\",\"name\": \"ZELDA\"}\r\n]', 'games', '2020-10-02 19:32:54', 'This is ZELDA review'),
(5, 2, 5, '[\r\n{\"photo\": \"animal1.jpg\",\"name\": \"Animal Crossing 1\"},\r\n{\"photo\": \"animal2.jpg\",\"name\": \"Animal Crossing 2\"},\r\n{\"photo\": \"animal3.jpg\",\"name\": \"Animal Crossing 3\"}\r\n]', 'games', '2020-10-02 02:31:19', 'Animal Crossing ');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `mypwd` varchar(100) DEFAULT NULL,
  `email` varchar(125) DEFAULT NULL,
  `middlename` varchar(30) NOT NULL,
  `nickname` varchar(100) NOT NULL,
  `title` varchar(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `color` varchar(6) NOT NULL,
  `active` enum('locked','activated','hold') NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `mypwd`, `email`, `middlename`, `nickname`, `title`, `description`, `dob`, `avatar`, `color`, `active`, `image`) VALUES
(1, 'Javy', 'Yu', '1q2w3e4r5t', '349187245@gapps.yrdsb.ca', 'Magic Mountain', 'Cha-Cha-Chabu!!', 'Rocket Punch', 'This is my post. This is the way!', '2011-06-18', '[\r\n{\"color\":\"3377ff\"},\r\n{\"chr\":\"tiger\"}\r\n]', '3377ff', 'activated', 'javy.png'),
(2, 'Irene', 'Yu', '1qaz2wsx3edc', '349602391@gapps.yrdsb.ca', 'Diamond Shower', 'Meow-Meow Furry Ball Roll', 'Furry Ball', 'We will~ We will~ Meow you!', '2013-04-08', '[\r\n{\"color\":\"FFAABB\"},\r\n{\"chr\":\"cat\"}\r\n]', 'ffaabb', 'activated', 'irene.png'),
(3, 'Jay', 'Yu', '123qwe', 'hardmouse@gmail.com', 'hardmouse', 'hardmouse', 'I am one', 'Nothing', '1972-10-13', '[\r\n{\"color\":\"3FF7ff\"},\r\n{\"chr\":\"tiger\"}\r\n]', '0099FF', 'hold', ''),
(4, 'fu tung', 'Yulala', '52a6c9a2a45db6b4fdd38862171c626c', 'hardmouse@gmail.com', 'middle', 'nick', 'Boss', 'Hi all', '2000-10-01', '[\r\n{\"color\":\"77FF99\"},\r\n{\"chr\":\"octopus\"}\r\n]', '77FF99', 'hold', ''),
(5, 'fugt', 'wwla', 'a7d89c7a521cde5fdced9afec874f2f6', 'r.se@gmail.com', 'Rock', 'Dickcy', 'Muwawa', 'fffbf ry ery ery rtu rt urt uyrt tyrtty', '1999-11-22', '[\r\n{\"color\":\"99FFAA\"},\r\n{\"chr\":\"rabbit\"}\r\n]', 'FFEE99', 'locked', ''),
(6, 'ffffff', 'llllll', '1c48001dcd26419cacaba9ce3e565ddf', 'sdfsd@rrg.ll', 'COCOCOC', 'Nicke', 'TinnnKen', 'Hide!!', '1985-05-16', '', 'FF99AA', 'hold', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog_post`
--
ALTER TABLE `blog_post`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `post_feedback`
--
ALTER TABLE `post_feedback`
  ADD PRIMARY KEY (`feed_id`),
  ADD UNIQUE KEY `id` (`feed_id`);

--
-- Indexes for table `post_photo`
--
ALTER TABLE `post_photo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog_post`
--
ALTER TABLE `blog_post`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `post_feedback`
--
ALTER TABLE `post_feedback`
  MODIFY `feed_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `post_photo`
--
ALTER TABLE `post_photo`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
