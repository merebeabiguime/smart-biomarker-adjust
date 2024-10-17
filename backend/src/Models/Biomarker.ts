export class Biomarker {
  private _name: string;
  private _measurementUnit: string;

  constructor(name: string, measurementUnit: string) {
    this._measurementUnit = measurementUnit;
    this._name = name;
  }

  get name(): string {
    return this._name;
  }
  get measurementUnit(): string {
    return this._measurementUnit;
  }
  set name(name: string) {
    this._name = name;
  }
  set measurementUnit(measurementUnit: string) {
    this.measurementUnit = measurementUnit;
  }
}
