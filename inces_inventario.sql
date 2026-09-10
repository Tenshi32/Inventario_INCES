-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-09-2026 a las 16:23:59
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
-- Base de datos: `inces_inventario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auditoria_sistema`
--

CREATE TABLE `auditoria_sistema` (
  `id_auditoria` bigint(20) NOT NULL,
  `id_interno_usuario` int(12) DEFAULT NULL,
  `tabla_afectada` varchar(100) NOT NULL,
  `accion` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `id_registro_afectado` bigint(20) DEFAULT NULL,
  `datos_anteriores` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`datos_anteriores`)),
  `datos_nuevos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`datos_nuevos`)),
  `ip_origen` varchar(45) DEFAULT NULL,
  `fecha_hora` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consumibles`
--

CREATE TABLE `consumibles` (
  `id_consumible` bigint(12) NOT NULL,
  `id_tipo_consumible` int(11) NOT NULL,
  `cantidad_stock` varchar(12) NOT NULL,
  `stock_minimo` varchar(12) NOT NULL,
  `modelo_consumible` varchar(100) NOT NULL,
  `es_original` enum('Original','Generico','Recargado') DEFAULT 'Original',
  `fecha_carga` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dependencia`
--

CREATE TABLE `dependencia` (
  `id_dependencia` int(11) NOT NULL,
  `dependencia` text NOT NULL,
  `id_estado` int(11) NOT NULL,
  `id_piso` int(2) NOT NULL DEFAULT 1,
  `codigo` varchar(50) NOT NULL,
  `activo` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `dependencia`
--

INSERT INTO `dependencia` (`id_dependencia`, `dependencia`, `id_estado`, `id_piso`, `codigo`, `activo`) VALUES
(1, 'Coordinación Programa Turismo', 4, 1, '447304021', 1),
(2, 'Coordinación Programa Penitenciario', 4, 1, '447306021', 1),
(3, 'Centro Formación Comercial La Victoria', 4, 1, '18', 1),
(4, 'Centro Formación Comercial Maracay', 4, 1, '19', 1),
(5, 'Centro Formación Industrial El Limón', 4, 1, '20', 1),
(6, 'Centro Polivalente Villa De Cura', 4, 1, '21', 1),
(7, 'Centro De Formación Textil', 4, 1, '22', 1),
(8, 'Centro Tecnologico Industrial La Victoria', 4, 1, '23', 1),
(9, 'Centro Tecnológico Industrial Maracay', 4, 1, '24', 1),
(10, 'Centro De Formación Construcción', 4, 1, '25', 1),
(11, 'Centro Nacional De Mecánica Automotriz', 4, 1, '26', 1),
(12, 'Centro Polivalente Bermudez', 4, 1, '27', 1),
(13, 'Centro Polivalente Cagua', 4, 1, '28', 1),
(14, 'Centro Polivalente Ocumare De La Costa', 4, 1, '29', 1),
(15, 'C, F, S, A, La Providencia', 4, 1, '30', 1),
(16, 'C, F, S, A, Colonia Tovar', 4, 1, '31', 1),
(17, 'C, F, S, A, La Morita', 4, 1, '794', 1),
(18, 'C,F,S Construcción', 4, 1, '931', 1),
(19, 'C, F, S, Metal Minero La Victoria', 4, 1, '372', 1),
(20, 'C, F, S, Cema', 4, 1, '771', 1),
(21, 'C, F, S, Ocumare', 4, 1, '837', 1),
(22, 'C, F, S, Maracay', 4, 1, '873', 1),
(23, 'C, F, S, Textil', 4, 1, '850', 1),
(24, 'C, F, S, Bermudez', 4, 1, '634', 1),
(25, 'C, F, S, Cagua', 4, 1, '519', 1),
(26, 'C, F, S, Comercial La Victoria', 4, 1, '594', 1),
(27, 'C, F, S, El Limón', 4, 1, '413', 1),
(28, 'C, F, S, Metalminero Maracay', 4, 1, '182', 1),
(29, 'C, F, S, Programa Turismo', 4, 1, '474', 1),
(30, 'C, F, S, Villa Cura', 4, 1, '822', 1),
(31, 'CCFPI', 4, 1, '789', 1),
(32, 'Cema ', 4, 1, '476', 1),
(33, 'División De Administración', 4, 1, '4', 1),
(34, 'División De Sercio Y Mantenimineto ', 4, 1, '5', 1),
(35, 'División De Informatica', 4, 1, '6', 1),
(36, 'División De Formacion Profesional', 4, 1, '7', 1),
(37, 'División De Seguridad', 4, 1, '8', 1),
(38, 'División De Talento Humano ', 4, 1, '3', 1),
(39, 'Sede La Romana', 4, 1, '817', 1),
(40, 'Sede Regional Aragua ', 4, 1, '754', 1),
(41, 'Tributos Aragua', 4, 1, '319', 1),
(42, 'Unidad De Planificación', 4, 1, '2', 1),
(43, 'Unidad De Tecnología Educativa', 4, 1, '9', 1),
(44, 'Unidad De Adiestramiento De Empresa', 4, 1, '13', 1),
(45, 'Unidad De Formación Delegada', 4, 1, '14', 1),
(46, 'Unidad Programa Navional Aprendisaje', 4, 1, '15', 1),
(47, 'Unidades Móviles', 4, 1, '16', 1),
(48, 'Coordinación Programa Ferroviario', 4, 1, '33', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dispositivos`
--

CREATE TABLE `dispositivos` (
  `id_dispositivo` bigint(12) NOT NULL,
  `posee_codigo` enum('Si','No') NOT NULL,
  `cd_dispositivo` varchar(100) NOT NULL DEFAULT 'S/Activo',
  `posee_marca` enum('Si','No') NOT NULL,
  `posee_modelo` enum('Si','No') NOT NULL,
  `id_marca` int(12) NOT NULL DEFAULT 1,
  `id_modelo` int(12) NOT NULL DEFAULT 1,
  `id_tipo_dispositivo` int(12) NOT NULL DEFAULT 1,
  `posee_serial` enum('Si','No') NOT NULL,
  `serial` varchar(100) NOT NULL DEFAULT 'S/Serial',
  `descripcion_general` varchar(100) NOT NULL,
  `observaciones_tecnicas` varchar(100) NOT NULL,
  `id_status` int(2) NOT NULL,
  `fecha_carga` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `dispositivos`
--

INSERT INTO `dispositivos` (`id_dispositivo`, `posee_codigo`, `cd_dispositivo`, `posee_marca`, `posee_modelo`, `id_marca`, `id_modelo`, `id_tipo_dispositivo`, `posee_serial`, `serial`, `descripcion_general`, `observaciones_tecnicas`, `id_status`, `fecha_carga`, `fecha_modificacion`) VALUES
(2517192072, 'Si', 'P-HDGSKJ2341', 'Si', 'No', 53, 1, 4, 'No', '', 'dfasdfas', 'dfasdfadf', 2, '2026-07-28 09:22:11', '2026-09-07 09:02:15'),
(3572403340, 'Si', '66466', 'Si', 'No', 1, 1, 20, 'Si', 'vnbv57567', 'FA', 'ASDFASDF', 1, '2026-07-30 08:15:51', '2026-09-08 13:13:25'),
(5247695979, 'Si', '66466', 'Si', 'No', 56, 1, 19, 'Si', 'kjhlfghlsdkfjgh', '', '', 3, '2026-07-27 14:06:18', '2026-09-08 13:15:04'),
(5698727685, 'Si', 'UP-5415315', 'Si', 'No', 50, 1, 9, 'Si', 'SN218641', 'UPS Ubicado en la division de informatica', 'Ups con conectores a puertos USB\r\n3 conectores con aberturas con tierra\r\n2 conectores basicos', 1, '2026-09-08 10:27:51', '2026-09-08 10:27:51'),
(6044969667, 'Si', 'P-MNOR2131', 'Si', 'No', 50, 1, 6, 'Si', 'vnbv57567', 'DFASDF', 'DSFASDF', 1, '2026-09-07 08:35:17', '2026-09-08 10:40:14'),
(6468430428, 'Si', '66466', 'Si', 'No', 51, 1, 17, 'Si', 'dfsgdfg', '', '', 3, '2026-07-27 12:58:32', '2026-09-08 13:14:52'),
(8871525667, 'Si', '66466', 'Si', 'No', 1, 1, 8, 'Si', 'dfsgdfg', '', '', 3, '2026-07-27 10:17:35', '2026-09-08 09:41:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE `estados` (
  `id_estado` int(11) NOT NULL,
  `estado` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`id_estado`, `estado`) VALUES
(1, 'Amazonas'),
(2, 'Anzoátegui'),
(3, 'Apure'),
(4, 'Aragua'),
(5, 'Barinas'),
(6, 'Bolívar'),
(7, 'Carabobo'),
(8, 'Cojedes'),
(9, 'Delta Amacuro'),
(10, 'Falcón'),
(11, 'Guárico'),
(12, 'Lara'),
(13, 'Mérida'),
(14, 'Miranda'),
(15, 'Monagas'),
(16, 'Nueva Esparta'),
(17, 'Portuguesa'),
(18, 'Sucre'),
(19, 'Táchira'),
(20, 'Trujillo'),
(21, 'Vargas'),
(22, 'Yaracuy'),
(23, 'Zulia'),
(24, 'Distrito Capital'),
(25, 'Dependencias Federales');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `interno`
--

CREATE TABLE `interno` (
  `id_interno` int(12) NOT NULL,
  `id_usuario_cedula` int(12) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_rol_interno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `id_marcas` int(12) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `estado_marca` enum('1','2','3') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`id_marcas`, `marca`, `estado_marca`) VALUES
(1, 'S/Marca', '1'),
(2, 'VIT', '1'),
(3, 'IBM', '1'),
(4, 'HP', '1'),
(5, 'HP COMPAQ', '1'),
(6, 'YBT', '1'),
(7, 'COMPAQ', '1'),
(8, 'SIRAGON', '1'),
(9, 'CLON', '1'),
(10, 'AUSE', '1'),
(11, 'LENOVO', '1'),
(12, 'SAMSUNG', '1'),
(13, 'SUN', '1'),
(14, 'DELL', '1'),
(15, 'AOC', '1'),
(16, 'L1706', '1'),
(17, 'PERFECT SOUND', '1'),
(18, 'HIUNDAY', '1'),
(19, 'GENIUS', '1'),
(20, 'PA', '1'),
(21, 'Q', '1'),
(22, 'BENQ', '1'),
(23, 'AITEG', '1'),
(24, 'EE', '1'),
(25, 'KODE', '1'),
(26, 'MICROSOFT', '1'),
(27, 'KB-0316', '1'),
(28, 'A4TCH', '1'),
(29, 'OMEGA', '1'),
(30, 'SONY', '1'),
(31, 'TECH', '1'),
(32, 'CANYON', '1'),
(33, 'LOGITECH', '1'),
(34, 'GE', '1'),
(35, 'WASH', '1'),
(36, 'OPTICAL MOUSE', '1'),
(37, 'GENERICO', '1'),
(38, 'MEGA', '1'),
(39, 'APSU', '1'),
(40, 'SMART ELECTRONIC', '1'),
(41, 'ZUHIPOINT', '1'),
(42, 'APC', '1'),
(43, 'PHASE ELECTRONICA', '1'),
(44, 'CDP', '1'),
(45, 'TONAL PLUS', '1'),
(46, 'SONI VIEW', '1'),
(47, 'AVTEK', '1'),
(48, 'INTEGRA', '1'),
(49, 'GALAXY', '1'),
(50, 'XIX', '1'),
(51, 'CENTINELA', '1'),
(52, 'POWER LINE', '1'),
(53, 'CARDINAL', '1'),
(54, 'NUSE', '1'),
(55, 'SALICRU', '1'),
(56, 'FORZA', '1'),
(57, 'EMERALD', '1'),
(58, 'S&S', '1'),
(59, 'AXIUS', '1'),
(60, 'STAT BAT', '1'),
(61, 'RPC PLUS', '1'),
(62, 'DELCOP', '1'),
(63, 'CANON', '1'),
(64, 'EPSON', '1'),
(65, 'EXOMFX', '1'),
(66, 'DELUX', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelos`
--

CREATE TABLE `modelos` (
  `id_modelos` int(12) NOT NULL,
  `id_marca` int(12) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `estado_modelo` enum('1','2','3') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modelos`
--

INSERT INTO `modelos` (`id_modelos`, `id_marca`, `modelo`, `estado_modelo`) VALUES
(1, 1, 'S/Modelo', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pisos`
--

CREATE TABLE `pisos` (
  `id_piso` int(2) NOT NULL,
  `id_piso_dependencia` int(4) NOT NULL,
  `piso` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pisos`
--

INSERT INTO `pisos` (`id_piso`, `id_piso_dependencia`, `piso`) VALUES
(1, 40, 'Sotano'),
(2, 40, 'Planta Baja'),
(3, 40, 'Piso 1'),
(4, 40, 'Piso 2'),
(5, 40, 'Piso 3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `redes`
--

CREATE TABLE `redes` (
  `id_red` bigint(12) NOT NULL,
  `direccion_ip` varchar(100) NOT NULL,
  `direccion_mac` varchar(100) NOT NULL,
  `datos_red` enum('INALAMBRICA','CABLE') NOT NULL,
  `punto` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre_rol`) VALUES
(1, 'Visor'),
(2, 'Técnico'),
(3, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `softwares`
--

CREATE TABLE `softwares` (
  `id_software` bigint(12) NOT NULL,
  `tipo_so` enum('Privado','Libre') NOT NULL,
  `tipo_particion` enum('Windows/Linux','Windows','Linux') NOT NULL,
  `tipo_distribucion` varchar(100) NOT NULL,
  `arquitectura` enum('32-bit','64-bit','ARM') DEFAULT '64-bit',
  `es_dual_boot` enum('Si','No') NOT NULL DEFAULT 'No',
  `segundo_so` varchar(100) DEFAULT NULL,
  `version` varchar(100) NOT NULL,
  `programas` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_consumible`
--

CREATE TABLE `tipo_consumible` (
  `id_tipo_consumible` int(11) NOT NULL,
  `consumible` varchar(30) NOT NULL,
  `grupo_consumible` enum('Cables','Impresora','Almacenamiento','Red','Rendimiento','Energia') NOT NULL,
  `estado_consumible` enum('1','2') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_dispositivos`
--

CREATE TABLE `tipo_dispositivos` (
  `id_tipo_dispositivo` int(12) NOT NULL,
  `tipo_dispositivo` varchar(50) NOT NULL,
  `estado_tipo_dispositivo` enum('1','2') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_dispositivos`
--

INSERT INTO `tipo_dispositivos` (`id_tipo_dispositivo`, `tipo_dispositivo`, `estado_tipo_dispositivo`) VALUES
(1, 'S/Categoria', '1'),
(2, 'Switches', '1'),
(3, 'Laptop', '1'),
(4, 'Escaner', '1'),
(5, 'Impresora', '1'),
(6, 'VideoBeam', '1'),
(7, 'Camara', '1'),
(8, 'Consumible', '1'),
(9, 'UPS', '1'),
(10, 'Powerships', '1'),
(11, 'Router', '1'),
(12, 'Patch Panel', '1'),
(13, 'Rack', '1'),
(14, 'Organizador de Cables', '1'),
(15, 'Model', '1'),
(16, 'CPU', '1'),
(17, 'Monitor', '1'),
(18, 'Mouses', '1'),
(19, 'Teclado', '1'),
(20, 'CPU', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_servicios`
--

CREATE TABLE `tipo_servicios` (
  `id_tipo_servicios` int(11) NOT NULL,
  `servicio` varchar(100) NOT NULL,
  `estado_servicio` enum('1','2','3') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_servicios`
--

INSERT INTO `tipo_servicios` (`id_tipo_servicios`, `servicio`, `estado_servicio`) VALUES
(1, 'S/Servicio', '1'),
(2, 'Metro Ethernet', '1'),
(3, 'Fibra ABBA Plus', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_status`
--

CREATE TABLE `tipo_status` (
  `id_tipo_status` int(2) NOT NULL,
  `statu` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_status`
--

INSERT INTO `tipo_status` (`id_tipo_status`, `statu`) VALUES
(1, 'Operativo'),
(2, 'Inoperativo'),
(3, 'Dañado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `cedula` int(12) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `cargo` varchar(20) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `status_usuario` enum('1','2') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`cedula`, `nombre`, `apellido`, `correo`, `cargo`, `telefono`, `status_usuario`) VALUES
(29772294, 'angel', 'leon', 'ggffd@gmail.com', 'HDD', '21312423412', '1'),
(200099224, 'INCES', 'ARAGUA', NULL, 'Instituciòn', '0000-000-00-00', '1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `auditoria_sistema`
--
ALTER TABLE `auditoria_sistema`
  ADD PRIMARY KEY (`id_auditoria`),
  ADD KEY `fk_auditoria_usuario` (`id_interno_usuario`);

--
-- Indices de la tabla `consumibles`
--
ALTER TABLE `consumibles`
  ADD PRIMARY KEY (`id_consumible`),
  ADD KEY `id_tipo_consumible` (`id_tipo_consumible`);

--
-- Indices de la tabla `dependencia`
--
ALTER TABLE `dependencia`
  ADD PRIMARY KEY (`id_dependencia`),
  ADD KEY `estado_dependencia_ibfk_1` (`id_estado`),
  ADD KEY `id_piso` (`id_piso`);

--
-- Indices de la tabla `dispositivos`
--
ALTER TABLE `dispositivos`
  ADD PRIMARY KEY (`id_dispositivo`),
  ADD KEY `dispositivos_ibfk_1` (`id_modelo`),
  ADD KEY `dispositivos_ibfk_2` (`id_status`),
  ADD KEY `dispositivos_ibfk_3` (`id_tipo_dispositivo`),
  ADD KEY `dispositivos_ibfk_4` (`id_marca`);

--
-- Indices de la tabla `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `interno`
--
ALTER TABLE `interno`
  ADD PRIMARY KEY (`id_interno`),
  ADD KEY `interno_usuario_ibfk_1` (`id_usuario_cedula`),
  ADD KEY `interno_rol_ibfk_2` (`id_rol_interno`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`id_marcas`);

--
-- Indices de la tabla `modelos`
--
ALTER TABLE `modelos`
  ADD PRIMARY KEY (`id_modelos`),
  ADD KEY `modelos_ibfk_1` (`id_marca`);

--
-- Indices de la tabla `pisos`
--
ALTER TABLE `pisos`
  ADD PRIMARY KEY (`id_piso`),
  ADD KEY `pisos_dependencia_ibfk_1` (`id_piso_dependencia`);

--
-- Indices de la tabla `redes`
--
ALTER TABLE `redes`
  ADD PRIMARY KEY (`id_red`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `softwares`
--
ALTER TABLE `softwares`
  ADD PRIMARY KEY (`id_software`);

--
-- Indices de la tabla `tipo_consumible`
--
ALTER TABLE `tipo_consumible`
  ADD PRIMARY KEY (`id_tipo_consumible`);

--
-- Indices de la tabla `tipo_dispositivos`
--
ALTER TABLE `tipo_dispositivos`
  ADD PRIMARY KEY (`id_tipo_dispositivo`);

--
-- Indices de la tabla `tipo_servicios`
--
ALTER TABLE `tipo_servicios`
  ADD PRIMARY KEY (`id_tipo_servicios`);

--
-- Indices de la tabla `tipo_status`
--
ALTER TABLE `tipo_status`
  ADD PRIMARY KEY (`id_tipo_status`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`cedula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `id_marcas` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT de la tabla `pisos`
--
ALTER TABLE `pisos`
  MODIFY `id_piso` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipo_consumible`
--
ALTER TABLE `tipo_consumible`
  MODIFY `id_tipo_consumible` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_dispositivos`
--
ALTER TABLE `tipo_dispositivos`
  MODIFY `id_tipo_dispositivo` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `auditoria_sistema`
--
ALTER TABLE `auditoria_sistema`
  ADD CONSTRAINT `fk_auditoria_usuario` FOREIGN KEY (`id_interno_usuario`) REFERENCES `interno` (`id_interno`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `consumibles`
--
ALTER TABLE `consumibles`
  ADD CONSTRAINT `tipo_consumibles_ibfk_1` FOREIGN KEY (`id_tipo_consumible`) REFERENCES `tipo_consumible` (`id_tipo_consumible`);

--
-- Filtros para la tabla `dependencia`
--
ALTER TABLE `dependencia`
  ADD CONSTRAINT `estado_dependencia_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estados` (`id_estado`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `piso_dependencia_ibfk_2` FOREIGN KEY (`id_piso`) REFERENCES `pisos` (`id_piso`);

--
-- Filtros para la tabla `dispositivos`
--
ALTER TABLE `dispositivos`
  ADD CONSTRAINT `dispositivos_ibfk_1` FOREIGN KEY (`id_modelo`) REFERENCES `modelos` (`id_modelos`),
  ADD CONSTRAINT `dispositivos_ibfk_2` FOREIGN KEY (`id_status`) REFERENCES `tipo_status` (`id_tipo_status`),
  ADD CONSTRAINT `dispositivos_ibfk_3` FOREIGN KEY (`id_tipo_dispositivo`) REFERENCES `tipo_dispositivos` (`id_tipo_dispositivo`) ON UPDATE CASCADE,
  ADD CONSTRAINT `dispositivos_ibfk_4` FOREIGN KEY (`id_marca`) REFERENCES `marcas` (`id_marcas`);

--
-- Filtros para la tabla `interno`
--
ALTER TABLE `interno`
  ADD CONSTRAINT `interno_rol_ibfk_2` FOREIGN KEY (`id_rol_interno`) REFERENCES `rol` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `interno_usuario_ibfk_1` FOREIGN KEY (`id_usuario_cedula`) REFERENCES `usuarios` (`cedula`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `modelos`
--
ALTER TABLE `modelos`
  ADD CONSTRAINT `modelos_ibfk_1` FOREIGN KEY (`id_marca`) REFERENCES `marcas` (`id_marcas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pisos`
--
ALTER TABLE `pisos`
  ADD CONSTRAINT `pisos_dependencia_ibfk_1` FOREIGN KEY (`id_piso_dependencia`) REFERENCES `dependencia` (`id_dependencia`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
