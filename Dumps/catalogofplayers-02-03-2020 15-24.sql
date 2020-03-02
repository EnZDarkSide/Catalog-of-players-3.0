/*
 Navicat Premium Data Transfer

 Source Server         : FootballPlayers
 Source Server Type    : MySQL
 Source Server Version : 50523
 Source Host           : localhost:3306
 Source Schema         : catalogofplayers

 Target Server Type    : MySQL
 Target Server Version : 50523
 File Encoding         : 65001

 Date: 02/03/2020 15:24:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for players
-- ----------------------------
DROP TABLE IF EXISTS `players`;
CREATE TABLE `players`  (
  `ID` int(50) UNSIGNED NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(60) CHARACTER SET cp1251 COLLATE cp1251_general_ci NOT NULL,
  `LastName` varchar(60) CHARACTER SET cp1251 COLLATE cp1251_general_ci NOT NULL,
  `Sex` varchar(20) CHARACTER SET cp1251 COLLATE cp1251_general_ci NOT NULL,
  `DateOfBirth` date NOT NULL,
  `Country` varchar(60) CHARACTER SET cp1251 COLLATE cp1251_general_ci NOT NULL,
  `Team` varchar(60) CHARACTER SET cp1251 COLLATE cp1251_general_ci NOT NULL,
  PRIMARY KEY (`ID`, `Sex`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = cp1251 COLLATE = cp1251_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of players
-- ----------------------------
INSERT INTO `players` VALUES (1, 'Фабио', 'Баццани', 'Мужской', '1976-10-20', 'Италия', 'Ареццо');
INSERT INTO `players` VALUES (2, 'Франческо', 'Грациани', 'Мужской', '1952-12-16', 'Италия', 'Ареццо');
INSERT INTO `players` VALUES (3, 'Марко', 'Ди Лорето', 'Мужской', '1974-09-28', 'Италия', 'Ареццо');
INSERT INTO `players` VALUES (4, 'Маттиа', 'Шевола', 'Мужской', '1996-11-01', 'Италия', 'Асколи');
INSERT INTO `players` VALUES (5, 'Никита', 'Медведев', 'Мужской', '1994-12-17', 'Россия', 'Локомотив');
INSERT INTO `players` VALUES (6, 'Антов', 'Коченков', 'Мужской', '1987-04-02', 'Россия', 'Локомотив');
INSERT INTO `players` VALUES (7, 'Антон', 'Миранчук', 'Мужской', '1995-10-17', 'Россия', 'Локомотив');
INSERT INTO `players` VALUES (8, 'Илья', 'Помазун', 'Мужской', '1996-08-16', 'Россия', 'ЦСКА');
INSERT INTO `players` VALUES (9, 'Игорь', 'Акинфеев', 'Мужской', '1986-04-08', 'Россия', 'ЦСКА');
INSERT INTO `players` VALUES (10, 'Шон', 'Джонсон', 'Мужской', '1989-05-31', 'США', 'Нью-Йорк Сити');
INSERT INTO `players` VALUES (11, 'Бэнджамин', 'Суэт', 'Мужской', '1991-09-04', 'США', 'Нью-Йорк Сити');

SET FOREIGN_KEY_CHECKS = 1;
