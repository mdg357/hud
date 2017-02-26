export class WeatherTypeDto {
  constructor(type: number) {
    this.type = type;
    this.count = 1;
  }

  public type: number;
  public count: number;

  public AddOccurence() {
    this.count += 1;
  }
}
