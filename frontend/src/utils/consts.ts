import { ICrisisAlertEntity } from "../common/Entities/ICrisisAlertEntity";
import { AsthmaAttackSeverity } from "../common/store/types/TReceivedDataState";

export const CrisisAlertEntity: Record<
  AsthmaAttackSeverity,
  ICrisisAlertEntity
> = {
  INCOMING_ATTACK: {
    fontColor: "",
    backgroundColor: "",
    message:
      "Signes physiologiques indiquant qu’une crise est sur le point de survenir, notamment une forte variation des biomarqueurs. L'inhalateur doit être utilisé en prévention avant l’apparition des symptômes sévères.",
  },
  MILD: {
    fontColor: "",
    backgroundColor: "",
    message: "Tout est bon ! ",
  },
  MODERATE: {
    fontColor: "",
    backgroundColor: "",
    message:
      "Crise modérée, Une intervention rapide avec un inhalateur est nécessaire, et une consultation médicale peut être requise si l'état ne s'améliore pas.",
  },
  SEVERE: {
    fontColor: "",
    backgroundColor: "",
    message:
      "Crise sévère nécessitant une attention médicale immédiate (urgence)",
  },
};
