-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-09-2026 a las 01:21:48
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
  `id_dispositivo` bigint(12) NOT NULL,
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
  `codigo` varchar(50) NOT NULL,
  `activo` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `dependencia`
--

INSERT INTO `dependencia` (`id_dependencia`, `dependencia`, `id_estado`, `codigo`, `activo`) VALUES
(1, 'Coordinación Programa Turismo', 4, '447304021', 1),
(2, 'Coordinación Programa Penitenciario', 4, '447306021', 1),
(3, 'Centro Formación Comercial La Victoria', 4, '18', 1),
(4, 'Centro Formación Comercial Maracay', 4, '19', 1),
(5, 'Centro Formación Industrial El Limón', 4, '20', 1),
(6, 'Centro Polivalente Villa De Cura', 4, '21', 1),
(7, 'Centro De Formación Textil', 4, '22', 1),
(8, 'Centro Tecnologico Industrial La Victoria', 4, '23', 1),
(9, 'Centro Tecnológico Industrial Maracay', 4, '24', 1),
(10, 'Centro De Formación Construcción', 4, '25', 1),
(11, 'Centro Nacional De Mecánica Automotriz', 4, '26', 1),
(12, 'Centro Polivalente Bermudez', 4, '27', 1),
(13, 'Centro Polivalente Cagua', 4, '28', 1),
(14, 'Centro Polivalente Ocumare De La Costa', 4, '29', 1),
(15, 'C, F, S, A, La Providencia', 4, '30', 1),
(16, 'C, F, S, A, Colonia Tovar', 4, '31', 1),
(17, 'C, F, S, A, La Morita', 4, '794', 1),
(18, 'C,F,S Construcción', 4, '931', 1),
(19, 'C, F, S, Metal Minero La Victoria', 4, '372', 1),
(20, 'C, F, S, Cema', 4, '771', 1),
(21, 'C, F, S, Ocumare', 4, '837', 1),
(22, 'C, F, S, Maracay', 4, '873', 1),
(23, 'C, F, S, Textil', 4, '850', 1),
(24, 'C, F, S, Bermudez', 4, '634', 1),
(25, 'C, F, S, Cagua', 4, '519', 1),
(26, 'C, F, S, Comercial La Victoria', 4, '594', 1),
(27, 'C, F, S, El Limón', 4, '413', 1),
(28, 'C, F, S, Metalminero Maracay', 4, '182', 1),
(29, 'C, F, S, Programa Turismo', 4, '474', 1),
(30, 'C, F, S, Villa Cura', 4, '822', 1),
(31, 'CCFPI', 4, '789', 1),
(32, 'Cema ', 4, '476', 1),
(33, 'División De Administración', 4, '4', 1),
(34, 'División De Sercio Y Mantenimineto ', 4, '5', 1),
(35, 'División De Informatica', 4, '6', 1),
(36, 'División De Formacion Profesional', 4, '7', 1),
(37, 'División De Seguridad', 4, '8', 1),
(38, 'División De Talento Humano ', 4, '3', 1),
(39, 'Sede La Romana', 4, '817', 1),
(40, 'Sede Regional Aragua ', 4, '754', 1),
(41, 'Tributos Aragua', 4, '319', 1),
(42, 'Unidad De Planificación', 4, '2', 1),
(43, 'Unidad De Tecnología Educativa', 4, '9', 1),
(44, 'Unidad De Adiestramiento De Empresa', 4, '13', 1),
(45, 'Unidad De Formación Delegada', 4, '14', 1),
(46, 'Unidad Programa Navional Aprendisaje', 4, '15', 1),
(47, 'Unidades Móviles', 4, '16', 1),
(48, 'Coordinación Programa Ferroviario', 4, '33', 1);

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
(2517192072, 'Si', '66466', 'No', 'No', 1, 1, 18, 'No', '', '', '', 1, '2026-07-28 09:22:11', '2026-07-28 09:36:12'),
(3572403340, 'Si', '66466', 'No', 'No', 1, 1, 20, 'No', '', '', '', 1, '2026-07-30 08:15:51', '2026-07-30 08:15:51'),
(5247695979, 'Si', '66466', 'Si', 'No', 56, 1, 19, 'Si', 'kjhlfghlsdkfjgh', '', '', 1, '2026-07-27 14:06:18', '2026-07-27 14:06:18'),
(6468430428, 'Si', '66466', 'Si', 'No', 51, 1, 17, 'Si', 'dfsgdfg', '', '', 2, '2026-07-27 12:58:32', '2026-07-27 13:01:18'),
(8871525667, 'Si', '66466', 'Si', 'No', 52, 1, 2, 'Si', 'dfsgdfg', '', '', 1, '2026-07-27 10:17:35', '2026-07-27 10:17:35');

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
  `marca` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`id_marcas`, `marca`) VALUES
