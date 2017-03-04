export class WeatherSettingsDto {
    constructor() {
    }

    public apiKey: string;
    public cityId: string;
    public forecastRefreshInterval: number;
    public currentRefreshInterval: number;
    public forecastUrl: string;
    public currentUrl: string;
    public sunriseSunsetUrl: string;
}
