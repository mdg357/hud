"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var weather_functions_component_1 = require('./weather-functions.component');
var Rx_1 = require('rxjs/Rx');
var settings_service_1 = require('../services/settings.service');
var WeatherForecastComponent = (function () {
    function WeatherForecastComponent(_http, _weatherFunctions, _settingsService) {
        this._http = _http;
        this._weatherFunctions = _weatherFunctions;
        this._settingsService = _settingsService;
        this._refreshInterval = 1000 * 60 * 60 * 12; // 12 hours
        this._weatherSettings = null;
        this.errorMessage = null;
    }
    WeatherForecastComponent.prototype.ngOnInit = function () {
        if (!this._weatherSettings) {
            this.getApiSettings();
        }
    };
    WeatherForecastComponent.prototype.getApiSettings = function () {
        var _this = this;
        this._settingsService.getWeatherSettings()
            .subscribe(function (settings) { return _this.setupTimer(settings); }, function (error) { return _this.errorMessage = error; });
    };
    WeatherForecastComponent.prototype.setupTimer = function (settings) {
        var _this = this;
        this._weatherSettings = settings;
        // Update the weather forecast, then update it every 12 hours thereafter
        this.getForecastWeather();
        var timer = Rx_1.Observable.interval(this._refreshInterval);
        timer.subscribe(function (data) { return _this.getForecastWeather(); });
    };
    WeatherForecastComponent.prototype.getForecastWeatherUrl = function () {
        return 'http://api.openweathermap.org/data/2.5/forecast/city?id='
            + this._weatherSettings.CityId + '&APPID='
            + this._weatherSettings.ApiKey + '&units=imperial';
    };
    ;
    WeatherForecastComponent.prototype.getForecastWeather = function () {
        var _this = this;
        if (!this._weatherSettings) {
            console.log('Weather API Key or City ID not set');
            return false;
        }
        this._http.get(this.getForecastWeatherUrl())
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.forecasts = _this._weatherFunctions.interpretForecastData(data.list);
        }, function (err) { return console.error(err); });
    };
    ;
    WeatherForecastComponent = __decorate([
        core_1.Component({
            selector: 'weather-forecast',
            templateUrl: './weather-forecast.component.html',
            providers: [weather_functions_component_1.WeatherFunctions]
        }), 
        __metadata('design:paramtypes', [http_1.Http, weather_functions_component_1.WeatherFunctions, settings_service_1.SettingsService])
    ], WeatherForecastComponent);
    return WeatherForecastComponent;
}());
exports.WeatherForecastComponent = WeatherForecastComponent;
//# sourceMappingURL=weather-forecast.component.js.map