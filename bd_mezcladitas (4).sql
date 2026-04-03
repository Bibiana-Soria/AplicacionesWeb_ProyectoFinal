-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307
-- Tiempo de generación: 04-04-2026 a las 01:19:35
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_mezcladitas`
--
CREATE DATABASE IF NOT EXISTS `bd_mezcladitas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bd_mezcladitas`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE IF NOT EXISTS `inventario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(60) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `marca` varchar(60) NOT NULL,
  `descripcion` varchar(60) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `existencia` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`id`, `categoria`, `nombre`, `marca`, `descripcion`, `precio`, `existencia`) VALUES
(4, 'LLAVERO', 'FURIA nocturna', 'DESIGN', 'chico', 30.00, 12),
(5, 'BOLSA', 'BLOOM', 'GUESS', 'ROSA', 100.00, 7),
(6, 'PERFUME', 'HALLOWEEN', 'IDK', 'MUJER', 1200.00, 7),
(11, 'TENIS', 'EQUIS', 'IDK', 'AZULES', 1200.00, 5),
(12, 'BOLSAS', 'BLUE', 'GUESS', 'IDK', 1200.00, 5),
(13, 'LLAVEROS', 'AJOLOTE', 'DESIGN', 'MINI', 25.00, 10),
(17, 'TENIS', 'JORDAN AIR', 'NIKE', 'ROJOS', 5000.00, 3),
(27, 'pulsera', 'italiana', 'chula', 'pulsera de chula ', 100.00, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesion`
--

CREATE TABLE IF NOT EXISTS `sesion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `apellidos` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `contrasena` varchar(60) NOT NULL,
  `rol` varchar(20) DEFAULT 'empleado',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sesion`
--

INSERT INTO `sesion` (`id`, `nombre`, `apellidos`, `email`, `contrasena`, `rol`) VALUES
(1, 'ANITA', 'GARCIA', 'anita@gmail.com', '1234', 'admin'),
(2, 'BIBIS', 'SORIA', 'bibs@gmail.com', '4321', 'empleado'),
(3, 'CHESTER', 'CHETTOS', 'chester@gmail.com', '123', 'empleado'),
(4, 'PEDRITO', 'ZAPATA', 'ped@gmail.com', '1234', 'empleado'),
(5, 'DAGOBERTO', 'FISCAL', 'dagfiscal@gmail.com', '456', 'empleado'),
(6, 'tigre toño', 'el de zucaritas', 'cereal@ejemplo.com', '$2b$10$IbVFC.XEbHzsRUkVLIpUiex8moLLk41LbxJysnET1uy30dM25LmK.', 'empleado'),
(7, 'stingy', 'lazy town', 'stingy@correo.com', '$2b$10$NT56HrL.I4yAZkjXtV.hzexPYhyJo03OSPGdphMO.ON4IkjwZpTY6', 'empleado'),
(8, 'a', 'aa', 'a@correo.com', '$2b$10$DFOAYYa4kuW1gNhuFSjNi.CgpvUdcJsIjoxz1WHgJisvMzLY3FjoS', 'empleado'),
(9, 'ana', 'garcia', 'ana@correo.com', '$2b$10$PqjWNHvhVSj82mL6g8s6keEKuzpXTgWqHnpvv74ZpYJby5F0ykvGS', 'empleado'),
(10, 'chester', 'chettos', 'chester@correo.com', '$2b$10$tvG/t1iZnYKXxdvLRJmkxOP9acRih00jzpFaSoh.pdsyGoiiL9usS', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE IF NOT EXISTS `ventas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `categoria` varchar(60) NOT NULL,
  `unidades_vendidas` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_producto` (`id_producto`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `id_usuario`, `id_producto`, `nombre`, `categoria`, `unidades_vendidas`, `total`, `fecha`) VALUES
(9, 3, 6, '6', 'PERFUME', 7, 8400.00, '2026-03-31'),
(10, 3, 11, 'EQUIS', 'TENIS', 2, 2400.00, '2025-07-26'),
(16, 3, 12, 'BLUE', 'BOLSAS', 2, 2400.00, '2025-07-29'),
(20, 3, 4, 'FURIA', 'LLAVEROS', 1, 100.00, '2025-07-30'),
(24, 5, 17, 'JORDAN AIR', 'TENIS', 1, 5000.00, '2025-07-30'),
(25, 2, 5, 'BLOOM', 'BOLSA', 3, 300.00, '2026-03-28'),
(26, 7, 4, 'FURIA', 'LLAVEROS', 2, 200.00, '2026-03-31'),
(32, 7, 27, 'italiana', 'pulsera', 1, 100.00, '2026-04-01'),
(33, 7, 27, 'italiana', 'pulsera', 3, 300.00, '2026-04-01'),
(36, 7, 27, 'italiana', 'pulsera', 5, 500.00, '2026-04-03');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `inventario` (`id`),
  ADD CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `sesion` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
