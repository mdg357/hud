import { Component, Input, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { WeatherFunctions } from './weather-functions.component';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

@Component({
    selector: 'weather-current',
    templateUrl: 'app/weather-current.component.html',
    providers: [WeatherFunctions]
})

export class WeatherCurrentComponent {
    componentName: 'WeatherCurrentComponent';

    private _weatherApiKey: string = '';

    private _refreshInterval: number = 1000 * 60 * 30; // 30 minutes;
    private _cityId: string = '5074472';

    public sunriseTime: string = null;
    public sunsetTime: string = null;
    public weatherId: string = null;
    public latitude: string = null;
    public longitude: string = null;
    public temperature: number = null;
    public icon: string = null;

    constructor(private _http: Http, private _weatherFunctions: WeatherFunctions) {
        this.icon = this._weatherFunctions.getWeatherIcon(null, null, null);

        // Update the weather, then update it every 1 second thereafter
        this.getCurrentWeather();
        let timer = Observable.interval(this._refreshInterval);
        timer.subscribe(this.getCurrentWeather);
    }

    private getCurrentWeatherUrl = function() {
        return 'http://api.openweathermap.org/data/2.5/weather?id='
            + this._cityId + '&APPID='
            + this._weatherApiKey + '&units=imperial';
    };

    private getSunriseSunsetUrl = function(latitude, longitude) {
        return 'http://api.sunrise-sunset.org/json?lat='
            + latitude + '&lng=' + longitude + '&date=today';
    };

    private getCurrentWeather = function() {
        if (this._weatherApiKey === '' || this._cityId === '') {
            console.log('Weather API Key or City ID not set');
            console.log('Weather API Key: ' + this._weatherApiKey);
            console.log('City Id: ' + this._cityId);
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
