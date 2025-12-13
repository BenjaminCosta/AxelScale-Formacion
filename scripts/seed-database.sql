-- Insert Modules
INSERT INTO Module (id, title, slug, `order`, createdAt, updatedAt) VALUES
('mod_1', 'Shopify Ghost Dropshipping', 'shopify-ghost-dropshipping', 1, NOW(), NOW()),
('mod_2', 'Shopify Productos Físicos', 'shopify-productos-fisicos', 2, NOW(), NOW()),
('mod_3', 'Aplicaciones de Reventa', 'aplicaciones-de-reventa', 3, NOW(), NOW());

-- Insert Lessons for Shopify Ghost Dropshipping
INSERT INTO Lesson (id, moduleId, title, content, `order`, createdAt, updatedAt) VALUES
('les_1_1', 'mod_1', 'Introducción al Ghost Dropshipping', 'Contenido de la lección 1 del módulo Ghost Dropshipping. Aprende los fundamentos de este modelo de negocio que me permitió generar ingresos pasivos escalables.', 1, NOW(), NOW()),
('les_1_2', 'mod_1', 'Selección de Productos Digitales', 'Contenido sobre cómo elegir los productos digitales más rentables para tu tienda.', 2, NOW(), NOW()),
('les_1_3', 'mod_1', 'Configuración de Shopify', 'Guía paso a paso para configurar tu tienda Shopify optimizada para productos digitales.', 3, NOW(), NOW()),
('les_1_4', 'mod_1', 'Automatización de Entregas', 'Cómo automatizar completamente la entrega de productos digitales a tus clientes.', 4, NOW(), NOW());

-- Insert Lessons for Shopify Productos Físicos
INSERT INTO Lesson (id, moduleId, title, content, `order`, createdAt, updatedAt) VALUES
('les_2_1', 'mod_2', 'Introducción a Productos Físicos', 'Contenido de la lección 1 del módulo Productos Físicos. Descubre cómo construir una marca sólida con productos físicos.', 1, NOW(), NOW()),
('les_2_2', 'mod_2', 'Encontrar Proveedores Confiables', 'Estrategias probadas para encontrar y negociar con proveedores de calidad.', 2, NOW(), NOW()),
('les_2_3', 'mod_2', 'Gestión de Inventario', 'Sistemas para manejar tu inventario de forma eficiente y escalable.', 3, NOW(), NOW()),
('les_2_4', 'mod_2', 'Logística y Envíos', 'Todo sobre logística, fulfillment y cómo optimizar tus costos de envío.', 4, NOW(), NOW());

-- Insert Lessons for Aplicaciones de Reventa
INSERT INTO Lesson (id, moduleId, title, content, `order`, createdAt, updatedAt) VALUES
('les_3_1', 'mod_3', 'Introducción al Arbitraje', 'Contenido de la lección 1 del módulo Aplicaciones de Reventa. El método perfecto para empezar con bajo riesgo.', 1, NOW(), NOW()),
('les_3_2', 'mod_3', 'Plataformas de Reventa', 'Las mejores aplicaciones y marketplaces para comprar barato y vender caro.', 2, NOW(), NOW()),
('les_3_3', 'mod_3', 'Estrategias de Precios', 'Cómo determinar el precio perfecto para maximizar tus ganancias.', 3, NOW(), NOW()),
('les_3_4', 'mod_3', 'Escalando tu Negocio de Reventa', 'De ventas ocasionales a un negocio de 5 cifras al mes.', 4, NOW(), NOW());
