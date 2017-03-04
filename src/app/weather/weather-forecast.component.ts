import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { WeatherFunctions } from './weather-functions.component';
import { Observable } from 'rxjs/Rx';

import { SettingsService } from '../services/settings.service';
import { WeatherSettingsDto } from '../dtos/weatherSettings.dto';

@Component({
    selector: 'weather-forecast',
    templateUrl: './weather-forecast.component.html',
    providers: [WeatherFunctions]
})

export class WeatherForecastComponent implements OnInit {
    constructor(private _http: Http,
        private _weatherFunctions: WeatherFunctions,
        private _settingsService: SettingsService) {
    }

    private _weatherSettings: WeatherSettingsDto;

    public forecasts: any;
    public errorMessage: any;

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

    private setupTimer (settings: WeatherSettingsDto) {
        this._weatherSettings = settings;

        // Update the weather forecast, then update it every 12 hours thereafter
        this.getForecastWeather();
        let timer = Observable.interval(this._weatherSettings.forecastRefreshInterval);
        timer.subscribe(data => this.getForecastWeather());
    }

    public buildForecastWeatherUrl(): string {
        return this._weatherSettings.forecastUrl + '?id='
            + this._weatherSettings.cityId + '&APPID='
            + this._weatherSettings.apiKey + '&units=imperial';
    };

    private getForecastWeather() {
        if (!this._weatherSettings) {
            console.error('Weather API Key or City ID not set');
            return false;
        }

        this._http.get(this.buildForecastWeatherUrl())
            .map((res: Response) => res.json())
            .subscribe(
                data => {
                    if (data.list) {
                        this.forecasts = this._weatherFunctions.interpretForecastData(data.list);
                    } else {
                        console.error(JSON.stringify(data));
                    }
                },
                err => console.error(err)
            );
    };
}
