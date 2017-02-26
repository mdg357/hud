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
var WeatherCurrentComponent = (function () {
    function WeatherCurrentComponent(_http, _weatherFunctions, _settingsService) {
        this._http = _http;
        this._weatherFunctions = _weatherFunctions;
        this._settingsService = _settingsService;
        this._refreshInterval = 1000 * 60 * 30; // 30 minutes;
        this._weatherSettings = null;
        this.sunriseTime = null;
        this.sunsetTime = null;
        this.weatherId = null;
        this.latitude = null;
        this.longitude = null;
        this.temperature = null;
        this.icon = null;
        this.errorMessage = null;
        this.icon = this._weatherFunctions.getWeatherIcon(null, null, null);
    }
    WeatherCurrentComponent.prototype.ngOnInit = function () {
        if (!this._weatherSettings) {
            this.getApiSettings();
        }
    };
    WeatherCurrentComponent.prototype.getApiSettings = function () {
        var _this = this;
        this._settingsService.getWeatherSettings()
            .subscribe(function (settings) { return _this.setupTimer(settings); }, function (error) { return _this.errorMessage = error; });
    };
    WeatherCurrentComponent.prototype.setupTimer = function (settings) {
        this._weatherSettings = settings;
        // Update the current weather, then update it every 30 minutes thereafter
        this.getCurrentWeather();
        var timer = Rx_1.Observable.interval(this._refreshInterval);
        timer.subscribe(this.getCurrentWeather);
    };
    WeatherCurrentComponent.prototype.getCurrentWeatherUrl = function () {
        return 'http://api.openweathermap.org/data/2.5/weather?id='
            + this._weatherSettings.CityId + '&APPID='
            + this._weatherSettings.ApiKey + '&units=imperial';
    };
    ;
    WeatherCurrentComponent.prototype.getSunriseSunsetUrl = function (latitude, longitude) {
        return 'http://api.sunrise-sunset.org/json?lat='
            + latitude + '&lng=' + longitude + '&date=today';
    };
    ;
    WeatherCurrentComponent.prototype.getCurrentWeather = function () {
        var _this = this;
        if (!this._weatherSettings) {
            console.log('Weather API Key or City ID not set');
            return false;
        }
        this._http.get(this.getCurrentWeatherUrl())
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.weatherId = data.weather[0].id;
            _this.latitude = data.coord.lat;
            _this.longitude = data.coord.lon;
            _this.temperature = Math.round(data.main.temp);
            _this.icon = _this._weatherFunctions.getWeatherIcon(data.weather[0].id, null, null);
        }, function (err) { return console.error(err); });
        if (this.sunriseTime === null || this.sunsetTime === null) {
            this._http.get(this.getSunriseSunsetUrl(this.latitude, this.longitude))
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.sunriseTime = data.results.sunrise;
                _this.sunsetTime = data.results.sunset;
            }, function (err) { return console.error(err); });
        }
    };
    ;
    WeatherCurrentComponent = __decorate([
        core_1.Component({
            selector: 'weather-current',
            templateUrl: './weather-current.component.html',
            providers: [weather_functions_component_1.WeatherFunctions]
        }), 
        __metadata('design:paramtypes', [http_1.Http, weather_functions_component_1.WeatherFunctions, settings_service_1.SettingsService])
    ], WeatherCurrentComponent);
    return WeatherCurrentComponent;
}());
exports.WeatherCurrentComponent = WeatherCurrentComponent;
//# sourceMappingURL=weather-current.component.js.map