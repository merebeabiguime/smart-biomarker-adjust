import { receivedDataActions } from "../../../common/store/receivedDataSlice";
import { useAppDispatch } from "../../../common/store/redux";
import { BiomarkerStatus } from "../../../common/store/types/TReceivedDataState";
import { CrisisAlertEntity } from "../../../utils/consts";

export default function useCrisisAlertRepository() {
  const dispatch = useAppDispatch();
  const onSetCrisisAlert = (status: BiomarkerStatus) => {
    switch (status) {
      case BiomarkerStatus.SEVERE: {
        dispatch(
          receivedDataActions.setCrisisAlertEntity(CrisisAlertEntity.SEVERE)
        );
        break;
      }
      case BiomarkerStatus.MODERATE: {
        dispatch(
          receivedDataActions.setCrisisAlertEntity(CrisisAlertEntity.MODERATE)
        );
        break;
      }
      case BiomarkerStatus.INCOMING_ATTACK: {
        dispatch(
          receivedDataActions.setCrisisAlertEntity(
            CrisisAlertEntity.INCOMING_ATTACK
          )
        );
        break;
      }
      case BiomarkerStatus.MILD:
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
