import type { Lang } from '../i18n/ui';
import type { ProjectImageKey } from './site';

/**
 * Page copy for every route, keyed by locale.
 *
 * Both locales share the same interfaces, so `content` is typed as
 * `Record<Lang, SiteContent>` and the compiler rejects any missing or extra
 * field in either translation.
 */

export interface PageIntro {
  eyebrow: string;
  title: string;
  description: string;
}

export interface Highlight {
  icon: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface AboutPage {
  hero: {
    eyebrow: string;
    title: string;
    roleLine: string;
    lead: string;
    paragraphs: string[];
  };
  highlights: Highlight[];
  stats: Stat[];
  portraitCaption: string;
  socialTitle: string;
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  org: string;
  location: string;
  summary: string;
  bullets: string[];
  tags: string[];
  current?: boolean;
}

export interface TimelinePage {
  intro: PageIntro;
  items: TimelineItem[];
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillGroup {
  id: string;
  icon: string;
  title: string;
  description: string;
  level: number;
  skills: Skill[];
}

export interface SkillsPage {
  intro: PageIntro;
  groups: SkillGroup[];
  toolbox: {
    title: string;
    description: string;
    tags: string[];
  };
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  image: ProjectImageKey;
  imageAlt: string;
  tags: string[];
  repo: string;
  demo: string;
  status: string;
  year: string;
}

export interface ProjectsPage {
  intro: PageIntro;
  items: Project[];
}

export interface ContactPage {
  intro: PageIntro;
  closing: string;
}

export interface SiteContent {
  about: AboutPage;
  education: TimelinePage;
  experience: TimelinePage;
  skills: SkillsPage;
  projects: ProjectsPage;
  contact: ContactPage;
}

const es: SiteContent = {
  about: {
    hero: {
      eyebrow: 'Portafolio profesional',
      title: 'Kendall Salazar Navarro',
      roleLine: 'Ingeniero en Sistemas de Información · Desarrollador Full Stack · Costa Rica',
      lead:
        'Estudiante de Ingeniería en Sistemas de Información en la Universidad Nacional de Costa Rica y desarrollador full stack. Trabajo con TypeScript, Python y Java, y con bases de datos SQL y NoSQL. Busco mi primera oportunidad profesional en desarrollo de software.',
      paragraphs: [
        'Me formé primero en diseño gráfico técnico y después en desarrollo de aplicaciones informáticas. Esa combinación me llevó a cuidar tanto la lógica del sistema como la experiencia de quien lo usa.',
        'Construyo aplicaciones con Next.js, Node.js y Expo; modelo y consulto datos en PostgreSQL, MySQL, Oracle, SQLite, Firebase y MongoDB; y uso Git, GitHub, Docker y Postman en mi flujo de trabajo diario.',
        'Documento el código y las decisiones técnicas para que otra persona pueda continuar el trabajo. Hablo español nativo e inglés B2, y estoy disponible para trabajo remoto desde Costa Rica.',
      ],
    },
    highlights: [
      {
        icon: 'bi-code-square',
        title: 'Desarrollo full stack',
        description: 'Frontend y backend con JavaScript, TypeScript, Python, C++ y Java.',
      },
      {
        icon: 'bi-database',
        title: 'Datos y persistencia',
        description:
          'Modelado y consultas en PostgreSQL, MySQL, Oracle, SQLite, Firebase y MongoDB.',
      },
      {
        icon: 'bi-mortarboard',
        title: 'Formación continua',
        description:
          'Ingeniería en Sistemas de Información en curso y diplomado en Desarrollo de Aplicaciones Informáticas.',
      },
    ],
    stats: [
      { value: '5', label: 'Lenguajes de programación' },
      { value: '6', label: 'Bases de datos' },
      { value: 'B2', label: 'Nivel de inglés' },
      { value: '1', label: 'Práctica profesional' },
    ],
    portraitCaption: 'Pérez Zeledón, Costa Rica · Disponible para trabajo remoto',
    socialTitle: 'Perfiles profesionales',
  },

  education: {
    intro: {
      eyebrow: 'Educación',
      title: 'Formación académica',
      description:
        'Formación en sistemas de información, desarrollo de aplicaciones y diseño gráfico técnico, en la Universidad Nacional de Costa Rica y el Colegio Técnico Profesional de San Isidro.',
    },
    items: [
      {
        id: 'degree',
        period: '2022 — Actualidad',
        title: 'Ingeniería en Sistemas de Información',
        org: 'Universidad Nacional de Costa Rica',
        location: 'Costa Rica',
        summary:
          'Formación universitaria en sistemas de información, con énfasis en desarrollo de software, bases de datos, redes y arquitectura de sistemas.',
        bullets: [
          'Carrera en curso; combino la formación académica con proyectos personales de desarrollo.',
          'Cursos relevantes: programación, bases de datos, redes, seguridad informática y arquitectura de software.',
        ],
        tags: ['Sistemas de Información', 'Desarrollo de software', 'Bases de datos'],
        current: true,
      },
      {
        id: 'diploma',
        period: '2022 — 2025',
        title: 'Diplomado en Desarrollo de Aplicaciones Informáticas',
        org: 'Universidad Nacional de Costa Rica',
        location: 'Costa Rica',
        summary:
          'Programa técnico orientado al desarrollo de aplicaciones, con práctica en lenguajes, frameworks y persistencia de datos.',
        bullets: [],
        tags: ['Desarrollo de aplicaciones', 'Programación'],
      },
      {
        id: 'secondary',
        period: '2019 — 2021',
        title: 'Bachillerato en Educación Media y Técnico Medio en Diseño Gráfico',
        org: 'Colegio Técnico Profesional de San Isidro',
        location: 'Costa Rica',
        summary:
          'Formación técnica en diseño gráfico: identidad visual, composición y producción de piezas para medios digitales.',
        bullets: [],
        tags: ['Diseño Gráfico', 'Identidad visual'],
      },
    ],
  },

  experience: {
    intro: {
      eyebrow: 'Experiencia',
      title: 'Trayectoria',
      description:
        'Proyectos académicos de desarrollo durante la carrera y una práctica profesional en diseño gráfico.',
    },
    items: [
      {
        id: 'academic-projects',
        period: '2022 — Actualidad',
        title: 'Proyectos académicos de desarrollo',
        org: 'Universidad Nacional de Costa Rica',
        location: 'Costa Rica',
        summary:
          'Proyectos de programación, bases de datos, redes y seguridad informática desarrollados durante la carrera.',
        bullets: [
          'Desarrollé aplicaciones con Python, Java, JavaScript y TypeScript.',
          'Diseñé y consulté bases de datos relacionales y no relacionales.',
          'Implementé algoritmos de enrutamiento, simulación y seguridad informática.',
        ],
        tags: ['Python', 'Java', 'Bases de datos', 'Redes'],
        current: true,
      },
      {
        id: 'graphic-design-intern',
        period: 'Oct. 2021 — Dic. 2021',
        title: 'Diseñador Gráfico Practicante',
        org: 'Rent a Car',
        location: 'Costa Rica',
        summary: 'Práctica profesional en diseño gráfico para una empresa de alquiler de vehículos.',
        bullets: [
          'Creé y renové logotipos e imágenes corporativas.',
          'Diseñé banners y piezas de publicidad para redes sociales.',
        ],
        tags: ['Diseño Gráfico', 'Identidad visual', 'Redes sociales'],
      },
    ],
  },

  skills: {
    intro: {
      eyebrow: 'Habilidades',
      title: 'Mapa de habilidades',
      description:
        'Grupos tomados directamente de mi CV, con una escala de tres niveles para que el dominio de cada tecnología quede explícito.',
    },
    groups: [
      {
        id: 'languages',
        icon: 'bi-code-slash',
        title: 'Lenguajes de programación',
        description: 'Intermedio — los uso en proyectos académicos y personales.',
        level: 70,
        skills: [
          { name: 'JavaScript', level: 70 },
          { name: 'TypeScript', level: 70 },
          { name: 'Python', level: 70 },
          { name: 'C++', level: 55 },
          { name: 'Java', level: 55 },
        ],
      },
      {
        id: 'frontend',
        icon: 'bi-window',
        title: 'Frontend',
        description: 'Intermedio — interfaces y aplicaciones con componentes reutilizables.',
        level: 70,
        skills: [
          { name: 'Next.js', level: 70 },
          { name: 'Expo', level: 70 },
          { name: 'CSS', level: 70 },
        ],
      },
      {
        id: 'backend',
        icon: 'bi-hdd-stack',
        title: 'Backend y APIs',
        description: 'Intermedio — servicios, contratos REST y procesamiento de datos.',
        level: 70,
        skills: [
          { name: 'Node.js', level: 70 },
          { name: 'APIs REST', level: 70 },
          { name: 'Autenticación', level: 55 },
          { name: 'Procesamiento de datos', level: 55 },
          { name: 'Arquitectura escalable', level: 55 },
        ],
      },
      {
        id: 'databases',
        icon: 'bi-database',
        title: 'Bases de datos',
        description: 'Intermedio — modelado y consultas en motores relacionales y no relacionales.',
        level: 70,
        skills: [
          { name: 'PostgreSQL', level: 70 },
          { name: 'MySQL', level: 55 },
          { name: 'Oracle', level: 55 },
          { name: 'SQLite', level: 55 },
          { name: 'MongoDB', level: 55 },
          { name: 'Firebase', level: 55 },
        ],
      },
      {
        id: 'tools',
        icon: 'bi-tools',
        title: 'Herramientas y DevOps',
        description: 'Intermedio — control de versiones, contenedores y pruebas de API.',
        level: 70,
        skills: [
          { name: 'Git', level: 70 },
          { name: 'GitHub', level: 70 },
          { name: 'Docker', level: 55 },
          { name: 'Postman', level: 70 },
          { name: 'JSON', level: 70 },
          { name: 'Documentación de código', level: 70 },
        ],
      },
      {
        id: 'languages-spoken',
        icon: 'bi-translate',
        title: 'Idiomas',
        description: 'Español nativo e inglés B2.',
        level: 85,
        skills: [
          { name: 'Español', level: 100 },
          { name: 'Inglés', level: 70 },
        ],
      },
    ],
    toolbox: {
      title: 'Herramientas de trabajo',
      description:
        'Escala de tres niveles aplicada en todos los grupos: Avanzado (lo uso con autonomía y puedo explicarlo), Intermedio (lo uso con autonomía y revisión puntual), Básico (lo entiendo y lo aplico con apoyo).',
      tags: ['Git', 'GitHub', 'Docker', 'Postman', 'JSON', 'Next.js', 'Expo', 'Node.js'],
    },
  },

  projects: {
    intro: {
      eyebrow: 'Proyectos',
      title: 'Proyectos publicados',
      description:
        'Una selección de proyectos académicos y personales publicados en GitHub, con la tecnología y el enfoque de cada uno.',
    },
    items: [
      {
        id: 'platform',
        title: 'Productivity Stopwatch',
        summary:
          'Aplicación de productividad en Next.js para registrar sesiones de enfoque con temporizador e historial persistente.',
        description:
          'Proyecto de estudio de Next.js y React: usa useRef para el temporizador, useMemo para cálculos derivados y un hook propio sobre localStorage para conservar el historial entre recargas. Separa lógica y presentación con el patrón container-presenter.',
        image: 'platform',
        imageAlt: 'Patrón decorativo de trazas y nodos',
        tags: ['Next.js', 'TypeScript', 'React', 'localStorage'],
        repo: 'https://github.com/KendallSN/Productivity-Stopwatch-Nextjs',
        demo: 'https://productivity-stopwatch-nextjs.vercel.app',
        status: 'Público',
        year: '2025',
      },
      {
        id: 'observability',
        title: 'Banco Simulación',
        summary: 'Simulación bancaria con cliente web y servidor Express sobre SQLite.',
        description:
          'Cliente en JavaScript y servidor en Node.js con Express; SQLite guarda cuentas y movimientos, y crypto-js participa en el flujo de simulación. El proyecto separa la API del cliente.',
        image: 'observability',
        imageAlt: 'Patrón decorativo de gráficas y ejes técnicos',
        tags: ['JavaScript', 'Node.js', 'Express', 'SQLite'],
        repo: 'https://github.com/KendallSN/bancoSimulacion',
        demo: '',
        status: 'Público',
        year: '2025',
      },
      {
        id: 'environments',
        title: 'Sokoban',
        summary:
          'Implementación en Java del clásico Sokoban: empujar cajas hasta sus posiciones objetivo dentro de un tablero.',
        description:
          'Modela el tablero, las colisiones y el estado del juego, con interfaz gráfica para jugar. El reto está en validar movimientos y evitar bloqueos irresolubles.',
        image: 'environments',
        imageAlt: 'Patrón decorativo de bloques conectados',
        tags: ['Java', 'POO', 'Juego', 'Algoritmos'],
        repo: 'https://github.com/KendallSN/Sokoban-java',
        demo: '',
        status: 'Público',
        year: '2025',
      },
      {
        id: 'events',
        title: 'Sudoku',
        summary:
          'Juego y solucionador de Sudoku con interfaz gráfica y resolución automática mediante algoritmos lógicos.',
        description:
          'Permite completar el tablero manualmente o resolverlo de forma automática; el solucionador aplica reglas lógicas de descarte y validación.',
        image: 'events',
        imageAlt: 'Patrón decorativo de flujo entre nodos',
        tags: ['Java', 'Algoritmos', 'Interfaz gráfica', 'Lógica'],
        repo: 'https://github.com/KendallSN/Sudoku',
        demo: '',
        status: 'Público',
        year: '2025',
      },
    ],
  },

  contact: {
    intro: {
      eyebrow: 'Contacto',
      title: 'Hablemos de lo que necesitas',
      description:
        'Busco prácticas profesionales y mi primera oportunidad como desarrollador full stack. Escríbeme con el puesto, el equipo y las tecnologías del proyecto.',
    },
    closing:
      'Respondo personalmente en un plazo de 24 a 48 horas. También puedes escribirme directamente a mi correo o llamarme si el proceso lo requiere.',
  },
};

const en: SiteContent = {
  about: {
    hero: {
      eyebrow: 'Professional portfolio',
      title: 'Kendall Salazar Navarro',
      roleLine: 'Full Stack Information Systems Engineer · Costa Rica',
      lead:
        'Information Systems Engineering student at Universidad Nacional de Costa Rica and full stack developer. I work with TypeScript, Python, and Java, and with SQL and NoSQL databases. I am looking for my first professional opportunity in software development.',
      paragraphs: [
        'I trained first in technical graphic design and later in software application development. That combination led me to care about both the logic of the system and the experience of the person using it.',
        'I build applications with Next.js, Node.js, and Expo; model and query data in PostgreSQL, MySQL, Oracle, SQLite, Firebase, and MongoDB; and use Git, GitHub, Docker, and Postman in my daily workflow.',
        'I document code and technical decisions so someone else can continue the work. I speak native Spanish and B2 English, and I am available for remote work from Costa Rica.',
      ],
    },
    highlights: [
      {
        icon: 'bi-code-square',
        title: 'Full stack development',
        description:
          'Frontend and backend with JavaScript, TypeScript, Python, C++, and Java.',
      },
      {
        icon: 'bi-database',
        title: 'Data and persistence',
        description:
          'Modeling and queries in PostgreSQL, MySQL, Oracle, SQLite, Firebase, and MongoDB.',
      },
      {
        icon: 'bi-mortarboard',
        title: 'Continuous learning',
        description:
          'Information Systems Engineering in progress and a diploma in Software Application Development.',
      },
    ],
    stats: [
      { value: '5', label: 'Programming languages' },
      { value: '6', label: 'Databases' },
      { value: 'B2', label: 'English level' },
      { value: '1', label: 'Professional internship' },
    ],
    portraitCaption: 'Pérez Zeledón, Costa Rica · Available for remote work',
    socialTitle: 'Professional profiles',
  },

  education: {
    intro: {
      eyebrow: 'Education',
      title: 'Academic background',
      description:
        'Training in information systems, software application development, and technical graphic design at Universidad Nacional de Costa Rica and Colegio Técnico Profesional de San Isidro.',
    },
    items: [
      {
        id: 'degree',
        period: '2022 — Present',
        title: 'B.Sc. in Information Systems Engineering',
        org: 'Universidad Nacional de Costa Rica',
        location: 'Costa Rica',
        summary:
          'University training in information systems, focused on software development, databases, networking, and systems architecture.',
        bullets: [
          'Degree in progress; I combine coursework with personal software projects.',
          'Relevant coursework: programming, databases, networking, information security, and software architecture.',
        ],
        tags: ['Information systems', 'Software development', 'Databases'],
        current: true,
      },
      {
        id: 'diploma',
        period: '2022 — 2025',
        title: 'Diploma in Software Application Development',
        org: 'Universidad Nacional de Costa Rica',
        location: 'Costa Rica',
        summary:
          'Technical program focused on application development, with practice in languages, frameworks, and data persistence.',
        bullets: [],
        tags: ['Application development', 'Programming'],
      },
      {
        id: 'secondary',
        period: '2019 — 2021',
        title: 'High School Diploma and Technical Vocational Diploma in Graphic Design',
        org: 'Colegio Técnico Profesional de San Isidro',
        location: 'Costa Rica',
        summary:
          'Technical training in graphic design: visual identity, composition, and digital media production.',
        bullets: [],
        tags: ['Graphic design', 'Visual identity'],
      },
    ],
  },

  experience: {
    intro: {
      eyebrow: 'Experience',
      title: 'Track record',
      description:
        'Academic software projects during my degree and a professional graphic design internship.',
    },
    items: [
      {
        id: 'academic-projects',
        period: '2022 — Present',
        title: 'Academic Software Projects',
        org: 'Universidad Nacional de Costa Rica',
        location: 'Costa Rica',
        summary:
          'Programming, database, networking, and information security projects developed during my degree.',
        bullets: [
          'Built applications with Python, Java, JavaScript, and TypeScript.',
          'Designed and queried relational and non-relational databases.',
          'Implemented routing, simulation, and information security algorithms.',
        ],
        tags: ['Python', 'Java', 'Databases', 'Networking'],
        current: true,
      },
      {
        id: 'graphic-design-intern',
        period: 'Oct 2021 — Dec 2021',
        title: 'Graphic Design Intern',
        org: 'Rent a Car',
        location: 'Costa Rica',
        summary: 'Professional internship in graphic design at a car rental company.',
        bullets: [
          'Created and refreshed logos and corporate imagery.',
          'Designed banners and social media advertising assets.',
        ],
        tags: ['Graphic design', 'Visual identity', 'Social media'],
      },
    ],
  },

  skills: {
    intro: {
      eyebrow: 'Skills',
      title: 'Skills map',
      description:
        'Groups taken directly from my CV, with a three-level scale so the level of each technology is explicit.',
    },
    groups: [
      {
        id: 'languages',
        icon: 'bi-code-slash',
        title: 'Programming languages',
        description: 'Intermediate — I use them in academic and personal projects.',
        level: 70,
        skills: [
          { name: 'JavaScript', level: 70 },
          { name: 'TypeScript', level: 70 },
          { name: 'Python', level: 70 },
          { name: 'C++', level: 55 },
          { name: 'Java', level: 55 },
        ],
      },
      {
        id: 'frontend',
        icon: 'bi-window',
        title: 'Frontend',
        description: 'Intermediate — interfaces and applications built from reusable components.',
        level: 70,
        skills: [
          { name: 'Next.js', level: 70 },
          { name: 'Expo', level: 70 },
          { name: 'CSS', level: 70 },
        ],
      },
      {
        id: 'backend',
        icon: 'bi-hdd-stack',
        title: 'Backend and APIs',
        description: 'Intermediate — services, REST contracts, and data processing.',
        level: 70,
        skills: [
          { name: 'Node.js', level: 70 },
          { name: 'REST APIs', level: 70 },
          { name: 'Authentication', level: 55 },
          { name: 'Data processing', level: 55 },
          { name: 'Scalable architecture', level: 55 },
        ],
      },
      {
        id: 'databases',
        icon: 'bi-database',
        title: 'Databases',
        description: 'Intermediate — modeling and queries across relational and non-relational engines.',
        level: 70,
        skills: [
          { name: 'PostgreSQL', level: 70 },
          { name: 'MySQL', level: 55 },
          { name: 'Oracle', level: 55 },
          { name: 'SQLite', level: 55 },
          { name: 'MongoDB', level: 55 },
          { name: 'Firebase', level: 55 },
        ],
      },
      {
        id: 'tools',
        icon: 'bi-tools',
        title: 'Tools and DevOps',
        description: 'Intermediate — version control, containers, and API testing.',
        level: 70,
        skills: [
          { name: 'Git', level: 70 },
          { name: 'GitHub', level: 70 },
          { name: 'Docker', level: 55 },
          { name: 'Postman', level: 70 },
          { name: 'JSON', level: 70 },
          { name: 'Code documentation', level: 70 },
        ],
      },
      {
        id: 'languages-spoken',
        icon: 'bi-translate',
        title: 'Languages',
        description: 'Native Spanish and B2 English.',
        level: 85,
        skills: [
          { name: 'Spanish', level: 100 },
          { name: 'English', level: 70 },
        ],
      },
    ],
    toolbox: {
      title: 'Working tools',
      description:
        'Three-level scale applied across every group: Advanced (I use it independently and can explain it), Intermediate (I use it independently with occasional review), Basic (I understand it and use it with support).',
      tags: ['Git', 'GitHub', 'Docker', 'Postman', 'JSON', 'Next.js', 'Expo', 'Node.js'],
    },
  },

  projects: {
    intro: {
      eyebrow: 'Projects',
      title: 'Published projects',
      description:
        'A selection of academic and personal projects published on GitHub, with the technology and the approach behind each one.',
    },
    items: [
      {
        id: 'platform',
        title: 'Productivity Stopwatch',
        summary:
          'A Next.js productivity app for tracking focus sessions with a timer and persistent history.',
        description:
          'A Next.js and React study project: it uses useRef for the timer, useMemo for derived calculations, and a custom localStorage hook to keep the history across reloads. Logic and presentation are separated with the container-presenter pattern.',
        image: 'platform',
        imageAlt: 'Decorative pattern of traces and nodes',
        tags: ['Next.js', 'TypeScript', 'React', 'localStorage'],
        repo: 'https://github.com/KendallSN/Productivity-Stopwatch-Nextjs',
        demo: 'https://productivity-stopwatch-nextjs.vercel.app',
        status: 'Public',
        year: '2025',
      },
      {
        id: 'observability',
        title: 'Banco Simulación',
        summary: 'A banking simulation with a web client and an Express server backed by SQLite.',
        description:
          'A JavaScript client and a Node.js/Express server; SQLite stores accounts and transactions, and crypto-js takes part in the simulation flow. The API and the client are kept separate.',
        image: 'observability',
        imageAlt: 'Decorative pattern of charts and technical axes',
        tags: ['JavaScript', 'Node.js', 'Express', 'SQLite'],
        repo: 'https://github.com/KendallSN/bancoSimulacion',
        demo: '',
        status: 'Public',
        year: '2025',
      },
      {
        id: 'environments',
        title: 'Sokoban',
        summary:
          'A Java implementation of classic Sokoban: push crates onto their target positions inside a board.',
        description:
          'It models the board, collisions, and game state, with a graphical interface for play. The challenge is validating moves and avoiding unsolvable deadlocks.',
        image: 'environments',
        imageAlt: 'Decorative pattern of connected blocks',
        tags: ['Java', 'OOP', 'Game', 'Algorithms'],
        repo: 'https://github.com/KendallSN/Sokoban-java',
        demo: '',
        status: 'Public',
        year: '2025',
      },
      {
        id: 'events',
        title: 'Sudoku',
        summary:
          'A Sudoku game and solver with a graphical interface and automatic solving through logical algorithms.',
        description:
          'Players can fill the board manually or solve it automatically; the solver applies logical elimination and validation rules.',
        image: 'events',
        imageAlt: 'Decorative pattern of flow between nodes',
        tags: ['Java', 'Algorithms', 'Graphical interface', 'Logic'],
        repo: 'https://github.com/KendallSN/Sudoku',
        demo: '',
        status: 'Public',
        year: '2025',
      },
    ],
  },

  contact: {
    intro: {
      eyebrow: 'Contact',
      title: "Let's talk about what you need",
      description:
        'I am looking for internships and my first full stack developer role. Write to me with the role, the team, and the project technologies.',
    },
    closing:
      'I reply personally within 24 to 48 hours. You can also email me directly or call if the process requires it.',
  },
};

export const content: Record<Lang, SiteContent> = { es, en };
