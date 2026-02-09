import type { AdventureSkill } from "@/components/adventure/skillIconMap";

export type AdventureStop = {
  id: number;
  title: string;
  description: string;
  skill: AdventureSkill;
  videoSrc: string;
  points: number;
};

export const ADVENTURE_STOPS: AdventureStop[] = [
  {
    id: 1,
    title: "Tasapainosilta",
    description: "Ylitätte sillan ilman että se keikahtaa. Rauhallinen tasapaino tekee tehtävän.",
    skill: "tasapaino",
    videoSrc: "/videos/1.%20Näyttö%20särkyy%20FI.mp4",
    points: 20,
  },
  {
    id: 2,
    title: "Taikaportti",
    description: "Portti aukeaa vain, jos keho liikkuu isosti ja pehmeästi.",
    skill: "liikkuvuus",
    videoSrc: "/videos/2.mp4",
    points: 20,
  },
  {
    id: 3,
    title: "Rytmiluola",
    description: "Luola kuuntelee rytmiä. Pysykää tahdissa.",
    skill: "koordinaatio",
    videoSrc: "/videos/3.mp4",
    points: 20,
  },
  {
    id: 4,
    title: "Karhupolku",
    description: "Polku on matala. Vain karhut pääsevät läpi.",
    skill: "kehonhallinta",
    videoSrc: "/videos/4.mp4",
    points: 20,
  },
  {
    id: 5,
    title: "Voimakallio",
    description: "Kallio testaa, jaksaako perhe nousta ylös kuin sankarit.",
    skill: "voima",
    videoSrc: "/videos/5.mp4",
    points: 20,
  },
  {
    id: 6,
    title: "Yllätysarvoitus",
    description: "Viimeinen rasti on salainen. Teette sen yhdessä!",
    skill: "yllätys",
    videoSrc: "/videos/6.mp4",
    points: 20,
  },
];
