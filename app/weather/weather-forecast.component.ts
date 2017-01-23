import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { WeatherFunctions } from './weather-functions.component';
import { Observable } from 'rxjs/Rx';

import { SettingsService } from '../services/settings.service';

@Component({
    selector: 'weather-forecast',
    templateUrl: 'app/weather/weather-forecast.component.html',
    providers: [WeatherFunctions]
})

export class WeatherForecastComponent {
    componentName: 'WeatherForecastComponent';

    private _refreshInterval: number = 1000 * 60 * 60 * 12; // 12 hours
    private _weatherSettings: any = null;

    public forecasts: any;
    public errorMessage: any = null;

    constructor(private _http: Http,
        private _weatherFunctions: WeatherFunctions,
        private _settingsService: SettingsService) {
    }

    ngOnInit() {
        if (!this._weatherSettings) {
            this.getApiSettings();
        }
    }

    private getApiSettings() {
        this._settingsService.getWeatherSettings()
            .subscribe(
                settings => this.setupTimer(settings),
                error => this.errorMessage = <any>error);
    }

    private setupTimer (settings: string[]) {
        this._weatherSettings = settings;

        // Update the weather forecast, then update it every 12 hours thereafter
        this.getForecastWeather();
        let timer = Observable.interval(this._refreshInterval);
        timer.subscribe(data => this.getForecastWeather());
    }

    private getForecastWeatherUrl(): string {
        return 'http://api.openweathermap.org/data/2.5/forecast/city?id='
            + this._weatherSettings.CityId + '&APPID='
            + this._weatherSettings.ApiKey + '&units=imperial';
    };

    private getForecastWeather() {
        if (!this._weatherSettings) {
            console.log('Weather API Key or City ID not set');
            return false;
        }

        this._http.get(this.getForecastWeatherUrl())
            .map((res: Response) => res.json())
            .subscribe(
                data => {
                    this.forecasts = this._weatherFunctions.interpretForecastData(data.list);
                },
                err => console.error(err)
            );
    };
}
