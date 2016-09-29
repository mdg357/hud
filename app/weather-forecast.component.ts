import { Component, Input, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { WeatherFunctions } from './weather-functions.component';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

@Component({
    selector: 'weather-forecast',
    templateUrl: 'app/weather-forecast.component.html',
    providers: [WeatherFunctions]
})

export class WeatherForecastComponent {
    componentName: 'WeatherForecastComponent';

    private _weatherApiKey: string = '';

    private _refreshInterval: number = 1000 * 60 * 60 * 12; // 12 hours
    private _cityId: string = '5074472';

    public forecasts: any;

    constructor(private _http: Http, private _weatherFunctions: WeatherFunctions) {
        // Update the weather, then update it every 1 second thereafter
        this.getForecastWeather();
        let timer = Observable.interval(this._refreshInterval);
        timer.subscribe(this.getForecastWeather);
    }

    private getForecastWeatherUrl = function() {
        return 'http://api.openweathermap.org/data/2.5/forecast/city?id='
            + this._cityId + '&APPID=' + this._weatherApiKey + '&units=imperial';
    };

    private getForecastWeather = function() {
        if (this._weatherApiKey === '' || this._cityId === '') {
            console.log('Weather API Key or City ID not set');
            console.log('Weather API Key: ' + this._weatherApiKey);
            console.log('City Id: ' + this._cityId);
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
