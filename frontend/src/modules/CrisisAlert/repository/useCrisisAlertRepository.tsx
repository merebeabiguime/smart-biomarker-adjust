import { receivedDataActions } from "../../../common/store/receivedDataSlice";
import { useAppDispatch } from "../../../common/store/redux";
import { AsthmaAttackSeverity } from "../../../common/store/types/TReceivedDataState";
import { CrisisAlertEntity } from "../../../utils/consts";

export default function useCrisisAlertRepository() {
  const dispatch = useAppDispatch();
  const onSetCrisisAlert = (status: AsthmaAttackSeverity) => {
    switch (status) {
      case AsthmaAttackSeverity.SEVERE: {
        CrisisAlertEntity;
        dispatch(
          receivedDataActions.setCrisisAlertEntity(CrisisAlertEntity.SEVERE)
        );
        break;
      }
      case AsthmaAttackSeverity.MODERATE: {
        dispatch(
          receivedDataActions.setCrisisAlertEntity(CrisisAlertEntity.MODERATE)
        );
        break;
      }
      case AsthmaAttackSeverity.INCOMING_ATTACK: {
        dispatch(
          receivedDataActions.setCrisisAlertEntity(
            CrisisAlertEntity.INCOMING_ATTACK
          )
        );
        break;
      }
      case AsthmaAttackSeverity.MILD:
      default: {
        dispatch(
          receivedDataActions.setCrisisAlertEntity(CrisisAlertEntity.MILD)
        );
        break;
      }
    }
  };

  return { onSetCrisisAlert };
}
