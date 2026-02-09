export type Difficulty = "easy" | "hard";
export type Skill = "tasapaino" | "koordinaatio" | "kehonhallinta" | "liikkuvuus" | "voima";

export type Task = {
  id: string;
  skill: Skill;
  difficulty: Difficulty;
  title: string;
  instructions: string[];
  videoSrc: string; // local path in /public/videos/...
};

export const TASKS: Task[] = [
  {
    id: "tasapaino-easy",
    skill: "tasapaino",
    difficulty: "easy",
    title: "Patsas",
    instructions: [
      "Seiso yhdellä jalalla kymmenen sekuntia.",
      "Katse eteen ja pysy rauhassa.",
    ],
    videoSrc: "/videos/tasapaino_easy.mp4",
  },
  {
    id: "tasapaino-hard",
    skill: "tasapaino",
    difficulty: "hard",
    title: "Patsas + kosketus",
    instructions: [
      "Seiso yhdellä jalalla ja kosketa vastakkaista polvea.",
      "Pidä tasapaino koko ajan.",
    ],
    videoSrc: "/videos/tasapaino_hard.mp4",
  },
  {
    id: "koordinaatio-easy",
    skill: "koordinaatio",
    difficulty: "easy",
    title: "Ristiin taputukset",
    instructions: [
      "Taputa käsiä ristiin: oikea käsi vasempaan polveen.",
      "Vaihda puolta ja jatka.",
    ],
    videoSrc: "/videos/koordinaatio_easy.mp4",
  },
  {
    id: "koordinaatio-hard",
    skill: "koordinaatio",
    difficulty: "hard",
    title: "Ristiin + hyppy",
    instructions: [
      "Tee ristiin taputus ja pieni hyppy väliin.",
      "Pidä rytmi tasaisena.",
    ],
    videoSrc: "/videos/koordinaatio_hard.mp4",
  },
  {
    id: "kehonhallinta-easy",
    skill: "kehonhallinta",
    difficulty: "easy",
    title: "Karhukävely",
    instructions: [
      "Kävele nelinkontin kuin karhu, hitaasti eteenpäin.",
      "Pidä polvet irti lattiasta.",
    ],
    videoSrc: "/videos/kehonhallinta_easy.mp4",
  },
  {
    id: "kehonhallinta-hard",
    skill: "kehonhallinta",
    difficulty: "hard",
    title: "Karhu + pysähdykset",
    instructions: [
      "Karhukävele ja pysähdy kolme kertaa kuin 'pause'.",
      "Pysy tiukkana ja jatka.",
    ],
    videoSrc: "/videos/kehonhallinta_hard.mp4",
  },
  {
    id: "liikkuvuus-easy",
    skill: "liikkuvuus",
    difficulty: "easy",
    title: "Tähtitaivutus",
    instructions: [
      "Seiso leveässä asennossa ja kurota käsi ylös.",
      "Taivu kevyesti sivulle ja vaihda puolta.",
    ],
    videoSrc: "/videos/liikkuvuus_easy.mp4",
  },
  {
    id: "liikkuvuus-hard",
    skill: "liikkuvuus",
    difficulty: "hard",
    title: "Syvä sivukurotus",
    instructions: [
      "Taivu pidemmälle sivulle ja hengitä rauhassa.",
      "Pidä selkä pitkä ja vaihda puolta.",
    ],
    videoSrc: "/videos/liikkuvuus_hard.mp4",
  },
  {
    id: "voima-easy",
    skill: "voima",
    difficulty: "easy",
    title: "Kyykky",
    instructions: [
      "Tee viisi rauhallista kyykkyä.",
      "Pidä kantapäät maassa.",
    ],
    videoSrc: "/videos/voima_easy.mp4",
  },
  {
    id: "voima-hard",
    skill: "voima",
    difficulty: "hard",
    title: "Kyykky + ponnistus",
    instructions: [
      "Tee kyykky ja pieni ponnistus ylös.",
      "Laskeudu pehmeästi ja jatka.",
    ],
    videoSrc: "/videos/voima_hard.mp4",
  },
];
