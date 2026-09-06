-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-07-2026 a las 19:33:50
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

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
-- Estructura de tabla para la tabla `camaras`
--

CREATE TABLE `camaras` (
  `id_camara` bigint(12) NOT NULL,
  `id_dispositivo` bigint(12) NOT NULL,
  `tipo_uso` enum('Seguridad','Videoconferencia') NOT NULL DEFAULT 'Seguridad',
  `resolucion` enum('HD (720p)','Full HD (1080p)','2K (1440p)','4K (2160p)') DEFAULT 'Full HD (1080p)',
  `tipo_formato` enum('Domo','Bala','PTZ','Fisheye','Tubo','N/A') DEFAULT 'N/A',
  `tecnologia_seguridad` enum('IP / PoE','Analogica (AHD/TVI)','WiFi','N/A') DEFAULT 'N/A',
  `apta_exterior` enum('Si','No','N/A') DEFAULT 'N/A',
  `posee_vision_nocturna` enum('Si','No','N/A') DEFAULT 'N/A',
  `conexion_videoconferencia` enum('USB-A','USB-C','Bluetooth','N/A') DEFAULT 'N/A',
  `direccion_ip` varchar(45) DEFAULT NULL,
  `mac_address` varchar(17) DEFAULT NULL,
  `fecha_carga` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categorias` int(12) NOT NULL,
  `categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categorias`, `categoria`) VALUES
(1, 'S/Categoria'),
(2, 'Switches'),
(3, 'Laptop'),
(4, 'Escaner'),
(5, 'Impresora'),
(6, 'VideoBeam'),
(7, 'Camara'),
(8, 'Consumible'),
(9, 'UPS'),
(10, 'Powerships'),
(11, 'Router'),
(12, 'Patch Panel'),
(13, 'Rack'),
(14, 'Organizador de Cables'),
(15, 'Model'),
(16, 'CPU'),
(17, 'Monitor'),
(18, 'Mouses'),
(19, 'Teclado'),
(20, 'CPU');

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
-- Estructura de tabla para la tabla `cornetas`
--

CREATE TABLE `cornetas` (
  `id_corneta` bigint(12) NOT NULL,
  `id_dispositivo` bigint(12) NOT NULL,
  `tipo_conexion` enum('Jack 3.5mm','Bluetooth','Jack 3.5mm + Bluetooth') DEFAULT 'Jack 3.5mm',
  `tipo_alimentacion` enum('USB (5V)','Toma Corriente (110V/220V)','Bateria Recargable') DEFAULT 'USB (5V)',
  `fecha_carga` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cpus`
--

CREATE TABLE `cpus` (
  `id_cpu` bigint(12) NOT NULL,
  `id_dispositivo` bigint(12) NOT NULL,
  `id_procesador` bigint(12) NOT NULL,
  `frecuencia_ram` varchar(100) NOT NULL,
  `ram` int(4) NOT NULL,
  `tipo_ram` enum('DDR3','DDR4','DDR5','DDR2') DEFAULT 'DDR4',
  `slots_ram_ocupados` tinyint(2) DEFAULT 1,
  `slots_ram_totales` tinyint(2) DEFAULT 2,
  `modelo_motherboard` varchar(17) DEFAULT NULL,
  `potencia_fuente_w` varchar(17) DEFAULT NULL,
  `tipo_power` enum('ATX','SFX','TFX') NOT NULL DEFAULT 'ATX',
  `disco_duro` int(6) NOT NULL,
  `tipo_disco` enum('HDD','SSD','M2') NOT NULL,
  `formato_caja` enum('Tower','SFF','Mini_PC','All_in_One') DEFAULT 'Tower',
  `fecha_carga` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cpus`
--

INSERT INTO `cpus` (`id_cpu`, `id_dispositivo`, `id_procesador`, `frecuencia_ram`, `ram`, `tipo_ram`, `slots_ram_ocupados`, `slots_ram_totales`, `modelo_motherboard`, `potencia_fuente_w`, `tipo_power`, `disco_duro`, `tipo_disco`, `formato_caja`, `fecha_carga`, `fecha_modificacion`) VALUES
(4875102546, 3572403340, 4418145116, '', 4, 'DDR3', 2, 4, 'dsfasdfasdf', '550', 'ATX', 500, 'HDD', 'Tower', '2026-07-30 08:15:51', '2026-07-30 08:31:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE `departamento` (
  `id_departamento` int(11) NOT NULL,
  `departamento` varchar(100) NOT NULL,
  `id_piso_depa` int(2) NOT NULL DEFAULT 1,
  `codigoDepa` varchar(50) DEFAULT NULL,
  `activo` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`id_departamento`, `departamento`, `id_piso_depa`, `codigoDepa`, `activo`) VALUES
(1, 'División de Informática', 1, NULL, 1),
(2, 'Planificación', 1, NULL, 1),
(3, 'Cultura', 1, NULL, 1),
(4, 'Deporte', 1, NULL, 1),
(5, 'Prensa', 1, NULL, 1),
(6, 'Gerencia Regional', 1, NULL, 1),
(7, 'Asesoría Legal', 1, NULL, 1),
(8, 'Encadenamiento Productivo', 1, NULL, 1),
(10, 'Servicio y Mantenimiento', 1, NULL, 1),
(11, 'Administración', 1, NULL, 1),
(12, 'Compras', 1, NULL, 1),
(13, 'Bienes Nacionales', 1, NULL, 1),
(14, 'Almacén', 1, NULL, 1),
(15, 'Talento Humano', 1, NULL, 1),
(16, 'Servicio Médico', 1, NULL, 1),
(17, 'Formación Profesional', 1, NULL, 1),
(18, 'Currículo y Didáctico', 1, NULL, 1),
(19, 'Formación Delegado', 1, NULL, 1),
(20, 'Adiestramiento', 1, NULL, 1),
(21, 'PNA', 1, NULL, 1),
(22, 'Liceo INCES Aragua', 1, NULL, 1),
(23, 'Turismo', 1, NULL, 1),
(24, 'Móviles', 1, NULL, 1),
(25, 'Ferroviario', 1, NULL, 1),
(26, 'Penitenciario Luisa Cáceres de Arismendi', 1, NULL, 1),
(27, 'Planificación', 1, NULL, 1),
(29, 'Deporte', 1, NULL, 1),
(30, 'Prensa', 1, NULL, 1),
(31, 'Gerencia Regional', 1, NULL, 1),
(32, 'Asesoría Legal', 1, NULL, 1),
(33, 'Encadenamiento Productivo', 1, NULL, 1),
(34, 'División de Informática', 1, NULL, 1),
(35, 'Servicio y mantenimiento', 1, NULL, 1),
(36, 'Administración', 1, NULL, 1),
(37, 'Compras', 1, NULL, 1),
(38, 'Bienes Nacionales', 1, NULL, 1),
(39, 'Almacén', 1, NULL, 1),
(40, 'Talento humano', 1, NULL, 1),
(41, 'Servicio Médico', 1, NULL, 1),
(43, 'Currículo y didáctico', 1, NULL, 1),
(44, 'Formación Delegada', 1, NULL, 1),
(45, 'Adiestramiento', 1, NULL, 1),
(46, 'ANP', 1, NULL, 1),
(47, 'Liceo INCES Aragua', 1, NULL, 1),
(49, 'Móviles', 1, NULL, 1),
(51, 'Penitenciario Luisa Cáceres de Arismendi', 1, NULL, 0);

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
  `id_categorias` int(12) NOT NULL DEFAULT 1,
  `posee_serial` enum('Si','No') NOT NULL,
  `serial` varchar(100) NOT NULL DEFAULT 'S/Serial',
  `id_status` int(2) NOT NULL,
  `fecha_carga` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `dispositivos`
--

INSERT INTO `dispositivos` (`id_dispositivo`, `posee_codigo`, `cd_dispositivo`, `posee_marca`, `posee_modelo`, `id_marca`, `id_modelo`, `id_categorias`, `posee_serial`, `serial`, `id_status`, `fecha_carga`, `fecha_modificacion`) VALUES
(2517192072, 'Si', '66466', 'No', 'No', 1, 1, 18, 'No', '', 1, '2026-07-28 09:22:11', '2026-07-28 09:36:12'),
(3572403340, 'Si', '66466', 'No', 'No', 1, 1, 20, 'No', '', 1, '2026-07-30 08:15:51', '2026-07-30 08:15:51'),
(5247695979, 'Si', '66466', 'Si', 'No', 56, 1, 19, 'Si', 'kjhlfghlsdkfjgh', 1, '2026-07-27 14:06:18', '2026-07-27 14:06:18'),
(6468430428, 'Si', '66466', 'Si', 'No', 51, 1, 17, 'Si', 'dfsgdfg', 2, '2026-07-27 12:58:32', '2026-07-27 13:01:18'),
(8871525667, 'Si', '66466', 'Si', 'No', 52, 1, 2, 'Si', 'dfsgdfg', 1, '2026-07-27 10:17:35', '2026-07-27 10:17:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `escaners`
--

CREATE TABLE `escaners` (
  `id_escaner` bigint(12) NOT NULL,
  `id_dispositivo` bigint(12) NOT NULL,
  `tamano_maximo` enum('Carta / A4','Oficio / Legal','A3') DEFAULT 'Oficio / Legal',
  `resolucion_dpi` varchar(20) DEFAULT '600 dpi',
  `fecha_carga` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Estructura de tabla para la tabla `es_trabajo`
--

CREATE TABLE `es_trabajo` (
  `id_es_trabajo` bigint(12) NOT NULL,
  `id_usuario` int(12) NOT NULL,
  `id_hardware` bigint(12) NOT NULL,
  `id_software` bigint(12) NOT NULL,
  `id_redes` bigint(12) NOT NULL,
  `fecha_vinculo` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hardwares`
--

CREATE TABLE `hardwares` (
  `id_hardware` bigint(12) NOT NULL,
  `id_cpu` bigint(12) NOT NULL,
  `id_monitor` bigint(12) NOT NULL,
  `id_mouse` bigint(12) NOT NULL,
  `id_teclado` bigint(12) NOT NULL,
  `id_regulador` bigint(12) NOT NULL,
  `posee_corneta` enum('Si','No') NOT NULL,
  `cd_corneta` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `impresoras`
--

CREATE TABLE `impresoras` (
  `id_impresora` bigint(12) NOT NULL,
  `id_dispositivo` bigint(12) NOT NULL,
  `zona_impresora` varchar(150) DEFAULT NULL,
  `tipo_conexion` enum('Red','Local') NOT NULL,
  `tipo_consumible` enum('Toner','Tinta') NOT NULL,
  `posee_scanner_adf` enum('Si','No') NOT NULL,
  `fecha_carga` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Estructura de tabla para la tabla `laptops`
--

CREATE TABLE `laptops` (
  `id_laptop` bigint(12) NOT NULL,
  `id_dispositivo` bigint(12) NOT NULL,
  `id_software` bigint(12) NOT NULL,
  `id_redes` bigint(12) NOT NULL,
  `id_usuario` int(12) NOT NULL,
  `tipo_ram` enum('DDR3','DDR4','DDR5','DDR2') DEFAULT 'DDR3',
  `ram` int(6) NOT NULL,
  `tipo_disco` enum('M2','SSD','HDD') DEFAULT 'M2',
  `disco_duro` int(6) NOT NULL,
  `posee_webcam` enum('Si','No') DEFAULT 'Si',
  `posee_cargador` enum('Si','No') DEFAULT 'Si',
  `fecha_carga` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
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
-- Estructura de tabla para la tabla `monitores`
--

CREATE TABLE `monitores` (
  `id_monitor` bigint(12) NOT NULL,
  `id_dispositivo` bigint(12) NOT NULL,
  `pulgadas` varchar(10) NOT NULL DEFAULT '19"',
  `resolucion` enum('1366x768','1920x1080','2560x1440','3840x2160','Otro') DEFAULT '1920x1080',
  `tipo_panel` enum('LCD','LED','OLED','CTR','Desconocido') DEFAULT 'Desconocido',
  `tipo_monitor` enum('HDMI','VGA','TODOS') NOT NULL,
  `fecha_carga` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `monitores`
--

INSERT INTO `monitores` (`id_monitor`, `id_dispositivo`, `pulgadas`, `resolucion`, `tipo_panel`, `tipo_monitor`, `fecha_carga`, `fecha_modificacion`) VALUES
(2637332569, 6468430428, '15', '1920x1080', 'LCD', 'VGA', '2026-07-27 12:58:32', '2026-07-27 13:00:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mouses`
--

CREATE TABLE `mouses` (
  `id_mouse` bigint(20) NOT NULL,
  `id_dispositivo` bigint(12) NOT NULL,
  `tipo_mouse` enum('INALAMBRICO','ALAMBRICO') NOT NULL,
  `tipo_conexion` enum('USB-A','USB-C','PS/2','Receptor USB 2.4GHz','Bluetooth','Dual (2.4GHz + Bluetooth)') NOT NULL DEFAULT 'USB-A',
  `cantidad_botones` tinyint(2) DEFAULT 3,
  `es_ergonomico` enum('Si','No') DEFAULT 'No',
  `tecnologia_sensor` enum('Optico','Laser') DEFAULT 'Optico',
  `tipo_alimentacion` enum('N/A (Cable)','Bateria AA','Baterias AAA','Bateria Recargable USB') DEFAULT 'N/A (Cable)',
  `fecha_carga` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mouses`
--

INSERT INTO `mouses` (`id_mouse`, `id_dispositivo`, `tipo_mouse`, `tipo_conexion`, `cantidad_botones`, `es_ergonomico`, `tecnologia_sensor`, `tipo_alimentacion`, `fecha_carga`, `fecha_modificacion`) VALUES
(6514889422, 2517192072, 'ALAMBRICO', 'Bluetooth', 3, 'Si', 'Optico', 'N/A (Cable)', '2026-07-28 09:22:11', '2026-07-28 09:37:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patchpanel`
--

CREATE TABLE `patchpanel` (
  `id_patchpanel` bigint(12) NOT NULL,
  `id_dispositivo` bigint(12) NOT NULL,
  `id_rack` bigint(12) NOT NULL,
  `id_tipo_servicio` int(11) NOT NULL,
  `codigo_patchpanel` varchar(30) DEFAULT NULL,
  `npuertos` int(11) NOT NULL,
  `categoria_cable` enum('Cat 5e','Cat 6','Cat 6A','Cat 7','Fibra Optica MM','Fibra Optica SM') DEFAULT 'Cat 6',
  `tipo_conector` enum('RJ45','LC','SC','ST','Keystone Vacio') DEFAULT 'RJ45',
  `tipo_blindaje` enum('UTP','FTP/STP') DEFAULT 'UTP',
  `addpuertos` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `fecha_carga` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Estructura de tabla para la tabla `procesadores`
--

CREATE TABLE `procesadores` (
  `id_procesador` bigint(12) NOT NULL,
  `marca_procesador` enum('Intel','AMD') NOT NULL DEFAULT 'Intel',
  `familia_procesador` enum('Core','Pentium','Celeron','Ryzen') NOT NULL DEFAULT 'Core',
  `modelo_procesador` varchar(3) NOT NULL,
  `velocidad_base` varchar(20) DEFAULT '2.5',
  `nucleos` int(3) DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `procesadores`
--

INSERT INTO `procesadores` (`id_procesador`, `marca_procesador`, `familia_procesador`, `modelo_procesador`, `velocidad_base`, `nucleos`) VALUES
(4418145116, 'Intel', 'Celeron', 'i3', '2.5', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `racks`
--

CREATE TABLE `racks` (
  `id_rack` bigint(12) NOT NULL,
  `id_departamento` int(2) NOT NULL,
  `codigo_rack` varchar(30) DEFAULT NULL,
  `tipo_rack` enum('Gabinete Cerrado','Abierto 2 Postes','Abierto 4 Postes','Pared / Abatible') DEFAULT 'Gabinete Cerrado',
  `tipo_puerta` enum('Vidrio Templado','Malla Perforada','Sólida de Metal','N/A') DEFAULT 'N/A',
  `organizadores_cables` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Estructura de tabla para la tabla `reguladores`
--

CREATE TABLE `reguladores` (
  `id_regulador` bigint(12) NOT NULL,
  `id_dispositivo` bigint(12) NOT NULL,
  `capacidad_va` int(6) NOT NULL DEFAULT 1000,
  `potencia_watts` int(6) DEFAULT NULL,
  `voltaje_operacion` enum('110V / 120V','220V / 240V','Bi-Voltaje') DEFAULT '110V / 120V',
  `cantidad_tomas` int(2) NOT NULL DEFAULT 8,
  `fecha_carga` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
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
-- Estructura de tabla para la tabla `router`
--

CREATE TABLE `router` (
  `id_router` bigint(12) NOT NULL,
  `id_dispositivo` bigint(12) NOT NULL,
  `id_tipo_servicio` int(11) NOT NULL,
  `npuertos` int(11) NOT NULL,
  `npuertos_wan` int(2) NOT NULL DEFAULT 1,
  `npuertos_lan` int(2) NOT NULL DEFAULT 4,
  `npuertos_consola` int(11) NOT NULL DEFAULT 0,
  `npuertos_sfp` int(2) DEFAULT 0,
  `velocidad_puertos` enum('Fast Ethernet (10/100)','Gigabit (10/100/1000)','10 Gigabit SFP+') DEFAULT 'Gigabit (10/100/1000)',
  `velocidad_sfp` enum('1G','10G','25G','N/A') NOT NULL DEFAULT '1G',
  `addpuertos` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `soporta_wifi` enum('Si','No') DEFAULT 'No',
  `estandar_wifi` enum('Wi-Fi 4 (n)','Wi-Fi 5 (ac)','Wi-Fi 6 (ax)','N/A') DEFAULT 'N/A',
  `soporta_vpn` enum('Si','No') DEFAULT 'Si',
  `es_firewall` enum('Si','No') DEFAULT 'No',
  `direccion_mac` varchar(17) DEFAULT NULL,
  `fecha_carga` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Estructura de tabla para la tabla `switches`
--

CREATE TABLE `switches` (
  `id_switches` bigint(12) NOT NULL,
  `id_dispositivo` bigint(12) NOT NULL,
  `id_tipo_servicio` int(11) NOT NULL,
  `capa_gestion` enum('N/A','Capa2','Capa3') DEFAULT 'Capa2',
  `npuertos` int(11) NOT NULL,
  `velocidad_puertos` enum('10/100','10/100/1000','2.5G') DEFAULT '10/100/1000',
  `puertos_sfp` int(2) DEFAULT 0,
  `velocidad_sfp` enum('1G','10G','25G','N/A') DEFAULT 'N/A',
  `addpuertos` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `direccion_ip` varchar(45) DEFAULT NULL,
  `direccion_mac` varchar(17) DEFAULT NULL,
  `fecha_carga` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `switches`
--

INSERT INTO `switches` (`id_switches`, `id_dispositivo`, `id_tipo_servicio`, `capa_gestion`, `npuertos`, `velocidad_puertos`, `puertos_sfp`, `velocidad_sfp`, `addpuertos`, `direccion_ip`, `direccion_mac`, `fecha_carga`, `fecha_modificacion`) VALUES
(228020852, 8871525667, 3, 'Capa2', 24, '10/100', 2, '1G', 'RJ45', 'AA:AA:AA:21:34:49', 'FF:FD:F5:42:65:84', '2026-07-27 10:17:35', '2026-07-27 10:47:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teclados`
--

CREATE TABLE `teclados` (
  `id_teclado` bigint(12) NOT NULL,
  `id_dispositivo` bigint(12) NOT NULL,
  `tipo_teclado` enum('INALAMBRICA','ALAMBRICO') NOT NULL,
  `tipo_conexion` enum('USB','PS/2') NOT NULL,
  `distribucion_idioma` enum('Español ESP','Ingles US') DEFAULT 'Español ESP',
  `posee_teclado_numerico` enum('Si','No') DEFAULT 'Si',
  `tipo_mecanismo` enum('Membrana','Mecanico') DEFAULT 'Membrana',
  `fecha_carga` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `teclados`
--

INSERT INTO `teclados` (`id_teclado`, `id_dispositivo`, `tipo_teclado`, `tipo_conexion`, `distribucion_idioma`, `posee_teclado_numerico`, `tipo_mecanismo`, `fecha_carga`, `fecha_modificacion`) VALUES
(9269221816, 5247695979, 'ALAMBRICO', 'USB', 'Ingles US', 'Si', 'Mecanico', '2026-07-27 14:06:18', '2026-07-27 14:08:37');

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `videobeam`
--

CREATE TABLE `videobeam` (
  `id_videobeam` bigint(12) NOT NULL,
  `id_dispositivo` bigint(12) NOT NULL,
  `resolucion` enum('SVGA(800x600)','HD(1280x720)','Full HD(1920x1080)','4K') DEFAULT 'Full HD(1920x1080)',
  `posee_control` enum('Si','No') DEFAULT 'No',
  `cable_video_tipo` enum('HDMI','VGA','Ninguno') DEFAULT 'Ninguno',
  `posee_cable_poder` enum('Si','No') DEFAULT 'Si',
  `posee_maletin` enum('Si','No') DEFAULT 'No',
  `fecha_carga` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Indices de la tabla `camaras`
--
ALTER TABLE `camaras`
  ADD PRIMARY KEY (`id_camara`),
  ADD KEY `camaras_ibfk_1` (`id_dispositivo`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categorias`);

--
-- Indices de la tabla `consumibles`
--
ALTER TABLE `consumibles`
  ADD PRIMARY KEY (`id_consumible`),
  ADD KEY `consumibles_ibfk_1` (`id_dispositivo`);

--
-- Indices de la tabla `cornetas`
--
ALTER TABLE `cornetas`
  ADD PRIMARY KEY (`id_corneta`),
  ADD KEY `cornetas_ibfk_1` (`id_dispositivo`);

--
-- Indices de la tabla `cpus`
--
ALTER TABLE `cpus`
  ADD PRIMARY KEY (`id_cpu`),
  ADD KEY `cpus_ibfk_1` (`id_dispositivo`),
  ADD KEY `cpus_ibfk_2` (`id_procesador`);

--
-- Indices de la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`id_departamento`),
  ADD KEY `piso_depa_ibfk_1` (`id_piso_depa`);

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
  ADD KEY `dispositivos_ibfk_3` (`id_categorias`),
  ADD KEY `dispositivos_ibfk_4` (`id_marca`);

--
-- Indices de la tabla `escaners`
--
ALTER TABLE `escaners`
  ADD PRIMARY KEY (`id_escaner`),
  ADD KEY `escaners_ibfk_1` (`id_dispositivo`);

--
-- Indices de la tabla `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `es_trabajo`
--
ALTER TABLE `es_trabajo`
  ADD PRIMARY KEY (`id_es_trabajo`),
  ADD KEY `es_trabajo_ibfk_1` (`id_usuario`),
  ADD KEY `es_trabajo_ibfk_2` (`id_hardware`),
  ADD KEY `es_trabajo_ibfk_3` (`id_software`),
  ADD KEY `es_trabajo_ibfk_4` (`id_redes`);

--
-- Indices de la tabla `hardwares`
--
ALTER TABLE `hardwares`
  ADD PRIMARY KEY (`id_hardware`),
  ADD KEY `hardwares_ibfk_1` (`id_cpu`),
  ADD KEY `hardwares_ibfk_2` (`id_monitor`),
  ADD KEY `hardwares_ibfk_3` (`id_mouse`),
  ADD KEY `hardwares_ibfk_4` (`id_teclado`),
  ADD KEY `hardwares_ibfk_5` (`id_regulador`);

--
-- Indices de la tabla `impresoras`
--
ALTER TABLE `impresoras`
  ADD PRIMARY KEY (`id_impresora`),
  ADD KEY `impresoras_ibfk_1` (`id_dispositivo`);

--
-- Indices de la tabla `interno`
--
ALTER TABLE `interno`
  ADD PRIMARY KEY (`id_interno`),
  ADD KEY `interno_usuario_ibfk_1` (`id_usuario_cedula`),
  ADD KEY `interno_rol_ibfk_2` (`id_rol_interno`);

--
-- Indices de la tabla `laptops`
--
ALTER TABLE `laptops`
  ADD PRIMARY KEY (`id_laptop`),
  ADD KEY `laptops_ibfk_1` (`id_dispositivo`),
  ADD KEY `laptops_ibfk_2` (`id_software`),
  ADD KEY `laptops_ibfk_3` (`id_usuario`);

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
-- Indices de la tabla `monitores`
--
ALTER TABLE `monitores`
  ADD PRIMARY KEY (`id_monitor`),
  ADD KEY `monitores_ibfk_1` (`id_dispositivo`);

--
-- Indices de la tabla `mouses`
--
ALTER TABLE `mouses`
  ADD PRIMARY KEY (`id_mouse`),
  ADD KEY `mouses_ibfk_1` (`id_dispositivo`);

--
-- Indices de la tabla `patchpanel`
--
ALTER TABLE `patchpanel`
  ADD PRIMARY KEY (`id_patchpanel`),
  ADD KEY `patchpanel_ibfk_1` (`id_tipo_servicio`),
  ADD KEY `racks_ibfk_4` (`id_rack`);

--
-- Indices de la tabla `pisos`
--
ALTER TABLE `pisos`
  ADD PRIMARY KEY (`id_piso`),
  ADD KEY `pisos_dependencia_ibfk_1` (`id_piso_dependencia`);

--
-- Indices de la tabla `procesadores`
--
ALTER TABLE `procesadores`
  ADD PRIMARY KEY (`id_procesador`);

--
-- Indices de la tabla `racks`
--
ALTER TABLE `racks`
  ADD PRIMARY KEY (`id_rack`),
  ADD KEY `racks_ibfk_1` (`id_departamento`);

--
-- Indices de la tabla `redes`
--
ALTER TABLE `redes`
  ADD PRIMARY KEY (`id_red`);

--
-- Indices de la tabla `reguladores`
--
ALTER TABLE `reguladores`
  ADD PRIMARY KEY (`id_regulador`),
  ADD KEY `reguladores_ibfk_1` (`id_dispositivo`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `router`
--
ALTER TABLE `router`
  ADD PRIMARY KEY (`id_router`),
  ADD KEY `router_ibfk_1` (`id_tipo_servicio`);

--
-- Indices de la tabla `softwares`
--
ALTER TABLE `softwares`
  ADD PRIMARY KEY (`id_software`);

--
-- Indices de la tabla `switches`
--
ALTER TABLE `switches`
  ADD PRIMARY KEY (`id_switches`),
  ADD KEY `switches_ibfk_1` (`id_tipo_servicio`),
  ADD KEY `switches_ibfk_2` (`id_dispositivo`);

--
-- Indices de la tabla `teclados`
--
ALTER TABLE `teclados`
  ADD PRIMARY KEY (`id_teclado`),
  ADD KEY `teclados_ibfk_1` (`id_dispositivo`);

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
-- Indices de la tabla `videobeam`
--
ALTER TABLE `videobeam`
  ADD PRIMARY KEY (`id_videobeam`),
  ADD KEY `videobeam_ibfk_1` (`id_dispositivo`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `auditoria_sistema`
--
ALTER TABLE `auditoria_sistema`
  ADD CONSTRAINT `fk_auditoria_usuario` FOREIGN KEY (`id_interno_usuario`) REFERENCES `interno` (`id_interno`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `camaras`
--
ALTER TABLE `camaras`
  ADD CONSTRAINT `camaras_ibfk_1` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivos` (`id_dispositivo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `consumibles`
--
ALTER TABLE `consumibles`
  ADD CONSTRAINT `consumibles_ibfk_1` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivos` (`id_dispositivo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cornetas`
--
ALTER TABLE `cornetas`
  ADD CONSTRAINT `cornetas_ibfk_1` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivos` (`id_dispositivo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cpus`
--
ALTER TABLE `cpus`
  ADD CONSTRAINT `cpus_ibfk_1` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivos` (`id_dispositivo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cpus_ibfk_2` FOREIGN KEY (`id_procesador`) REFERENCES `procesadores` (`id_procesador`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD CONSTRAINT `piso_depa_ibfk_1` FOREIGN KEY (`id_piso_depa`) REFERENCES `pisos` (`id_piso`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `dispositivos_ibfk_3` FOREIGN KEY (`id_categorias`) REFERENCES `categorias` (`id_categorias`) ON UPDATE CASCADE,
  ADD CONSTRAINT `dispositivos_ibfk_4` FOREIGN KEY (`id_marca`) REFERENCES `marcas` (`id_marcas`);

--
-- Filtros para la tabla `escaners`
--
ALTER TABLE `escaners`
  ADD CONSTRAINT `escaners_ibfk_1` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivos` (`id_dispositivo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `es_trabajo`
--
ALTER TABLE `es_trabajo`
  ADD CONSTRAINT `es_trabajo_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`cedula`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `es_trabajo_ibfk_2` FOREIGN KEY (`id_hardware`) REFERENCES `hardwares` (`id_hardware`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `es_trabajo_ibfk_3` FOREIGN KEY (`id_software`) REFERENCES `softwares` (`id_software`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `es_trabajo_ibfk_4` FOREIGN KEY (`id_redes`) REFERENCES `redes` (`id_red`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `hardwares`
--
ALTER TABLE `hardwares`
  ADD CONSTRAINT `hardwares_ibfk_1` FOREIGN KEY (`id_cpu`) REFERENCES `cpus` (`id_cpu`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hardwares_ibfk_2` FOREIGN KEY (`id_monitor`) REFERENCES `monitores` (`id_monitor`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hardwares_ibfk_3` FOREIGN KEY (`id_mouse`) REFERENCES `mouses` (`id_mouse`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hardwares_ibfk_4` FOREIGN KEY (`id_teclado`) REFERENCES `teclados` (`id_teclado`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hardwares_ibfk_5` FOREIGN KEY (`id_regulador`) REFERENCES `reguladores` (`id_regulador`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `impresoras`
--
ALTER TABLE `impresoras`
  ADD CONSTRAINT `impresoras_ibfk_1` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivos` (`id_dispositivo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `interno`
--
ALTER TABLE `interno`
  ADD CONSTRAINT `interno_rol_ibfk_2` FOREIGN KEY (`id_rol_interno`) REFERENCES `rol` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `interno_usuario_ibfk_1` FOREIGN KEY (`id_usuario_cedula`) REFERENCES `usuarios` (`cedula`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `laptops`
--
ALTER TABLE `laptops`
  ADD CONSTRAINT `laptops_ibfk_1` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivos` (`id_dispositivo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `laptops_ibfk_2` FOREIGN KEY (`id_software`) REFERENCES `softwares` (`id_software`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `laptops_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`cedula`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `modelos`
--
ALTER TABLE `modelos`
  ADD CONSTRAINT `modelos_ibfk_1` FOREIGN KEY (`id_marca`) REFERENCES `marcas` (`id_marcas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `monitores`
--
ALTER TABLE `monitores`
  ADD CONSTRAINT `monitores_ibfk_1` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivos` (`id_dispositivo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mouses`
--
ALTER TABLE `mouses`
  ADD CONSTRAINT `mouses_ibfk_1` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivos` (`id_dispositivo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `patchpanel`
--
ALTER TABLE `patchpanel`
  ADD CONSTRAINT `patchpanel_ibfk_1` FOREIGN KEY (`id_tipo_servicio`) REFERENCES `tipo_servicios` (`id_tipo_servicios`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `racks_ibfk_4` FOREIGN KEY (`id_rack`) REFERENCES `racks` (`id_rack`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pisos`
--
ALTER TABLE `pisos`
  ADD CONSTRAINT `pisos_dependencia_ibfk_1` FOREIGN KEY (`id_piso_dependencia`) REFERENCES `dependencia` (`id_dependencia`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `racks`
--
ALTER TABLE `racks`
  ADD CONSTRAINT `racks_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reguladores`
--
ALTER TABLE `reguladores`
  ADD CONSTRAINT `reguladores_ibfk_1` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivos` (`id_dispositivo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `router`
--
ALTER TABLE `router`
  ADD CONSTRAINT `router_ibfk_1` FOREIGN KEY (`id_tipo_servicio`) REFERENCES `tipo_servicios` (`id_tipo_servicios`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `switches`
--
ALTER TABLE `switches`
  ADD CONSTRAINT `switches_ibfk_1` FOREIGN KEY (`id_tipo_servicio`) REFERENCES `tipo_servicios` (`id_tipo_servicios`),
  ADD CONSTRAINT `switches_ibfk_2` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivos` (`id_dispositivo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `teclados`
--
ALTER TABLE `teclados`
  ADD CONSTRAINT `teclados_ibfk_1` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivos` (`id_dispositivo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `videobeam`
--
ALTER TABLE `videobeam`
  ADD CONSTRAINT `videobeam_ibfk_1` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivos` (`id_dispositivo`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
