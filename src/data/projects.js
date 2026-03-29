export const projects = [
  {
    id: "matchvision",
    title: "MatchVision – End-to-End EPL Prediction Platform",
    description:
      "Containerized ML pipeline using Airflow, MariaDB, Redis, and DVC to automate data ingestion, cleaning, validation, and model training for EPL match prediction. Tracked experiments with MLflow and served real-time predictions via DRF, integrated into a Django web app displaying live stats, fixtures, and betting probabilities.",
    githubUrl: "https://github.com/ToniBirat7/English_Premier_League_End_To_End_Project",
    techStack: ["Airflow", "Redis", "PostgreSQL", "Docker", "DRF", "MLFlow", "Node.js", "React.js"],
    icon: "fas fa-futbol",
  },
  {
    id: "rag-system",
    title: "AI Powered Document RAG System",
    description:
      "Modular backend enabling intelligent document-based conversations using a custom RAG pipeline. Document Ingestion API to upload and process PDF/TXT files, extract text, apply chunking strategies, and generate embeddings stored in Weaviate. Conversational RAG API with custom retrieval logic, integrated Redis for multi-turn chat memory.",
    githubUrl: "https://github.com/ToniBirat7/RAG_Project_End_To_End",
    techStack: ["FastAPI", "Weaviate", "LangChain", "Redis", "Next.js", "PostgreSQL"],
    icon: "fas fa-brain",
  },
  {
    id: "nuclei-segmentation",
    title: "Automated Nuclei Segmentation in Microscopy Images",
    description:
      "A U-Net-based deep learning model for nuclei detection in microscopy images using the 2018 Data Science Bowl dataset, achieving an IoU score of 0.88. Automated segmentation reduces manual annotation and enhances diagnostic efficiency in resource-constrained medical environments.",
    githubUrl: "https://github.com/ToniBirat7/Nuclei_Segmentation_U-Net_VGG_x_RFC",
    techStack: ["CNN", "TensorFlow", "U-Net", "OpenCV", "Deep Learning"],
    icon: "fas fa-microscope",
  },
  {
    id: "screen-recording",
    title: "Screen Recording & Video Sharing Platform",
    description:
      "Built with Next.js and Bunny.net CDN, featuring user authentication (Better Auth), screen recording, video uploads with public/private sharing, AI-generated transcripts, metadata access, and a search-enabled content library.",
    githubUrl: "https://github.com/ToniBirat7/Screen_Recording_Full_Stack",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "OAuth", "Drizzle ORM"],
    icon: "fas fa-video",
  },
  {
    id: "steganography",
    title: "Steganography: Communicate with Hidden Images",
    description:
      "Real-time one-to-one chat application using DRF and Django Channels, featuring steganography-based messaging where secret text is hidden inside images fetched from APIs. Enabled instant WebSocket communication with a sleek UI for secure messaging.",
    githubUrl: "https://github.com/ToniBirat7/stagnography_project",
    techStack: ["DRF", "ReactJs", "PostgreSQL", "JavaScript", "WebSocket"],
    icon: "fas fa-user-secret",
  },
  {
    id: "ams-cv",
    title: "Attendance Management System Using Computer Vision",
    description:
      "Web application enabling educational institutions to streamline attendance tracking using face recognition. Empowers educators to focus on delivering quality education by eliminating constraints of traditional attendance methods.",
    githubUrl: "https://github.com/ToniBirat7/AMS_CV/tree/birat",
    techStack: ["Django", "ReactJs", "ResNet", "Computer Vision", "Docker"],
    icon: "fas fa-camera",
  },
  {
    id: "ams-web",
    title: "Attendance Management System Web Application",
    description:
      "Full-stack attendance management platform built with Django. Streamlines operations, reduces administrative burden, and enhances overall efficiency for educational institutions.",
    githubUrl: "https://github.com/ToniBirat7/AMS_Deerwalk_Project",
    techStack: ["Python", "Django", "JavaScript", "HTML", "CSS", "Bootstrap"],
    icon: "fas fa-clipboard-check",
  },
  {
    id: "hospital-mgmt",
    title: "Hospital Management System GUI",
    description:
      "Python-based application for managing hospital processes — admin login, CRUD operations on doctors/patients, assignment workflows, relocation, and interactive statistics visualization. Integrates ChatGPT API for illness detection.",
    githubUrl: "https://github.com/ToniBirat7/Hospital-Management-System-GUI",
    techStack: ["Python", "Tkinter", "SQLite", "ChatGPT API", "Data Viz"],
    icon: "fas fa-hospital",
  },
  {
    id: "baali-bigyan",
    title: "Baali Bigyan",
    description:
      "Mobile application powered by ML that detects plant diseases, suggests treatments, and supports urban agriculture. Connects users with agro-vet professionals. Top 5 Finalist in ICT Award 2024 under Rising Star Innovation.",
    githubUrl: "https://github.com/ToniBirat7/Baali-Bigyan",
    techStack: ["Python", "Django", "Deep Learning", "ResNet50", "Computer Vision"],
    icon: "fas fa-leaf",
  },
];

export const executionLogs = {
  "matchvision": [
    "> Initializing Airflow DAG...",
    "> Connecting to MariaDB Cluster...",
    "> Loading DVC tracked model...",
    "> Fetching real-time odds via DRF...",
    "> System: Optimal. Predictions live."
  ],
  "rag-system": [
    "> Connecting to Weaviate Vector DB...",
    "> Loading LangChain Embeddings...",
    "> Initializing PDF Ingestion Engine...",
    "> Setting up Redis cache...",
    "> RAG Pipeline: Ready for queries."
  ],
  "nuclei-segmentation": [
    "> Loading TensorFlow weights (U-Net)...",
    "> Initializing OpenCV image pipeline...",
    "> Normalizing microscopy dataset...",
    "> Running inference on nuclei detection...",
    "> IoU Score: 0.88. Segmentation complete."
  ],
  "screen-recording": [
    "> Initializing Better Auth session...",
    "> Connecting to Bunny.net CDN...",
    "> Loading AI transcription engine...",
    "> Syncing metadata with Drizzle ORM...",
    "> Status: Online. Recording interface ready."
  ],
  "steganography": [
    "> Establishing WebSocket connection...",
    "> Initializing bit-shifting encryption...",
    "> Connecting to Image API...",
    "> Security: E2EE enabled.",
    "> Chat: Listening for hidden messages."
  ],
  "ams-cv": [
    "> Activating Camera Feed...",
    "> Loading ResNet50 Face Encoding...",
    "> Fetching student registration DB...",
    "> Matching faces in real-time...",
    "> Status: 98.5% Accuracy. Logging attendance."
  ],
  "ams-web": [
    "> Connecting to Django Backend...",
    "> Fetching department records...",
    "> Generating attendance reports...",
    "> Status: Operational."
  ],
  "hospital-mgmt": [
    "> Initializing Tkinter UI...",
    "> Connecting to SQLite database...",
    "> Integrating ChatGPT API illness detection...",
    "> Ready: Hospital environment stable."
  ],
  "baali-bigyan": [
    "> Loading ResNet50 Plant Disease Model...",
    "> Initializing Agro-vet matching engine...",
    "> Analyzing leaf symptoms...",
    "> Diagnosis: Early Blight detection active.",
    "> ICT Award Status: Finalist Confirmed."
  ]
};
