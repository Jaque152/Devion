export interface ProductPlan {
  id: string;
  priceMXN: number;
  taxIncluded: boolean;
  currency: string;
  imageUrl: string;

  es: {
    name: string;
    description: string;
    features: string[];
  };

  en: {
    name: string;
    description: string;
    features: string[];
  };
}

export const webPlans: ProductPlan[] = [
  {
    id: 'plan-web-restaurantes',
    priceMXN: 19390.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Plan Web para Restaurantes',
      description:
        'Carta digital, gestión de reservas, conexión con WhatsApp para recibir pedidos, ubicación mediante Google Maps y galería fotográfica.',
      features: [
        'Carta digital interactiva',
        'Gestión de reservas en línea',
        'Conexión con WhatsApp para recibir pedidos',
        'Ubicación integrada con Google Maps',
        'Galería visual de fotografías'
      ]
    },
    en: {
      name: 'Website Plan for Restaurants',
      description:
        'Digital menu, online booking management, WhatsApp ordering connection, Google Maps location integration, and a visual gallery.',
      features: [
        'Interactive digital menu',
        'Online reservation management',
        'WhatsApp connection for receiving orders',
        'Google Maps location integration',
        'Visual image gallery'
      ]
    }
  },

  {
    id: 'plan-marca-sitio-web-profesional',
    priceMXN: 24530.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Plan Marca + Sitio Web Profesional',
      description:
        'Creación de logotipo profesional con 3 propuestas, definición de colores corporativos y tipografía sugerida, sitio web de hasta 3 secciones, adaptación responsive, formulario de contacto y conexión con redes sociales.',
      features: [
        'Creación de logotipo profesional con 3 propuestas',
        'Definición de paleta corporativa y tipografía sugerida',
        'Sitio web con hasta 3 secciones',
        'Diseño adaptable y optimizado para dispositivos móviles',
        'Formulario de contacto y conexión con redes sociales'
      ]
    },
    en: {
      name: 'Branding + Professional Website Plan',
      description:
        'Professional logo creation with 3 concepts, corporate color definition and suggested typography, a website with up to 3 sections, responsive design, contact form, and social media connection.',
      features: [
        'Professional logo creation with 3 proposals',
        'Corporate color palette and suggested typography',
        'Website with up to 3 sections',
        'Responsive and mobile-friendly design',
        'Contact form and social media connection'
      ]
    }
  },

  {
    id: 'plan-web-marketing-digital',
    priceMXN: 21940.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Plan Web + Marketing Digital',
      description:
        'Desarrollo de sitio web profesional, puesta a punto de Google Ads y Facebook Ads, implementación del píxel de seguimiento y configuración de Google Analytics.',
      features: [
        'Sitio web con acabado profesional',
        'Puesta a punto de campañas en Google Ads',
        'Configuración inicial de campañas en Facebook Ads',
        'Implementación del píxel para seguimiento',
        'Configuración y vinculación de Google Analytics'
      ]
    },
    en: {
      name: 'Website + Digital Marketing Plan',
      description:
        'Professional website development with Google Ads and Facebook Ads setup, tracking pixel implementation, and Google Analytics configuration.',
      features: [
        'Professional website development',
        'Google Ads campaign setup',
        'Facebook Ads campaign setup',
        'Tracking pixel implementation',
        'Google Analytics configuration'
      ]
    }
  },

  {
    id: 'plan-landing-page-emprendedor',
    priceMXN: 4250.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Plan Landing Page Emprendedor',
      description:
        'Creación de landing page de una sola página, formulario de contacto, conexión con hasta 2 redes sociales y entrega digital. Servicio realizado completamente en línea.',
      features: [
        'Creación de landing page de 1 página',
        'Formulario para recepción de contactos',
        'Conexión con un máximo de 2 redes sociales',
        'Entrega del proyecto en formato digital',
        'Servicio realizado completamente en línea'
      ]
    },
    en: {
      name: 'Entrepreneur Landing Page Plan',
      description:
        'Single-page landing page creation, contact form, connection with up to 2 social networks, and digital delivery. Service provided entirely online.',
      features: [
        'Single-page landing page creation',
        'Contact form',
        'Connection with up to 2 social networks',
        'Digital project delivery',
        'Service provided entirely online'
      ]
    }
  },

  {
    id: 'plan-web-empresarial',
    priceMXN: 17320.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Plan Web Empresarial',
      description:
        'Sitio de hasta 5 páginas con diseño UX/UI profesional, formularios avanzados, configuración SEO inicial y mejoras de rendimiento y velocidad.',
      features: [
        'Hasta 5 páginas dentro del sitio',
        'Experiencia UX/UI profesional y personalizada',
        'Formularios avanzados para captación de contactos',
        'Ajustes iniciales de posicionamiento SEO',
        'Mejoras enfocadas en la velocidad de carga'
      ]
    },
    en: {
      name: 'Corporate Website Plan',
      description:
        'Website with up to 5 pages, professional UX/UI design, advanced forms, initial SEO setup, and performance and speed improvements.',
      features: [
        'Up to 5 internal website pages',
        'Professional custom UX/UI experience',
        'Advanced lead capture forms',
        'Initial SEO adjustments',
        'Page loading performance improvements'
      ]
    }
  },

  {
    id: 'plan-web-seo-inicial',
    priceMXN: 16520.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Plan Web + SEO Inicial',
      description:
        'Sitio web de hasta 2 páginas, análisis de palabras clave, vinculación con Google Search Console, ajustes técnicos SEO iniciales y mejora del contenido.',
      features: [
        'Sitio web con hasta 2 páginas',
        'Análisis de palabras clave relevantes',
        'Vinculación y configuración de Google Search Console',
        'Ajustes técnicos SEO de arranque',
        'Mejora y optimización del contenido'
      ]
    },
    en: {
      name: 'Website + Initial SEO Plan',
      description:
        'Website with up to 2 pages, keyword analysis, Google Search Console configuration, initial technical SEO adjustments, and content optimization.',
      features: [
        'Website with up to 2 pages',
        'Relevant keyword analysis',
        'Google Search Console configuration',
        'Initial technical SEO adjustments',
        'Content enhancement and optimization'
      ]
    }
  },

  {
    id: 'plan-sitio-web-profesional',
    priceMXN: 11370.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Plan Sitio Web Profesional',
      description:
        'Sitio de hasta 3 páginas con diseño personalizado, ajustes SEO básicos y publicación final en el servidor proporcionado por el cliente.',
      features: [
        'Sitio web con un máximo de 3 páginas',
        'Diseño desarrollado de manera personalizada',
        'Ajustes básicos de posicionamiento SEO',
        'Despliegue e instalación en el servidor del cliente'
      ]
    },
    en: {
      name: 'Professional Website Plan',
      description:
        'Website with up to 3 pages, tailored web design, basic SEO adjustments, and deployment to the server provided by the client.',
      features: [
        'Website with up to 3 pages',
        'Custom-developed web design',
        'Basic SEO adjustments',
        'Deployment and installation on the client server'
      ]
    }
  },

  {
    id: 'plan-tienda-en-linea-basica',
    priceMXN: 25600.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Plan Tienda en Línea Básica',
      description:
        'Comercio electrónico con catálogo de hasta 20 productos, carrito de compra, conexión con pasarelas de pago y panel de administración.',
      features: [
        'Sitio de comercio electrónico',
        'Alta y configuración de hasta 20 productos',
        'Carrito de compra completamente funcional',
        'Conexión con pasarelas para procesar pagos',
        'Panel de gestión autoadministrable'
      ]
    },
    en: {
      name: 'Basic Online Store Plan',
      description:
        'E-commerce site with a catalog of up to 20 products, shopping cart, payment gateway connection, and administration dashboard.',
      features: [
        'E-commerce website',
        'Setup and configuration of up to 20 products',
        'Fully functional shopping cart',
        'Payment gateway connection',
        'Self-managed administration dashboard'
      ]
    }
  },

  {
    id: 'plan-presencia-digital-basica',
    priceMXN: 7420.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Plan Presencia Digital Básica',
      description:
        'Sitio web de una sección con adaptación a dispositivos móviles, formulario para contactos y publicación en el servidor indicado por el cliente.',
      features: [
        'Sitio web de una sola sección tipo One Page',
        'Diseño optimizado para distintos dispositivos móviles',
        'Formulario funcional para recepción de contactos',
        'Despliegue en el servidor proporcionado por el cliente'
      ]
    },
    en: {
      name: 'Basic Digital Presence Plan',
      description:
        'One-section website with mobile-responsive layout, contact form, and deployment to the server indicated by the client.',
      features: [
        'Single-section One Page website',
        'Layout optimized for mobile devices',
        'Functional contact form',
        'Deployment on the client server'
      ]
    }
  },

  {
    id: 'plan-web-para-profesionistas',
    priceMXN: 12770.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Plan Web para Profesionistas',
      description:
        'Sitio web compuesto por 3 secciones, blog profesional integrado, agenda digital para citas y formularios para recibir contactos.',
      features: [
        'Sitio web estructurado en 3 secciones',
        'Blog profesional incorporado al sitio',
        'Agenda digital para programación de citas',
        'Formularios para recepción de contactos'
      ]
    },
    en: {
      name: 'Website Plan for Professionals',
      description:
        'Three-section website with an integrated professional blog, digital appointment scheduling, and contact forms.',
      features: [
        'Website structured into 3 sections',
        'Integrated professional blog',
        'Digital appointment scheduling system',
        'Contact forms'
      ]
    }
  },

  {
    id: 'plan-portal-inmobiliario',
    priceMXN: 48820.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Plan Portal Inmobiliario',
      description:
        'Portal para publicar inmuebles, búsqueda avanzada, mapas integrados, panel para agentes y galerías con contenido multimedia.',
      features: [
        'Gestión y publicación de propiedades',
        'Herramienta de búsqueda avanzada',
        'Mapas integrados al portal',
        'Panel de gestión para agentes',
        'Galerías para contenido multimedia'
      ]
    },
    en: {
      name: 'Real Estate Portal Plan',
      description:
        'Real estate portal with property publishing, advanced search, integrated maps, an agent dashboard, and multimedia galleries.',
      features: [
        'Property management and publishing',
        'Advanced search tool',
        'Integrated maps',
        'Agent management dashboard',
        'Multimedia galleries'
      ]
    }
  },

  {
    id: 'plan-ecommerce-avanzado',
    priceMXN: 64680.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Plan Ecommerce Avanzado',
      description:
        'Comercio electrónico para hasta 100 productos, gestión con varios administradores, conexión logística para envíos, SEO orientado a ecommerce y métricas de ventas.',
      features: [
        'Tienda digital con hasta 100 productos',
        'Panel con acceso para múltiples administradores',
        'Conexión con procesos logísticos de envío',
        'Optimización SEO enfocada en ecommerce',
        'Panel de métricas y estadísticas comerciales'
      ]
    },
    en: {
      name: 'Advanced Ecommerce Plan',
      description:
        'E-commerce platform for up to 100 products, multi-admin management, shipping logistics connection, ecommerce-focused SEO, and sales metrics.',
      features: [
        'Online store with up to 100 products',
        'Multi-administrator dashboard',
        'Shipping logistics connection',
        'Ecommerce-focused SEO',
        'Sales metrics and statistics'
      ]
    }
  },

  {
    id: 'plan-portal-de-empleo',
    priceMXN: 51890.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Plan Portal de Empleo',
      description:
        'Portal con alta de empresas, publicación de oportunidades laborales, registro de candidatos, carga de CV y panel administrativo.',
      features: [
        'Alta y gestión de empresas',
        'Creación y publicación de vacantes',
        'Alta y registro de candidatos',
        'Carga digital de currículum',
        'Panel para administración del portal'
      ]
    },
    en: {
      name: 'Job Portal Plan',
      description:
        'Portal featuring company onboarding, job publishing, candidate registration, CV uploads, and an administration dashboard.',
      features: [
        'Company registration and management',
        'Job vacancy creation and publishing',
        'Candidate registration',
        'Digital CV upload',
        'Portal administration dashboard'
      ]
    }
  },

  {
    id: 'plan-ecommerce-profesional',
    priceMXN: 41780.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Plan Ecommerce Profesional',
      description:
        'Tienda digital para hasta 60 productos, diseño a medida, control de inventario, gestión de cupones y conexión con pasarelas de pago.',
      features: [
        'Tienda digital con hasta 60 productos',
        'Diseño visual desarrollado a medida',
        'Administración y control de inventario',
        'Creación y gestión de cupones promocionales',
        'Pasarelas de pago conectadas al sitio'
      ]
    },
    en: {
      name: 'Professional Ecommerce Plan',
      description:
        'Online shop for up to 60 products with tailored design, inventory control, discount coupon management, and connected payment gateways.',
      features: [
        'Online store with up to 60 products',
        'Custom visual design',
        'Inventory management and control',
        'Discount coupon creation and management',
        'Integrated payment gateways'
      ]
    }
  },

  {
    id: 'plan-identidad-digital-emprendedor',
    priceMXN: 29840.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Plan Identidad Digital Emprendedor',
      description:
        'Desarrollo de logotipo profesional con hasta 2 propuestas y 1 ronda de cambios, archivos PNG/JPG/vectoriales, landing page profesional responsive, formulario de contacto, acceso a WhatsApp y entrega digital.',
      features: [
        'Desarrollo de logotipo profesional',
        'Hasta 2 alternativas de diseño',
        '1 ronda incluida para modificaciones',
        'Archivos finales en PNG/JPG y formato vectorial',
        'Landing page con presentación profesional',
        'Diseño adaptable y responsive',
        'Formulario para recepción de contactos',
        'Acceso directo mediante botón de WhatsApp',
        'Entrega de archivos y servicio en formato digital'
      ]
    },
    en: {
      name: 'Entrepreneur Digital Identity Plan',
      description:
        'Professional logo creation with up to 2 concepts and 1 revision round, PNG/JPG/vector files, a responsive professional landing page, contact form, WhatsApp access, and digital delivery.',
      features: [
        'Professional logo development',
        'Up to 2 design alternatives',
        '1 included revision round',
        'Final files in PNG/JPG and vector formats',
        'Professional landing page',
        'Responsive design',
        'Contact form',
        'Direct WhatsApp button',
        'Digital delivery'
      ]
    }
  },

  {
    id: 'plan-branding-web-empresarial',
    priceMXN: 33760.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Plan Branding + Web Empresarial',
      description:
        'Desarrollo de logotipo premium con hasta 5 propuestas, sistema de color y tipografías corporativas, favicon, recursos de marca para redes sociales, web empresarial de hasta 3 páginas, SEO inicial y formularios avanzados.',
      features: [
        'Desarrollo de logotipo premium',
        'Hasta 5 conceptos creativos',
        'Sistema de colores y tipografías corporativas',
        'Favicon y paquete de logotipo adaptado a redes sociales',
        'Web empresarial con hasta 3 páginas',
        'Configuración SEO inicial y formularios avanzados'
      ]
    },
    en: {
      name: 'Branding + Corporate Website Plan',
      description:
        'Premium logo development with up to 5 creative concepts, corporate colors and typography, favicon, social media brand assets, a corporate website with up to 3 pages, initial SEO, and advanced forms.',
      features: [
        'Premium logo development',
        'Up to 5 creative concepts',
        'Corporate color and typography system',
        'Favicon and social media logo kit',
        'Corporate website with up to 3 pages',
        'Initial SEO configuration and advanced forms'
      ]
    }
  },

  {
    id: 'plan-plataforma-cursos-online',
    priceMXN: 47800.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Plan Plataforma de Cursos Online',
      description:
        'Entorno LMS con registro de estudiantes, gestión de videos y recursos didácticos, además de evaluaciones en línea.',
      features: [
        'Entorno de aprendizaje LMS',
        'Alta y gestión de estudiantes',
        'Administración de videos y recursos educativos',
        'Evaluaciones digitales en línea'
      ]
    },
    en: {
      name: 'Online Course Platform Plan',
      description:
        'LMS learning environment with student management, videos and educational resources, plus online assessments.',
      features: [
        'LMS learning environment',
        'Student registration and management',
        'Video and educational resource management',
        'Online digital assessments'
      ]
    }
  },

  {
    id: 'plan-web-corporativo-premium',
    priceMXN: 28580.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Plan Web Corporativo Premium',
      description:
        'Sitio corporativo de hasta 8 páginas, diseño personalizado, ajustes técnicos SEO iniciales, conexión con CRM y medidas avanzadas de seguridad web.',
      features: [
        'Sitio web de hasta 8 páginas',
        'Diseño corporativo desarrollado a medida',
        'Ajustes técnicos SEO iniciales',
        'Conexión e integración con CRM',
        'Implementación de seguridad web avanzada'
      ]
    },
    en: {
      name: 'Premium Corporate Website Plan',
      description:
        'Corporate website with up to 8 pages, tailored design, initial technical SEO adjustments, CRM connection, and advanced web security.',
      features: [
        'Corporate website with up to 8 pages',
        'Custom corporate design',
        'Initial technical SEO adjustments',
        'CRM connection and integration',
        'Advanced web security implementation'
      ]
    }
  },

  {
    id: 'bolsa-soporte-digital',
    priceMXN: 2600.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Bolsa de Soporte Digital Prioritario',
      description:
        'Bolsa de asistencia técnica destinada a atender varias solicitudes menores dentro de un periodo definido. Pensada para empresas y emprendedores que necesitan soporte recurrente sin adquirir una mensualidad.',
      features: [
        'Cobertura para un máximo de 5 solicitudes de soporte',
        'Atención y solución de incidencias básicas',
        'Orientación técnica personalizada',
        'Prioridad de atención dentro del horario laboral',
        'Seguimiento de cada solicitud hasta su cierre',
        'Entregable: registro digital de las solicitudes gestionadas'
      ]
    },
    en: {
      name: 'Priority Digital Support Package',
      description:
        'Technical assistance package for handling several minor requests within a defined period, designed for companies and entrepreneurs needing recurring help without a monthly subscription.',
      features: [
        'Coverage for up to 5 support requests',
        'Basic issue troubleshooting and resolution',
        'Personalized technical guidance',
        'Priority attention during business hours',
        'Follow-up on each request until completion',
        'Deliverable: digital log of managed requests'
      ]
    }
  },

  {
    id: 'soporte-tecnico-remoto',
    priceMXN: 1890.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Soporte Técnico Remoto Básico',
      description:
        'Soporte a distancia para atender incidencias básicas en sitios web, equipos, software, configuraciones, errores habituales o servicios digitales.',
      features: [
        'Incluye un máximo de 2 horas de atención',
        'Corrección de errores habituales y ajustes de configuración',
        'Entregable: informe de las actividades efectuadas',
        'Validación final del funcionamiento del servicio intervenido'
      ]
    },
    en: {
      name: 'Basic Remote Technical Support',
      description:
        'Remote support for basic issues involving websites, devices, software, configurations, common errors, or digital service operation.',
      features: [
        'Includes up to 2 hours of support',
        'Common error resolution and configuration adjustments',
        'Deliverable: report of completed activities',
        'Final confirmation of the serviced system operation'
      ]
    }
  },

  {
    id: 'configuracion-inicial',
    priceMXN: 1350.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Configuración Inicial de Herramientas',
      description:
        'Puesta en marcha básica de una plataforma o servicio digital, incluyendo opciones como correo empresarial, formularios, perfiles administrativos, accesos y herramientas de productividad.',
      features: [
        'Puesta en marcha básica de una plataforma digital',
        'Alta de cuentas, formularios o perfiles de usuario',
        'Validaciones y pruebas de operación',
        'Entregable: configuración finalizada y operativa',
        'Evidencia digital de los trabajos efectuados'
      ]
    },
    en: {
      name: 'Initial Tools Setup',
      description:
        'Initial setup of a digital platform or service, including business email, forms, administrative profiles, access permissions, or productivity tools.',
      features: [
        'Initial setup of a digital platform',
        'Account, form, or user profile creation',
        'Operational validation and testing',
        'Deliverable: completed and operational configuration',
        'Digital evidence of the work performed'
      ]
    }
  },

  {
    id: 'servicio-express-dudas',
    priceMXN: 510.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Servicio Express de Resolución de Dudas',
      description:
        'Sesión individual para aclarar dudas sobre sitios web, herramientas digitales, administración básica, procesos en línea o plataformas, acompañada de recomendaciones prácticas.',
      features: [
        'Atención mediante videollamada u otros canales digitales',
        'Sesión con duración máxima de 30 minutos',
        'Guía práctica con recomendaciones que pueden aplicarse',
        'Entregable: resumen digital de respuestas y recomendaciones',
        'Recursos y enlaces útiles cuando correspondan'
      ]
    },
    en: {
      name: 'Express Doubt Resolution Service',
      description:
        'One-on-one session to clarify questions about websites, digital tools, basic administration, online processes, or platforms, with practical guidance.',
      features: [
        'Support through video call or other digital channels',
        'Session lasting up to 30 minutes',
        'Practical guidance with applicable recommendations',
        'Deliverable: digital summary of answers and recommendations',
        'Useful resources and links when applicable'
      ]
    }
  },

  {
    id: 'diagnostico-problemas',
    priceMXN: 890.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Diagnóstico de Problemas Digitales',
      description:
        'Análisis de fallas básicas en sitios web, correo, dominios, formularios, configuraciones simples o herramientas digitales para determinar el origen del inconveniente.',
      features: [
        'Análisis de incidencias digitales básicas',
        'Determinación del origen del problema',
        'Corrección durante la sesión cuando sea técnicamente posible',
        'Entregable: informe con el diagnóstico obtenido',
        'Detalle de acciones ejecutadas o recomendaciones de solución'
      ]
    },
    en: {
      name: 'Digital Problem Diagnostics',
      description:
        'Assessment of basic issues affecting websites, email, domains, forms, simple configurations, or digital tools to identify the source of the problem.',
      features: [
        'Assessment of basic digital issues',
        'Identification of the source of the problem',
        'Correction during the session whenever technically possible',
        'Deliverable: diagnostic report',
        'Details of completed actions or solution recommendations'
      ]
    }
  },

  {
    id: 'asesoria-digital-basica',
    priceMXN: 310.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Asesoría Digital Básica',
      description:
        'Asesoría individual para aclarar dudas o resolver situaciones sencillas vinculadas con plataformas digitales, gestión básica de sitios web, herramientas online o procesos tecnológicos.',
      features: [
        'Atención por videollamada u otros medios digitales',
        'Asesoría con duración de hasta 15 minutos',
        'Atención de un máximo de 2 dudas vinculadas',
        'Recomendaciones prácticas orientadas a su aplicación',
        'Entregable: síntesis digital de los temas revisados'
      ]
    },
    en: {
      name: 'Basic Digital Consulting',
      description:
        'Individual guidance for simple questions or issues involving digital platforms, basic website management, online tools, or technology processes.',
      features: [
        'Support through video call or other digital channels',
        'Consulting session lasting up to 15 minutes',
        'Resolution of up to 2 related questions',
        'Practical recommendations for implementation',
        'Deliverable: digital summary of the topics reviewed'
      ]
    }
  },

  {
    id: 'consulta-digital-rapida',
    priceMXN: 180.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=85',
    es: {
      name: 'Consulta Digital Rápida',
      description:
        'Atención de una consulta específica sobre herramientas digitales, plataformas online, sitios web o procesos básicos, mediante chat o correo electrónico.',
      features: [
        'Atención disponible por chat o correo electrónico',
        'Respuesta a 1 consulta concreta',
        'Recomendación práctica orientada a resolver la situación',
        'Entrega de la respuesta digital dentro del plazo convenido',
        'Servicio realizado completamente en línea'
      ]
    },
    en: {
      name: 'Quick Digital Query',
      description:
        'Support for one specific question involving digital tools, online platforms, websites, or basic processes, provided through chat or email.',
      features: [
        'Support available through chat or email',
        'Resolution of 1 specific inquiry',
        'Practical recommendation aimed at resolving the issue',
        'Digital response delivered within the agreed timeframe',
        'Service provided entirely online'
      ]
    }
  }
];

export function formatMXN(amount: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount);
}