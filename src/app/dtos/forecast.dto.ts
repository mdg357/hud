import { WeatherTypeDto } from './weatherType.dto';

export class ForecastDto {
  constructor(dateString: string, dayText: string, defaultText: string) {
    this.date = dateString;
    this.dayText = dayText;
    this.icon = defaultText;
    this.weatherId = null;

    this.minimumTemperatures = new Array<number>();
    this.maximumTemperatures = new Array<number>();
    this.weatherTypes = new Array<WeatherTypeDto>();
  }

  public date: string;
  public dayText: string;
  public icon: string;
  public weatherId: number;

  private minimumTemperatures: number[];
  private maximumTemperatures: number[];
  private weatherTypes: WeatherTypeDto[];

  public addWeatherType(type: number) {
    let existingWeatherType = this.weatherTypes.filter((entry) => {
      return entry.type === type;
    });

    if (existingWeatherType.length === 1) {
      existingWeatherType[0].AddOccurence();
    } else {
      this.weatherTypes.push(new WeatherTypeDto(type));
    }

    this.weatherId = this.getMostPrevalentWeatherType();
  }

  private getMostPrevalentWeatherType(): number {
    if (this.weatherTypes.length === 0) {
      return null;
    } else if (this.weatherTypes.length === 1) {
      return this.weatherTypes[0].type;
    } else {
      let max = Math.max(...this.weatherTypes.map((item) => { return item.count; }));
      return this.weatherTypes.filter((item) => { return item.count === max; })[0].type;
    }
  }

  public addMinimumTemperatures(temperature: number) {
    this.minimumTemperatures.push(temperature);
  }

  public addMaximumTemperatures(temperature: number) {
    this.maximumTemperatures.push(temperature);
  }

  public get minimumTemperature(): number {
    return this.minimumTemperatures.length > 0
      ? Math.round(Math.min(...this.minimumTemperatures))
      : null;
  }

  public get maximumTemperature(): number {
    return this.maximumTemperatures.length > 0
      ? Math.round(Math.max(...this.maximumTemperatures))
      : null;
  }

  public get valid(): boolean {
    return this.maximumTemperatures.length > 0
      && this.minimumTemperatures.length > 0
      && this.weatherTypes.length > 0;
  }
}
