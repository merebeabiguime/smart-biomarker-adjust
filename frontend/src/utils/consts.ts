import { IBiomarkerEntity } from "../common/Entities/IBiomarkerEntity";
import { ICrisisAlertEntity } from "../common/Entities/ICrisisAlertEntity";
import { BiomarkerStatus } from "../common/store/types/TReceivedDataState";

export const CrisisAlertEntity: Record<BiomarkerStatus, ICrisisAlertEntity> = {
  INCOMING_ATTACK: {
    fontColor: "white",
    backgroundColor: "#b22a00",
    message:
      "Signes physiologiques indiquant qu’une crise est sur le point de survenir, notamment une forte variation des biomarqueurs. L'inhalateur doit être utilisé en prévention avant l’apparition des symptômes sévères.",
  },
  MILD: {
    fontColor: "white",
    backgroundColor: "#52b202",
    message: "Tout est bon ! ",
  },
  MODERATE: {
    fontColor: "white",
    backgroundColor: "#ff9100",
    message:
      "Crise modérée, Une intervention rapide avec un inhalateur est nécessaire, et une consultation médicale peut être requise si l'état ne s'améliore pas.",
  },
  SEVERE: {
    fontColor: "white",
    backgroundColor: "#b22a00",
    message:
      "Crise sévère nécessitant une attention médicale immédiate (urgence)",
  },
};

export const BiomarkerTypes: { [key: string]: IBiomarkerEntity } = {
  SPIROMETRE: {
    name: "Débit expiratoire de pointe",
    measurementUnit: "%",
  },
  OXYGEN_SATURATION: { name: "Saturation en oxygène", measurementUnit: "%" },
  BEATHING_FREQUENCY: {
    name: "Fréquence de toux",
    measurementUnit: "répétition/min",
  },
};
