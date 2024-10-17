import GaugeBiomarker from "../../common/components/GaugeBiomarker/GaugeBiomarker";
import { BiomarkerTypes } from "../../utils/consts";

export default function OxygenStaturation() {
  return <GaugeBiomarker biomarker={BiomarkerTypes.OXYGEN_SATURATION} />;
}
