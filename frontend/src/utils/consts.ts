import { ICrisisAlertEntity } from "../common/Entities/ICrisisAlertEntity";
import { AsthmaAttackSeverity } from "../common/store/types/TReceivedDataState";

export const CrisisAlertEntity: Record<
  AsthmaAttackSeverity,
  ICrisisAlertEntity
> = {
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
