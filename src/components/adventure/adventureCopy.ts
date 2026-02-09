import type { AdventureLanguage } from "@/components/adventure/AdventureGame";

export const ADVENTURE_COPY: Record<AdventureLanguage, {
  title: string;
  subtitle: string;
  familyNameLabel: string;
  playersLabel: string;
  playerNamePlaceholder: string;
  playerRoleLabel: string;
  addPlayer: string;
  removePlayer: string;
  startAdventure: string;
  mapTitle: string;
  nextCheckpoint: string;
  startCheckpoint: string;
  continueCheckpoint: string;
  checkpointLabel: string;
  timerHint: string;
  openVideo: string;
  successQuestion: string;
  successButton: string;
  retryButton: string;
  continueToMap: string;
  celebration: string;
  finishTitle: string;
  finishSubtitle: string;
  completedLabel: string;
  pointsLabel: string;
  skillsUsed: string;
  sharePrompt: string;
  copyButton: string;
  copiedLabel: string;
  emailPlaceholderTitle: string;
  emailPlaceholderBody: string;
  downloadLink: string;
  reset: string;
  languageLabel: string;
  mapHint: string;
  backToMap: string;
  currentCheckpoint: string;
  selectedDifficulty: string;
  juniorLabel: string;
  proLabel: string;
  videoFallback: string;
  startHint: string;
}> = {
  fi: {
    title: "Geegon Perheseikkailu",
    subtitle: "Kymmenen minuutin yhteinen hetki. Kuusi rastia. Paljon naurua.",
    familyNameLabel: "Perheen nimi",
    playersLabel: "Pelaajat",
    playerNamePlaceholder: "Nimi",
    playerRoleLabel: "Rooli",
    addPlayer: "Lisää pelaaja",
    removePlayer: "Poista",
    startAdventure: "Aloita seikkailu",
    mapTitle: "Seikkailukartta",
    nextCheckpoint: "Seuraava rasti",
    startCheckpoint: "Aloita seikkailu",
    continueCheckpoint: "Jatka seuraavaan rastiin",
    checkpointLabel: "Rasti",
    timerHint: "Tämä rasti: noin 60–90 sek.",
    openVideo: "Avaa video",
    successQuestion: "Onnistuitteko?",
    successButton: "✅ Onnistuttiin",
    retryButton: "🔁 Yritetään uudelleen",
    continueToMap: "Jatka kartalle",
    celebration: "Nice! Seuraava rasti odottaa.",
    finishTitle: "Seikkailu valmis!",
    finishSubtitle: "Huippuhetki yhdessä – tallessa muistoihin.",
    completedLabel: "Suoritettu",
    pointsLabel: "Pisteet",
    skillsUsed: "Käytetyt taidot",
    sharePrompt: "Jaa perhehetki",
    copyButton: "Kopioi teksti",
    copiedLabel: "Kopioitu",
    emailPlaceholderTitle: "Mailchimp-lomake",
    emailPlaceholderBody: "Sähköpostin keruu lisätään tähän.",
    downloadLink: "Lataa sovellus",
    reset: "Aloita alusta",
    languageLabel: "Kieli",
    mapHint: "Valmiina seuraavaan rastiin?",
    backToMap: "Takaisin kartalle",
    currentCheckpoint: "Nyt",
    selectedDifficulty: "Valittu taso",
    juniorLabel: "JUNIOR",
    proLabel: "PRO",
    videoFallback: "Video lisätään pian.",
    startHint: "Anna perheelle nimi aloittaaksesi.",
  },
  sv: {
    title: "Geegos Familjeäventyr",
    subtitle: "Tio minuter tillsammans. Sex stationer. Massor av skratt.",
    familyNameLabel: "Familjenamn",
    playersLabel: "Spelare",
    playerNamePlaceholder: "Namn",
    playerRoleLabel: "Roll",
    addPlayer: "Lägg till spelare",
    removePlayer: "Ta bort",
    startAdventure: "Starta äventyret",
    mapTitle: "Äventyrskarta",
    nextCheckpoint: "Nästa station",
    startCheckpoint: "Starta äventyret",
    continueCheckpoint: "Till nästa station",
    checkpointLabel: "Station",
    timerHint: "Den här stationen: ca 60–90 sek.",
    openVideo: "Öppna video",
    successQuestion: "Lyckades ni?",
    successButton: "✅ Vi klarade det",
    retryButton: "🔁 Försök igen",
    continueToMap: "Till kartan",
    celebration: "Snyggt! Nästa station väntar.",
    finishTitle: "Äventyret klart!",
    finishSubtitle: "En fin stund tillsammans – sparad i minnet.",
    completedLabel: "Genomfört",
    pointsLabel: "Poäng",
    skillsUsed: "Färdigheter",
    sharePrompt: "Dela familjestunden",
    copyButton: "Kopiera text",
    copiedLabel: "Kopierat",
    emailPlaceholderTitle: "Mailchimp-formulär",
    emailPlaceholderBody: "E-postinsamling läggs till här.",
    downloadLink: "Ladda ner appen",
    reset: "Börja om",
    languageLabel: "Språk",
    mapHint: "Redo för nästa station?",
    backToMap: "Tillbaka till kartan",
    currentCheckpoint: "Nu",
    selectedDifficulty: "Vald nivå",
    juniorLabel: "JUNIOR",
    proLabel: "PRO",
    videoFallback: "Video kommer snart.",
    startHint: "Ge familjen ett namn för att börja.",
  },
  en: {
    title: "Geego Family Adventure",
    subtitle: "Ten minutes together. Six checkpoints. Lots of laughs.",
    familyNameLabel: "Family name",
    playersLabel: "Players",
    playerNamePlaceholder: "Name",
    playerRoleLabel: "Role",
    addPlayer: "Add player",
    removePlayer: "Remove",
    startAdventure: "Start adventure",
    mapTitle: "Adventure map",
    nextCheckpoint: "Next checkpoint",
    startCheckpoint: "Start adventure",
    continueCheckpoint: "Go to next checkpoint",
    checkpointLabel: "Checkpoint",
    timerHint: "This checkpoint: about 60–90 sec.",
    openVideo: "Open video",
    successQuestion: "Did you make it?",
    successButton: "✅ We did it",
    retryButton: "🔁 Try again",
    continueToMap: "Back to map",
    celebration: "Nice! Next checkpoint awaits.",
    finishTitle: "Adventure complete!",
    finishSubtitle: "A great shared moment – saved to memory.",
    completedLabel: "Completed",
    pointsLabel: "Points",
    skillsUsed: "Skills used",
    sharePrompt: "Share the family moment",
    copyButton: "Copy text",
    copiedLabel: "Copied",
    emailPlaceholderTitle: "Mailchimp form",
    emailPlaceholderBody: "Email capture will be added here.",
    downloadLink: "Download the app",
    reset: "Start over",
    languageLabel: "Language",
    mapHint: "Ready for the next checkpoint?",
    backToMap: "Back to map",
    currentCheckpoint: "Now",
    selectedDifficulty: "Selected level",
    juniorLabel: "JUNIOR",
    proLabel: "PRO",
    videoFallback: "Video coming soon.",
    startHint: "Give your family a name to start.",
  },
};

export const getAdventureCopy = (language: AdventureLanguage) =>
  ADVENTURE_COPY[language] ?? ADVENTURE_COPY.fi;

export const buildShareText = (language: AdventureLanguage, pointsTotal: number) => {
  switch (language) {
    case "sv":
      return `Vårt familjeäventyr är klart! Poäng: ${pointsTotal}.`;
    case "en":
      return `Our family adventure is complete! Points: ${pointsTotal}.`;
    case "fi":
    default:
      return `Meidän perheen Perheseikkailu on valmis! Pisteet: ${pointsTotal}.`;
  }
};
