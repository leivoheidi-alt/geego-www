export type Difficulty = "junior" | "pro";
export type Skill =
  | "tasapaino"
  | "koordinaatio"
  | "liikkuvuus"
  | "voima"
  | "kehonhallinta"
  | "nopeus"
  | "yllätys";

export type AdventureTask = {
  checkpointIndex: number;
  checkpointType: "basic" | "pro" | "surprise";
  skill: Skill;
  title: string;
  storyLine: string;
  junior: {
    title: string;
    instructions: string[];
    videoSrc: string;
    points: number;
  };
  pro: {
    title: string;
    instructions: string[];
    videoSrc: string;
    points: number;
  };
};

export const ADVENTURE_TASKS: AdventureTask[] = [
  {
    checkpointIndex: 1,
    checkpointType: "basic",
    skill: "tasapaino",
    title: "Tasapainosilta",
    storyLine: "Ylitätte sillan ilman että se ‘keikahtaa’.",
    junior: {
      title: "Patsas",
      instructions: [
        "Seiso yhdellä jalalla kymmenen sekuntia.",
        "Katse eteen ja hengitä rauhassa.",
      ],
      videoSrc: "/videos/fi/01_tasapaino_junior.mp4",
      points: 10,
    },
    pro: {
      title: "Patsas + silmät",
      instructions: [
        "Seiso yhdellä jalalla ja sulje silmät kolmeksi sekunniksi.",
        "Avaa silmät ja pidä tasapaino loppuun.",
      ],
      videoSrc: "/videos/fi/01_tasapaino_pro.mp4",
      points: 15,
    },
  },
  {
    checkpointIndex: 2,
    checkpointType: "basic",
    skill: "liikkuvuus",
    title: "Taikaportti",
    storyLine: "Portti aukeaa vain, jos keho liikkuu isosti ja pehmeästi.",
    junior: {
      title: "Tähtitaivutus",
      instructions: [
        "Kurota käsi ylös ja taivu kevyesti sivulle.",
        "Vaihda puolta rauhassa.",
      ],
      videoSrc: "/videos/fi/02_liikkuvuus_junior.mp4",
      points: 10,
    },
    pro: {
      title: "Syvä sivukurotus",
      instructions: [
        "Taivu pidemmälle sivulle ja pysy siellä viisi sekuntia.",
        "Vaihda puolta ja tee sama.",
      ],
      videoSrc: "/videos/fi/02_liikkuvuus_pro.mp4",
      points: 15,
    },
  },
  {
    checkpointIndex: 3,
    checkpointType: "basic",
    skill: "koordinaatio",
    title: "Rytmiluola",
    storyLine: "Luola kuuntelee rytmiä. Pysykää tahdissa.",
    junior: {
      title: "Ristiin taputukset",
      instructions: [
        "Taputa: oikea käsi vasempaan polveen, sitten vaihto.",
        "Jatka rauhallisella rytmillä.",
      ],
      videoSrc: "/videos/fi/03_koordinaatio_junior.mp4",
      points: 10,
    },
    pro: {
      title: "Ristiin + askel",
      instructions: [
        "Ristiin taputus ja sivuaskel joka toisella kerralla.",
        "Pidä rytmi tasaisena.",
      ],
      videoSrc: "/videos/fi/03_koordinaatio_pro.mp4",
      points: 15,
    },
  },
  {
    checkpointIndex: 4,
    checkpointType: "basic",
    skill: "kehonhallinta",
    title: "Karhupolku",
    storyLine: "Polku on matala. Vain karhut pääsevät läpi.",
    junior: {
      title: "Karhukävely",
      instructions: [
        "Kävele kuin karhu hitaasti eteenpäin.",
        "Pidä polvet irti lattiasta.",
      ],
      videoSrc: "/videos/fi/04_kehonhallinta_junior.mp4",
      points: 10,
    },
    pro: {
      title: "Karhu + pysähdykset",
      instructions: [
        "Karhukävele ja pysähdy kolme kertaa ‘pause’.",
        "Pysy tiukkana ja jatka.",
      ],
      videoSrc: "/videos/fi/04_kehonhallinta_pro.mp4",
      points: 15,
    },
  },
  {
    checkpointIndex: 5,
    checkpointType: "pro",
    skill: "voima",
    title: "Voimakallio",
    storyLine: "Kallio testaa, jaksaako perhe nousta ylös kuin sankarit.",
    junior: {
      title: "Rauhalliset kyykyt",
      instructions: [
        "Tee viisi rauhallista kyykkyä.",
        "Kantapäät maassa.",
      ],
      videoSrc: "/videos/fi/05_voima_junior.mp4",
      points: 10,
    },
    pro: {
      title: "Kyykky + ponnistus",
      instructions: [
        "Tee kyykky ja pieni ponnistus ylös.",
        "Laskeudu pehmeästi.",
      ],
      videoSrc: "/videos/fi/05_voima_pro.mp4",
      points: 15,
    },
  },
  {
    checkpointIndex: 6,
    checkpointType: "surprise",
    skill: "yllätys",
    title: "Yllätysarvoitus",
    storyLine: "Viimeinen rasti on salainen. Teette sen yhdessä!",
    junior: {
      title: "Peililiike",
      instructions: [
        "Aikuinen tekee hitaita liikkeitä.",
        "Lapsi peilaa kuin peili.",
      ],
      videoSrc: "/videos/fi/06_yllatys_junior.mp4",
      points: 20,
    },
    pro: {
      title: "Peililiike turbo",
      instructions: [
        "Lisätkää rytmi: peilaa nopeammin mutta hallitusti.",
        "Vaihtakaa rooleja.",
      ],
      videoSrc: "/videos/fi/06_yllatys_pro.mp4",
      points: 20,
    },
  },
];