(1, 'S/Marca'),
(2, 'VIT'),
(3, 'IBM'),
(4, 'HP'),
(5, 'HP COMPAQ'),
(6, 'YBT'),
(7, 'COMPAQ'),
(8, 'SIRAGON'),
(9, 'CLON'),
(10, 'AUSE'),
(11, 'LENOVO'),
(12, 'SAMSUNG'),
(13, 'SUN'),
(14, 'DELL'),
(15, 'AOC'),
(16, 'L1706'),
(17, 'PERFECT SOUND'),
(18, 'HIUNDAY'),
(19, 'GENIUS'),
(20, 'PA'),
(21, 'Q'),
(22, 'BENQ'),
(23, 'AITEG'),
(24, 'EE'),
(25, 'KODE'),
(26, 'MICROSOFT'),
(27, 'KB-0316'),
(28, 'A4TCH'),
(29, 'OMEGA'),
(30, 'SONY'),
(31, 'TECH'),
(32, 'CANYON'),
(33, 'LOGITECH'),
(34, 'GE'),
(35, 'WASH'),
(36, 'OPTICAL MOUSE'),
(37, 'GENERICO'),
(38, 'MEGA'),
(39, 'APSU'),
(40, 'SMART ELECTRONIC'),
(41, 'ZUHIPOINT'),
(42, 'APC'),
(43, 'PHASE ELECTRONICA'),
(44, 'CDP'),
(45, 'TONAL PLUS'),
(46, 'SONI VIEW'),
(47, 'AVTEK'),
(48, 'INTEGRA'),
(49, 'GALAXY'),
(50, 'XIX'),
(51, 'CENTINELA'),
(52, 'POWER LINE'),
(53, 'CARDINAL'),
(54, 'NUSE'),
(55, 'SALICRU'),
(56, 'FORZA'),
(57, 'EMERALD'),
(58, 'S&S'),
(59, 'AXIUS'),
(60, 'STAT BAT'),
(61, 'RPC PLUS'),
(62, 'DELCOP'),
(63, 'CANON'),
(64, 'EPSON'),
(65, 'EXOMFX'),
(66, 'DELUX');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelos`
--

CREATE TABLE `modelos` (
  `id_modelos` int(12) NOT NULL,
  `id_marca` int(12) NOT NULL,
  `modelo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modelos`
--

INSERT INTO `modelos` (`id_modelos`, `id_marca`, `modelo`) VALUES
(1, 1, 'S/Modelo');

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
  `servicio` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_servicios`
--

INSERT INTO `tipo_servicios` (`id_tipo_servicios`, `servicio`) VALUES
(1, 'S/Servicio'),
(2, 'Metro Ethernet'),
(3, 'Fibra ABBA Plus');

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
  ADD KEY `consumibles_ibfk_1` (`id_dispositivo`);

--
-- Indices de la tabla `dependencia`
--
ALTER TABLE `dependencia`
  ADD PRIMARY KEY (`id_dependencia`),
  ADD KEY `estado_dependencia_ibfk_1` (`id_estado`);

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
  ADD CONSTRAINT `consumibles_ibfk_1` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivos` (`id_dispositivo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `dependencia`
--
ALTER TABLE `dependencia`
  ADD CONSTRAINT `estado_dependencia_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estados` (`id_estado`) ON DELETE CASCADE ON UPDATE CASCADE;

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
