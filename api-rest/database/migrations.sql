CREATE DATABASE libreria_colegio;
CREATE TABLE `productos` (
  `id` INT UNSIGNED NOT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `codigo_barras` varchar(50) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `categoria_id` int UNSIGNED DEFAULT NULL,
  `gramaje` varchar(50) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `descuento` float NOT NULL DEFAULT '0',
  `estado` varchar(255) DEFAULT NULL,
  `rango_edad` int DEFAULT NULL,
  `alicuota_iva_id` int DEFAULT 1,
  `minimo_compra` int DEFAULT NULL,
  `marca_id` int UNSIGNED DEFAULT NULL,
  `video` varchar(512) DEFAULT NULL,
  `en_tv` tinyint(1) NOT NULL DEFAULT '0',
  `portada` int DEFAULT NULL,
  `borrado` datetime DEFAULT NULL,
  `fecha_alta` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `productos`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

CREATE TABLE `alicuota_iva` (
  `id` INT UNSIGNED NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `value` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `alicuota_iva`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `alicuota_iva`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

CREATE TABLE `categorias` (
  `id` int UNSIGNED NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `banner` varchar(100) NOT NULL DEFAULT '',
  `fecha_alta` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `borrado` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `categorias`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

CREATE TABLE `r_categorias` (
  `padre_id` int NOT NULL,
  `hijo_id` int NOT NULL
) ENGINE=InnoDB;

CREATE TABLE `variaciones` (
  `id` int UNSIGNED NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `borrado` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `variaciones`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `variaciones`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

CREATE TABLE `variacion_valores` (
  `id` int UNSIGNED NOT NULL,
  `variacion_id` int DEFAULT NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `borrado` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `variacion_valores`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `variacion_valores`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

CREATE TABLE `r_producto_variacion` (
  `producto_id` int UNSIGNED NOT NULL,
  `variacion_valor_id` int UNSIGNED NOT NULL,
  `imagen` varchar(100) NOT NULL DEFAULT ''
) ENGINE=InnoDB;

CREATE TABLE `marcas` (
  `id` int UNSIGNED NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `banner` varchar(5) NOT NULL DEFAULT '',
  `fecha_alta` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `borrado` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `marcas`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `marcas`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

CREATE TABLE `usuarios` (
  `id` int UNSIGNED NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `telefono` varchar(16) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `provincia_id` tinyint NOT NULL,
  `ciudad_id` mediumint NOT NULL,
  `verficado` tinyint(1) DEFAULT '0',
  `fecha_alta` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `borrado` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `last_ip` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `usuarios`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

CREATE TABLE `clientes` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `tango_id` varchar(100) DEFAULT NULL,
  `tipo_cliente` varchar(150) DEFAULT 'mayorista',
  `vendedor_id` int DEFAULT NULL,
  `fecha_alta` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `observaciones` text NOT NULL,
  `borrado` datetime DEFAULT NULL,
  `permitir_sin_minimo` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `clientes`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

CREATE TABLE `vendedores` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `tango_id` varchar(100) DEFAULT NULL,
  `codigo` varchar(100) DEFAULT NULL,
  `borrado` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `vendedores`
  ADD PRIMARY KEY (`id`);


CREATE TABLE `carritos` (
  `id` int NOT NULL,
  `cliente_id` int NOT NULL,
  `vendedor_id` int DEFAULT NULL,
  `detalle` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_ultima_actualizacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `vendedores`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `carritos`
  ADD PRIMARY KEY (`id`);

CREATE TABLE `pedidos` (
  `id` int UNSIGNED NOT NULL,
  `fecha` datetime NOT NULL,
  `estado` varchar(255) NOT NULL,
  `cliente_id` int UNSIGNED NOT NULL,
  `detalle` longtext,
  `direccion_envio` varchar(255) DEFAULT NULL,
  `total` double DEFAULT NULL,
  `provincia_id` int NOT NULL,
  `ciudad_id` int NOT NULL,
  `vendedor_id` int DEFAULT NULL,
  `observaciones` text,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`);

ALTER TABLE productos
    ADD CONSTRAINT productos_FK_ali
    FOREIGN KEY (alicuota_iva_id)
    REFERENCES alicuota_iva(id);

ALTER TABLE r_producto_variacion
    ADD CONSTRAINT r_FK_producto
    FOREIGN KEY (producto_id)
    REFERENCES productos(id);
    
ALTER TABLE r_producto_variacion
    ADD CONSTRAINT r_FK_variacion
    FOREIGN KEY (variacion_valor_id)
    REFERENCES variacion_valores(id);

  ALTER TABLE variacion_valores
    ADD CONSTRAINT r_FK_varVal
    FOREIGN KEY (variacion_id)
    REFERENCES variaciones(id);
    
ALTER TABLE vendedores
    ADD CONSTRAINT vendedor_FK_user
    FOREIGN KEY (user_id)
    REFERENCES usuarios(id);

ALTER TABLE clientes
    ADD CONSTRAINT cliente_FK_user
    FOREIGN KEY (user_id)
    REFERENCES usuarios(id);

ALTER TABLE r_categorias
    ADD CONSTRAINT cat_FK_padre
    FOREIGN KEY (padre_id)
    REFERENCES categorias(id);
    
 ALTER TABLE r_categorias
    ADD CONSTRAINT cat_FK_hijo
    FOREIGN KEY (hijo_id)
    REFERENCES categorias(id);