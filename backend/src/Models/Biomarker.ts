export class Biomarker {
  private _id: number;
  private _name: string;
  private _measurementUnit: string;

  constructor(id: number, name: string, measurementUnit: string) {
    this._id = id;
    this._measurementUnit = measurementUnit;
    this._name = name;
  }

  get id(): number {
    return this._id;
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
  set id(id: number) {
    this._id = id;
  }
}
