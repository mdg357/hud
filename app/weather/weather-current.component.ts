import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { WeatherFunctions } from './weather-functions.component';
import { Observable } from 'rxjs/Rx';

import { SettingsService } from '../services/settings.service';

@Component({
    selector: 'weather-current',
    templateUrl: 'app/weather/weather-current.component.html',
    providers: [WeatherFunctions]
})

export class WeatherCurrentComponent {
    componentName: 'WeatherCurrentComponent';

    private _refreshInterval: number = 1000 * 60 * 30; // 30 minutes;
    private _weatherSettings: any = null;

    public sunriseTime: string = null;
    public sunsetTime: string = null;
    public weatherId: string = null;
    public latitude: string = null;
    public longitude: string = null;
    public temperature: number = null;
    public icon: string = null;
    public errorMessage: any = null;

    constructor(private _http: Http,
        private _weatherFunctions: WeatherFunctions,
        private _settingsService: SettingsService) {
        this.icon = this._weatherFunctions.getWeatherIcon(null, null, null);
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

        // Update the current weather, then update it every 30 minutes thereafter
        this.getCurrentWeather();
        let timer = Observable.interval(this._refreshInterval);
        timer.subscribe(this.getCurrentWeather);
    }

    private getCurrentWeatherUrl() {
        return 'http://api.openweathermap.org/data/2.5/weather?id='
            + this._weatherSettings.CityId + '&APPID='
            + this._weatherSettings.ApiKey + '&units=imperial';
    };

    private getSunriseSunsetUrl(latitude, longitude) {
        return 'http://api.sunrise-sunset.org/json?lat='
            + latitude + '&lng=' + longitude + '&date=today';
    };

    private getCurrentWeather() {
        if (!this._weatherSettings) {
            console.log('Weather API Key or City ID not set');
            return false;
        }

        this._http.get(this.getCurrentWeatherUrl())
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
            this._http.get(this.getSunriseSunsetUrl(this.latitude, this.longitude))
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
