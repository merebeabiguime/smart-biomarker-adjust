import { Biomarker } from "./Biomarker";

export class BiomarkerMeasurement {
  private _hour: Date;
  private _value: number;
  private _biomarker: Biomarker;

  constructor(hour: Date, value: number, biomarker: Biomarker) {
    this._biomarker = biomarker;
    this._hour = hour;
    this._value = value;
  }

  get hour(): Date {
    return this._hour;
  }

  set hour(hour: Date) {
    this._hour = hour;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

  get biomarker(): Biomarker {
    return this._biomarker;
  }

  set biomarker(biomarker: Biomarker) {
    this._biomarker = biomarker;
  }
}
