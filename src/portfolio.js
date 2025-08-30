/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Cirotti",
  title: "Hola, Soy Cirotti",
  subTitle: emoji(
    "Un apasionado desarrollador de software full stack 🚀, con gusto por desarrollar páginas web, aplicaciones móviles, diseño gráfico y la creación de bots para múltiples plataformas. Experiencia trabajando con JavaScript, React.js, Node.js, React Native y otras bibliotecas y frameworks interesantes para construir soluciones modernas y completas."
  ),
  resumeLink:
    "https://drive.google.com/file/d/1ofFdKF_mqscH8WvXkSObnVvC9kK7Ldlu/view?usp=sharing", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/cirotti",
  linkedin: "https://www.linkedin.com/",
  gmail: "cirottidev@gmail.com",
  gitlab: "https://gitlab.com/cirotti",
  medium: "https://medium.com/",
  stackoverflow: "https://stackoverflow.com/users/31382362/cirotti",
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "Lo que hago",
  subTitle: "DESARROLLADOR FULL STACK APASIONADO POR WEB, MÓVIL, DISEÑO Y BOTS",
  skills: [
    emoji(
      "⚡ Desarrollo de páginas web altamente interactivas y aplicaciones móviles modernas"
    ),
    emoji("⚡ Aplicaciones web progresivas (PWA) en pilas normales y SPA"),
    emoji(
      "⚡ Integración de servicios de terceros como Firebase, AWS y Digital Ocean"
    )
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "html-5",
      fontAwesomeClassname: "fab fa-html5"
    },
    {
      skillName: "css3",
      fontAwesomeClassname: "fab fa-css3-alt"
    },
    {
      skillName: "sass",
      fontAwesomeClassname: "fab fa-sass"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "reactjs",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "nodejs",
      fontAwesomeClassname: "fab fa-node"
    },
    {
      skillName: "swift",
      fontAwesomeClassname: "fab fa-swift"
    },
    {
      skillName: "npm",
      fontAwesomeClassname: "fab fa-npm"
    },
    {
      skillName: "sql-database",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "aws",
      fontAwesomeClassname: "fab fa-aws"
    },
    {
      skillName: "firebase",
      fontAwesomeClassname: "fas fa-fire"
    },
    {
      skillName: "python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "docker",
      fontAwesomeClassname: "fab fa-docker"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Interfaz/Diseño", //Insert stack or technology you have experience in
      progressPercentage: "90%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Programación",
      progressPercentage: "80%"
    },
    {
      Stack: "Backend",
      progressPercentage: "60%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Bot Developer",
      company: "Bots Multi-Plataforma",
      companylogo: require("./assets/images/robotlogo.png"),
      date: "Ene 2023 – Presente",
      desc: "Creación de bots inteligentes para automatización, moderación y respuestas en Discord, Telegram y WhatsApp.",
      descBullets: [
        "Comandos personalizados y moderación avanzada.",
        "Integración con APIs y respuestas automáticas."
      ]
    },
    {
      role: "Proyectos Freelance",
      company: "Front-End Developer",
      companylogo: require("./assets/images/web-development.png"),
      date: "2022 – Presente",
      desc: "Creación de sitios web profesionales, responsivos y optimizados para SEO utilizando React, Tailwind y buenas prácticas de UI/UX.",
          descBullets: [
        "Webs rápidas y optimizadas.",
        "Experiencia de usuario intuitiva."
      ]
    },
    {
      role: "API & Automation Developer",
      company: "Soluciones Automatizadas",
      companylogo: require("./assets/images/api-automation-testing (1).png"),
      date: "2021 – Presente",
      desc: "Integración de APIs, desarrollo de scripts y automatización de procesos para empresas y proyectos personales.",
                descBullets: [
        "Conexión entre plataformas.",
        "Automatización eficiente y escalable."
      ]
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Grandes Proyectos",
  subtitle: "Algunas startups y empresas para las que desarrollé sitios web y soluciones digitales",
  projects: [
    {
      image: require("./assets/images/UrbanDF.png"),
      projectName: "Urban Design (No terminada)",
      projectDesc: "Diseñé y desarrollé un sitio moderno y minimalista para una marca urbana, optimizado para una experiencia fluida y adaptable a todos los dispositivos.",
      footerLink: [
        {
          name: "Visitar Website",
          url: "https://urban-df-dd7f67.webflow.io"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/El-parche-rp.png"),
      projectName: "ParcheRP",
      projectDesc: "Diseñé y desarrollé la página oficial del servidor Parche RP, un proyecto enfocado en la comunidad de GTA Roleplay.",
      footerLink: [
        {
          name: "Visitar Website",
          url: "https://parche-rp.vercel.app"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("¡Mis Servicios! 🚀 "),
  subtitle:
    "Transforma tus ideas en realidad: webs, apps, diseño y automatización.",

  achievementsCards: [
    {
      title: "Desarrollo Web",
      subtitle:
        "Creación de sitios web modernos, responsivos y optimizados con tecnologías actuales.",
      image: require("./assets/images/4860133.jpg"),
      imageAlt: "Google Code-In Logo",
      footerLink: [
        {
          name: "Ver Proyectos",
          url: ""
        },
        {
          name: "Cotizar Ahora",
          url: ""
        },
        {
          name: "Saber Más",
          url: ""
        }
      ]
    },
    {
      title: "Aplicaciones Móviles",
      subtitle:
        "Desarrollo de aplicaciones móviles híbridas y nativas para Android e iOS.",
      image: require("./assets/images/ONKJC00.jpg"),
      imageAlt: "Google Assistant Action Logo",
      footerLink: [
        {
          name: "Cotizar Aplicación",
          url: ""
        }
      ]
    },

    {
      title: "Desarrollador de Bots para Múltiples Plataformas",
      subtitle: "Automatización inteligente: desarrollo de bots personalizados para diversas plataformas",
      image: require("./assets/images/rbots.jpg"),
      imageAlt: "PWA Logo",
      footerLink: [
        {name: "Ver Bots Creados", url: ""},
        {
          name: "Hablar por WhatsApp",
          url: ""
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Cómo estructurar un proyecto profesional en React",
  subtitle:
    "Aprende a organizar tu proyecto para que sea escalable, mantenible y fácil de entender.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "https://www.netguru.com/blog/react-project-structure?utm_source=chatgpt.com",
      title: "¿Te pierdes entre componentes y carpetas?",
      description:
        "Descubre la mejor manera de organizar tu código para que sea escalable, mantenible y fácil de entender en proyectos reales."
    },
    {
      url: "https://www.peerbits.com/blog/reasons-to-choose-reactjs-for-your-web-development-project.html?utm_source=chatgpt.com",
      title: "¿Por qué React es el mejor?",
      description:
        "React es una librería de JavaScript para construir interfaces de usuario. Es mantenida por Facebook y una comunidad de desarrolladores y empresas."
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Talks Sections
// Podcast Section
// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: true // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contactame ☎️"),
  subtitle:
    "¿Quieres hablar sobre un proyecto o simplemente saludar? Mi bandeja de entrada está abierta para todos.",
  number: "+92-0000000000",
  email_address: "cirottidev@gmail.com"
};


const isHireable = false; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  contactInfo,
  isHireable,
  resumeSection
};
