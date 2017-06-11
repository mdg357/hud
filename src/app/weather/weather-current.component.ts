import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { WeatherFunctions } from './weather-functions.component';
import { Observable } from 'rxjs/Rx';

import { SettingsService } from '../services/settings.service';
import { WeatherSettingsDto } from '../dtos/weatherSettings.dto';

@Component({
    selector: 'weather-current',
    templateUrl: './weather-current.component.html',
    providers: [WeatherFunctions]
})

export class WeatherCurrentComponent implements OnInit {
    constructor(private _http: Http,
        private _weatherFunctions: WeatherFunctions,
        private _settingsService: SettingsService) {
        this.icon = this._weatherFunctions.getWeatherIcon(null, null, null);
    }

    private _weatherSettings: WeatherSettingsDto;

    public sunriseTime: string = null;
    public sunsetTime: string = null;
    public weatherId: string = null;
    public latitude: string = null;
    public longitude: string = null;
    public temperature: number = null;
    public icon: string = null;
    public errorMessage: any = null;

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

        // Update the current weather, then update it every 30 minutes thereafter
        this.getCurrentWeather();
        let timer = Observable.interval(this._weatherSettings.currentRefreshInterval);
        timer.subscribe(this.getCurrentWeather);
    }

    public buildCurrentWeatherUrl(): string {
        return this._weatherSettings.currentUrl + '?id='
            + this._weatherSettings.cityId + '&APPID='
            + this._weatherSettings.apiKey + '&units=imperial';
    };

    public buildSunriseSunsetUrl(latitude: string, longitude: string): string {
        return this._weatherSettings.sunriseSunsetUrl + '?lat=' + latitude + '&lng=' + longitude + '&date=today';
    };

    private getCurrentWeather() {
        if (!this._weatherSettings) {
            console.error('Weather API Key or City ID not set');
            return false;
        }

        this._http.get(this.buildCurrentWeatherUrl())
            .map((res: Response) => res.json())
            .subscribe(
                data => {
                    this.weatherId = data.weather[0].id;
                    this.latitude = data.coord.lat;
                    this.longitude = data.coord.lon;
                    this.temperature = Math.round(data.main.temp);
                    this.icon = this._weatherFunctions.getWeatherIcon(data.weather[0].id, null, null);
                },
                err => console.error(err)
            );

        if (this.sunriseTime === null || this.sunsetTime === null) {
            this._http.get(this.buildSunriseSunsetUrl(this.latitude, this.longitude))
                .map((res: Response) => res.json())
                .subscribe(
                    data => {
                        this.sunriseTime = data.results.sunrise;
                        this.sunsetTime = data.results.sunset;
                    },
                    err => console.error(err)
                );
        }
    };
}
