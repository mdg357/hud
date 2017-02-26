webpackJsonp([1,4],{

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingsService = (function () {
    function SettingsService(_http) {
        this._http = _http;
        this._settingsUrl = 'api/settings/settings.json';
    }
    SettingsService.prototype.getHabiticaSettings = function () {
        return this._http.get(this._settingsUrl)
            .map(function (response) { return response.json().habitica; })
            .catch(this.handleError);
    };
    SettingsService.prototype.getWeatherSettings = function () {
        return this._http.get(this._settingsUrl)
            .map(function (response) { return response.json().weather; })
            .catch(this.handleError);
    };
    SettingsService.prototype.handleError = function (error) {
        // In a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error');
    };
    SettingsService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object])
    ], SettingsService);
    return SettingsService;
    var _a;
}());
//# sourceMappingURL=settings.service.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeatherFunctions; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WeatherFunctions = (function () {
    function WeatherFunctions() {
        this._defaultWeatherIconIdDay = 0;
        this._defaultWeatherIconIdNight = 1;
        this._imagePath = 'assets/images/';
        this._weatherIconList = [
            { id: this._defaultWeatherIconIdDay, icon: '2.svg', description: 'default-day' },
            { id: this._defaultWeatherIconIdNight, icon: '3.svg', description: 'default-night' },
            { id: 200, icon: '27.svg', description: 'thunderstorm with light rain' },
            { id: 201, icon: '27.svg', description: 'thunderstorm with rain' },
            { id: 202, icon: '27.svg', description: 'thunderstorm with heavy rain' },
            { id: 210, icon: '27.svg', description: 'light thunderstorm' },
            { id: 211, icon: '27.svg', description: 'thunderstorm' },
            { id: 212, icon: '27.svg', description: 'heavy thunderstorm' },
            { id: 221, icon: '27.svg', description: 'ragged thunderstorm' },
            { id: 230, icon: '27.svg', description: 'thunderstorm with light drizzle' },
            { id: 231, icon: '27.svg', description: 'thunderstorm with drizzle' },
            { id: 232, icon: '27.svg', description: 'thunderstorm with heavy drizzle' },
            { id: 300, icon: '17.svg', description: 'light intensity drizzle' },
            { id: 301, icon: '17.svg', description: 'drizzle' },
            { id: 302, icon: '17.svg', description: 'heavy intensity drizzle' },
            { id: 310, icon: '17.svg', description: 'light intensity drizzle rain' },
            { id: 311, icon: '17.svg', description: 'drizzle rain' },
            { id: 312, icon: '17.svg', description: 'heavy intensity drizzle rain' },
            { id: 313, icon: '17.svg', description: 'shower rain and drizzle' },
            { id: 314, icon: '18.svg', description: 'heavy shower rain and drizzle' },
            { id: 321, icon: '17.svg', description: 'shower drizzle' },
            { id: 500, icon: '17.svg', description: 'light rain' },
            { id: 501, icon: '17.svg', description: 'moderate rain' },
            { id: 502, icon: '18.svg', description: 'heavy intensity rain' },
            { id: 503, icon: '18.svg', description: 'very heavy rain' },
            { id: 504, icon: '18.svg', description: 'extreme rain' },
            { id: 511, icon: '18.svg', description: 'freezing rain' },
            { id: 520, icon: '17.svg', description: 'light intensity shower rain' },
            { id: 521, icon: '17.svg', description: 'shower rain' },
            { id: 522, icon: '18.svg', description: 'heavy intensity shower rain' },
            { id: 531, icon: '22.svg', description: 'ragged shower rain' },
            { id: 600, icon: '22.svg', description: 'light snow' },
            { id: 601, icon: '22.svg', description: 'snow' },
            { id: 602, icon: '23.svg', description: 'heavy snow' },
            { id: 611, icon: '22.svg', description: 'sleet' },
            { id: 612, icon: '22.svg', description: 'shower sleet' },
            { id: 615, icon: '22.svg', description: 'light rain and snow' },
            { id: 616, icon: '22.svg', description: 'rain and snow' },
            { id: 620, icon: '22.svg', description: 'light shower snow' },
            { id: 621, icon: '22.svg', description: 'shower snow' },
            { id: 622, icon: '23.svg', description: 'heavy shower snow' },
            { id: 800, icon: '2.svg', description: 'clear sky' },
            { id: 801, icon: '2.svg', description: 'few clouds' },
            { id: 802, icon: '25.svg', description: 'scattered clouds' },
            { id: 803, icon: '25.svg', description: 'broken clouds' },
            { id: 804, icon: '25.svg', description: 'overcast clouds' },
            { id: 905, icon: '6.svg', description: 'windy' },
            { id: 906, icon: '24.svg', description: 'hail' },
            { id: 951, icon: '2.svg', description: 'calm' },
            { id: 741, icon: '13.svg', description: 'fog' }
        ];
        /// <summary>
        /// Get the weather icon based on the id and the time of day
        /// </summary>
        /// <param name=""></param>
        /// <returns></returns>
        this.getWeatherIcon = function (id, sunriseTime, sunsetTime) {
            var defaultIconIndex = (this.isDayTime(sunriseTime, sunsetTime) ? this._defaultWeatherIconIdDay : this._defaultWeatherIconIdNight);
            var icon = this._imagePath + this._weatherIconList[defaultIconIndex].icon;
            var description = this._weatherIconList[defaultIconIndex].description;
            var imagePath = 'assets/images/';
            if (id === undefined || id === null) {
                return icon;
            }
            this._weatherIconList.forEach(function (element) {
                if (element.id === id) {
                    icon = imagePath + element.icon;
                    description = element.description;
                    return false;
                }
            });
            return icon;
        };
        /// <summary>
        /// Check if the current time is between sunrise and sunset
        /// </summary>
        /// <param name=""></param>
        /// <returns>True, if it is currently daytime, False otherwise</returns>
        this.isDayTime = function (sunriseTime, sunsetTime) {
            if (sunriseTime !== null && sunsetTime !== null) {
                var formatting = 'h:mm:ss A';
                return (__WEBPACK_IMPORTED_MODULE_1_moment__["utc"]() >= __WEBPACK_IMPORTED_MODULE_1_moment__["utc"](sunriseTime, formatting)
                    && __WEBPACK_IMPORTED_MODULE_1_moment__["utc"]() < __WEBPACK_IMPORTED_MODULE_1_moment__["utc"](sunsetTime, formatting));
            }
            return true;
        };
        /// <summary>
        /// Analyze and transform the forecast data from the web service.
        /// </summary>
        /// <param name="forecastData">The data to analyze</param>
        /// <returns></returns>
        this.interpretForecastData = function (forecastData) {
            var defaultText = '';
            var unknownText = '?';
            var dateFormat = 'MM/DD/YYYY';
            var unixFormat = 'X';
            var threeLetterDayFormat = 'ddd';
            var weatherTypeIndex = 0;
            var weatherCountIndex = 1;
            var forecasts = [];
            var dayList = [];
            var self = this;
            // Create the empty objects for each of the dates we need
            for (var i = 1; i <= 5; ++i) {
                var dateString = __WEBPACK_IMPORTED_MODULE_1_moment__().add(i, 'days').format(dateFormat);
                var value = {
                    date: dateString,
                    dayText: defaultText,
                    tempMinArr: [],
                    tempMaxArr: [],
                    tempMin: undefined,
                    tempMax: undefined,
                    weatherTypes: [],
                    icon: defaultText,
                    weatherId: defaultText
                };
                forecasts.push(value);
                dayList.push(dateString);
            }
            // Locate the minimum temps, maximum temps, and types of weather
            forecastData.forEach(function (element) {
                var date = __WEBPACK_IMPORTED_MODULE_1_moment__["utc"](element.dt, unixFormat).format(dateFormat);
                var dayText = __WEBPACK_IMPORTED_MODULE_1_moment__(date, dateFormat).format(threeLetterDayFormat);
                var tempMin = element.main.temp_min;
                var tempMax = element.main.temp_max;
                var weatherType = element.weather[0].id;
                var index = null;
                // Try to locate the index for the given date
                switch (date) {
                    case dayList[0]:
                        index = 0;
                        break;
                    case dayList[1]:
                        index = 1;
                        break;
                    case dayList[2]:
                        index = 2;
                        break;
                    case dayList[3]:
                        index = 3;
                        break;
                    case dayList[4]:
                        index = 4;
                        break;
                }
                // If an index was found, populate the object
                if (index != null) {
                    var entry = forecasts[index];
                    entry.dayText = dayText;
                    entry.tempMinArr.push(tempMin);
                    entry.tempMaxArr.push(tempMax);
                    // If the weather array is empty, add a new entry
                    if (entry.weatherTypes.length === 0) {
                        entry.weatherTypes.push([weatherType, 1]);
                    }
                    else {
                        var valueFound_1 = false;
                        entry.weatherTypes.forEach(function (element) {
                            if (element[weatherTypeIndex] === weatherType) {
                                element[weatherCountIndex] += 1;
                                valueFound_1 = true;
                            }
                        });
                        // If no entry was found, add a new one
                        if (!valueFound_1) {
                            entry.weatherTypes.push([weatherType, 1]);
                        }
                    }
                }
            });
            // Once the forecast array is populate, go through it again to find the 
            // temperatures and the most prevalent weather condition
            forecasts.forEach(function (element) {
                // Locate the minimum and maximum temperatures
                for (var i = 0; i < element.tempMinArr.length; ++i) {
                    if (element.tempMin === undefined || element.tempMinArr[i] < element.tempMin)
                        element.tempMin = element.tempMinArr[i];
                }
                for (var i = 0; i < element.tempMaxArr.length; ++i) {
                    if (element.tempMax === undefined || element.tempMaxArr[i] > element.tempMax)
                        element.tempMax = element.tempMaxArr[i];
                }
                // Round the value if it exists
                if (element.tempMin !== undefined)
                    element.tempMin = Math.round(element.tempMin);
                else
                    element.tempMin = unknownText;
                if (element.tempMax !== undefined)
                    element.tempMax = Math.round(element.tempMax);
                else
                    element.tempMax = unknownText;
                var mostPrevalentCount = undefined;
                var mostPrevalentIndex = undefined;
                // Find the most prevalent weather condition
                for (var i = 0; i < element.weatherTypes.length; ++i) {
                    if (mostPrevalentCount === undefined ||
                        (mostPrevalentCount !== undefined && element.weatherTypes[i][weatherCountIndex] > mostPrevalentCount)) {
                        mostPrevalentIndex = i;
                        mostPrevalentCount = element.weatherTypes[i][weatherCountIndex];
                    }
                }
                if (mostPrevalentIndex !== undefined) {
                    element.weatherId = element.weatherTypes[mostPrevalentIndex][weatherTypeIndex];
                    element.icon = self.getWeatherIcon(element.weatherId, null, null);
                }
            });
            return forecasts;
        };
    }
    WeatherFunctions = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], WeatherFunctions);
    return WeatherFunctions;
}());
//# sourceMappingURL=weather-functions.component.js.map

/***/ }),

/***/ 428:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 428;


/***/ }),

/***/ 429:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(538);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_settings_service__ = __webpack_require__(117);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
            selector: 'hud-app',
            template: __webpack_require__(596),
            providers: [__WEBPACK_IMPORTED_MODULE_1__services_settings_service__["a" /* SettingsService */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__clock_clock_time_component__ = __webpack_require__(534);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__clock_clock_date_component__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__weather_weather_forecast_component__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__weather_weather_current_component__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__habitica_habitica_todo_component__ = __webpack_require__(535);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */]],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_4__clock_clock_time_component__["a" /* ClockTimeComponent */],
                __WEBPACK_IMPORTED_MODULE_5__clock_clock_date_component__["a" /* ClockDateComponent */],
                __WEBPACK_IMPORTED_MODULE_6__weather_weather_forecast_component__["a" /* WeatherForecastComponent */],
                __WEBPACK_IMPORTED_MODULE_7__weather_weather_current_component__["a" /* WeatherCurrentComponent */],
                __WEBPACK_IMPORTED_MODULE_8__habitica_habitica_todo_component__["a" /* HabiticaTodoComponent */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 533:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClockDateComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ClockDateComponent = (function () {
    function ClockDateComponent() {
        var _this = this;
        this._dateTimeFormat = 'dddd, MMMM D, YYYY';
        this._refreshInterval = 1000;
        // Update the time, then update it every 1 second thereafter
        this.updateDate();
        var timer = __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].interval(this._refreshInterval);
        timer.subscribe(function (data) { return _this.updateDate(); });
    }
    ClockDateComponent.prototype.updateDate = function () {
        this.dateTime = __WEBPACK_IMPORTED_MODULE_2_moment__().format(this._dateTimeFormat);
    };
    ;
    ClockDateComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
            selector: 'clock-date',
            template: __webpack_require__(597)
        }), 
        __metadata('design:paramtypes', [])
    ], ClockDateComponent);
    return ClockDateComponent;
}());
//# sourceMappingURL=clock-date.component.js.map

/***/ }),

/***/ 534:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClockTimeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ClockTimeComponent = (function () {
    function ClockTimeComponent() {
        var _this = this;
        this._refreshInterval = 1000;
        this._hoursAndMinutesFormat = 'hh:mm';
        this._secondsFormat = 'ss';
        // Update the time, then update it every 1 second thereafter
        this._timer = __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].timer(0, this._refreshInterval);
        this._timer.subscribe(function (data) { return _this.updateTime(); });
    }
    ClockTimeComponent.prototype.updateTime = function () {
        this.hoursAndMinutes = __WEBPACK_IMPORTED_MODULE_2_moment__().format(this._hoursAndMinutesFormat);
        this.seconds = __WEBPACK_IMPORTED_MODULE_2_moment__().format(this._secondsFormat);
    };
    ;
    ClockTimeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
            selector: 'clock-time',
            template: __webpack_require__(598)
        }), 
        __metadata('design:paramtypes', [])
    ], ClockTimeComponent);
    return ClockTimeComponent;
}());
//# sourceMappingURL=clock-time.component.js.map

/***/ }),

/***/ 535:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_settings_service__ = __webpack_require__(117);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HabiticaTodoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HabiticaTodoComponent = (function () {
    function HabiticaTodoComponent(_http, _settingsService) {
        this._http = _http;
        this._settingsService = _settingsService;
        this._habiticaSettings = null;
        this._habiticaTaskUrl = 'https://habitica.com/api/v3/tasks/user';
        this._refreshInterval = 1000 * 60 * 30; // 30 minutes
        this._maxTodoItemsPerColumn = 8;
        this._maxTodoItems = 16;
        this._habiticaTaskType = 'daily';
        this._shortDateStrings = {
            sun: 'su', mon: 'm', tue: 't', wed: 'w', thu: 'th', fri: 'f', sat: 's'
        };
        this.errorMessage = '';
        this.items = {
            totalItems: 0,
            list: []
        };
    }
    HabiticaTodoComponent.prototype.ngOnInit = function () {
        if (!this._habiticaSettings) {
            this.getApiSettings();
        }
    };
    HabiticaTodoComponent.prototype.getApiSettings = function () {
        var _this = this;
        this._settingsService.getHabiticaSettings()
            .subscribe(function (settings) { return _this.setupTimer(settings); }, function (error) { return _this.errorMessage = error; });
    };
    HabiticaTodoComponent.prototype.setupTimer = function (settings) {
        var _this = this;
        this._habiticaSettings = settings;
        // Update the tasks, then update it every 30 minutes thereafter
        this.getHabiticaTasks();
        var timer = __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].interval(this._refreshInterval);
        timer.subscribe(function (data) { return _this.getHabiticaTasks(); });
    };
    HabiticaTodoComponent.prototype.getHabiticaTasks = function () {
        var _this = this;
        if (!this._habiticaSettings) {
            console.log('Habitica API Key or User ID not set');
            return false;
        }
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('x-api-user', this._habiticaSettings.UserId);
        headers.append('x-api-key', this._habiticaSettings.ApiKey);
        this._http.get(this._habiticaTaskUrl, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.items = _this.interpretHabitData(data.data);
        }, function (err) { return console.error(err); });
    };
    ;
    HabiticaTodoComponent.prototype.interpretHabitData = function (habitData) {
        var day = __WEBPACK_IMPORTED_MODULE_3_moment__().format('ddd').toLowerCase();
        var shortDay = this._shortDateStrings[day];
        var itemCount = 0;
        var todoList = [];
        var todos = [];
        var self = this;
        habitData.forEach(function (value, key) {
            if (value.completed === false && value.type === self._habiticaTaskType && value.repeat[shortDay] === true) {
                todos.push(value.text);
                itemCount += 1;
                if (itemCount >= self._maxTodoItems) {
                    return false;
                }
            }
        });
        if (itemCount > self._maxTodoItemsPerColumn) {
            for (var i = 0; i < todos.length;) {
                if (i + 1 < todos.length) {
                    todoList.push([todos[i++], todos[i++]]);
                }
                else {
                    todoList.push([todos[i++]]);
                }
            }
        }
        else {
            todoList = todos;
        }
        return {
            totalItems: itemCount,
            list: todoList
        };
    };
    ;
    HabiticaTodoComponent.prototype.useTwoColumns = function () {
        return (this.items.totalItems > this._maxTodoItemsPerColumn);
    };
    ;
    HabiticaTodoComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
            selector: 'habitica-todo',
            template: __webpack_require__(599)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_settings_service__["a" /* SettingsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_settings_service__["a" /* SettingsService */]) === 'function' && _b) || Object])
    ], HabiticaTodoComponent);
    return HabiticaTodoComponent;
    var _a, _b;
}());
//# sourceMappingURL=habitica-todo.component.js.map

/***/ }),

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weather_functions_component__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_settings_service__ = __webpack_require__(117);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeatherCurrentComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





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
        var timer = __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].interval(this._refreshInterval);
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
            selector: 'weather-current',
            template: __webpack_require__(600),
            providers: [__WEBPACK_IMPORTED_MODULE_2__weather_functions_component__["a" /* WeatherFunctions */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__weather_functions_component__["a" /* WeatherFunctions */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__weather_functions_component__["a" /* WeatherFunctions */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_settings_service__["a" /* SettingsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_settings_service__["a" /* SettingsService */]) === 'function' && _c) || Object])
    ], WeatherCurrentComponent);
    return WeatherCurrentComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=weather-current.component.js.map

/***/ }),

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weather_functions_component__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_settings_service__ = __webpack_require__(117);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeatherForecastComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





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
        var timer = __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].interval(this._refreshInterval);
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
            selector: 'weather-forecast',
            template: __webpack_require__(601),
            providers: [__WEBPACK_IMPORTED_MODULE_2__weather_functions_component__["a" /* WeatherFunctions */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__weather_functions_component__["a" /* WeatherFunctions */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__weather_functions_component__["a" /* WeatherFunctions */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_settings_service__["a" /* SettingsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_settings_service__["a" /* SettingsService */]) === 'function' && _c) || Object])
    ], WeatherForecastComponent);
    return WeatherForecastComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=weather-forecast.component.js.map

/***/ }),

/***/ 538:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 594:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 290,
	"./af.js": 290,
	"./ar": 296,
	"./ar-dz": 291,
	"./ar-dz.js": 291,
	"./ar-ly": 292,
	"./ar-ly.js": 292,
	"./ar-ma": 293,
	"./ar-ma.js": 293,
	"./ar-sa": 294,
	"./ar-sa.js": 294,
	"./ar-tn": 295,
	"./ar-tn.js": 295,
	"./ar.js": 296,
	"./az": 297,
	"./az.js": 297,
	"./be": 298,
	"./be.js": 298,
	"./bg": 299,
	"./bg.js": 299,
	"./bn": 300,
	"./bn.js": 300,
	"./bo": 301,
	"./bo.js": 301,
	"./br": 302,
	"./br.js": 302,
	"./bs": 303,
	"./bs.js": 303,
	"./ca": 304,
	"./ca.js": 304,
	"./cs": 305,
	"./cs.js": 305,
	"./cv": 306,
	"./cv.js": 306,
	"./cy": 307,
	"./cy.js": 307,
	"./da": 308,
	"./da.js": 308,
	"./de": 310,
	"./de-at": 309,
	"./de-at.js": 309,
	"./de.js": 310,
	"./dv": 311,
	"./dv.js": 311,
	"./el": 312,
	"./el.js": 312,
	"./en-au": 313,
	"./en-au.js": 313,
	"./en-ca": 314,
	"./en-ca.js": 314,
	"./en-gb": 315,
	"./en-gb.js": 315,
	"./en-ie": 316,
	"./en-ie.js": 316,
	"./en-nz": 317,
	"./en-nz.js": 317,
	"./eo": 318,
	"./eo.js": 318,
	"./es": 320,
	"./es-do": 319,
	"./es-do.js": 319,
	"./es.js": 320,
	"./et": 321,
	"./et.js": 321,
	"./eu": 322,
	"./eu.js": 322,
	"./fa": 323,
	"./fa.js": 323,
	"./fi": 324,
	"./fi.js": 324,
	"./fo": 325,
	"./fo.js": 325,
	"./fr": 328,
	"./fr-ca": 326,
	"./fr-ca.js": 326,
	"./fr-ch": 327,
	"./fr-ch.js": 327,
	"./fr.js": 328,
	"./fy": 329,
	"./fy.js": 329,
	"./gd": 330,
	"./gd.js": 330,
	"./gl": 331,
	"./gl.js": 331,
	"./he": 332,
	"./he.js": 332,
	"./hi": 333,
	"./hi.js": 333,
	"./hr": 334,
	"./hr.js": 334,
	"./hu": 335,
	"./hu.js": 335,
	"./hy-am": 336,
	"./hy-am.js": 336,
	"./id": 337,
	"./id.js": 337,
	"./is": 338,
	"./is.js": 338,
	"./it": 339,
	"./it.js": 339,
	"./ja": 340,
	"./ja.js": 340,
	"./jv": 341,
	"./jv.js": 341,
	"./ka": 342,
	"./ka.js": 342,
	"./kk": 343,
	"./kk.js": 343,
	"./km": 344,
	"./km.js": 344,
	"./ko": 345,
	"./ko.js": 345,
	"./ky": 346,
	"./ky.js": 346,
	"./lb": 347,
	"./lb.js": 347,
	"./lo": 348,
	"./lo.js": 348,
	"./lt": 349,
	"./lt.js": 349,
	"./lv": 350,
	"./lv.js": 350,
	"./me": 351,
	"./me.js": 351,
	"./mi": 352,
	"./mi.js": 352,
	"./mk": 353,
	"./mk.js": 353,
	"./ml": 354,
	"./ml.js": 354,
	"./mr": 355,
	"./mr.js": 355,
	"./ms": 357,
	"./ms-my": 356,
	"./ms-my.js": 356,
	"./ms.js": 357,
	"./my": 358,
	"./my.js": 358,
	"./nb": 359,
	"./nb.js": 359,
	"./ne": 360,
	"./ne.js": 360,
	"./nl": 362,
	"./nl-be": 361,
	"./nl-be.js": 361,
	"./nl.js": 362,
	"./nn": 363,
	"./nn.js": 363,
	"./pa-in": 364,
	"./pa-in.js": 364,
	"./pl": 365,
	"./pl.js": 365,
	"./pt": 367,
	"./pt-br": 366,
	"./pt-br.js": 366,
	"./pt.js": 367,
	"./ro": 368,
	"./ro.js": 368,
	"./ru": 369,
	"./ru.js": 369,
	"./se": 370,
	"./se.js": 370,
	"./si": 371,
	"./si.js": 371,
	"./sk": 372,
	"./sk.js": 372,
	"./sl": 373,
	"./sl.js": 373,
	"./sq": 374,
	"./sq.js": 374,
	"./sr": 376,
	"./sr-cyrl": 375,
	"./sr-cyrl.js": 375,
	"./sr.js": 376,
	"./ss": 377,
	"./ss.js": 377,
	"./sv": 378,
	"./sv.js": 378,
	"./sw": 379,
	"./sw.js": 379,
	"./ta": 380,
	"./ta.js": 380,
	"./te": 381,
	"./te.js": 381,
	"./tet": 382,
	"./tet.js": 382,
	"./th": 383,
	"./th.js": 383,
	"./tl-ph": 384,
	"./tl-ph.js": 384,
	"./tlh": 385,
	"./tlh.js": 385,
	"./tr": 386,
	"./tr.js": 386,
	"./tzl": 387,
	"./tzl.js": 387,
	"./tzm": 389,
	"./tzm-latn": 388,
	"./tzm-latn.js": 388,
	"./tzm.js": 389,
	"./uk": 390,
	"./uk.js": 390,
	"./uz": 391,
	"./uz.js": 391,
	"./vi": 392,
	"./vi.js": 392,
	"./x-pseudo": 393,
	"./x-pseudo.js": 393,
	"./yo": 394,
	"./yo.js": 394,
	"./zh-cn": 395,
	"./zh-cn.js": 395,
	"./zh-hk": 396,
	"./zh-hk.js": 396,
	"./zh-tw": 397,
	"./zh-tw.js": 397
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 594;


/***/ }),

/***/ 596:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <clock-date>Loading date...</clock-date>\r\n</div>\r\n<div class=\"row\">\r\n    <div class=\"col-md-7\">\r\n        <clock-time>Loading time...</clock-time>\r\n    </div>\r\n    <div id=\"currentWeather\" class=\"col-md-4 col-md-offset-1\">\r\n        <weather-current>Loading current weather...</weather-current>\r\n    </div>\r\n</div>\r\n<div class=\"row\">\r\n    <div class=\"row\">&nbsp;</div>\r\n    <div class=\"col-md-6 col-md-offset-1\">\r\n        <habitica-todo>Loading Habitica tasks...</habitica-todo>\r\n    </div> \r\n    <weather-forecast>Loading forecast weather...</weather-forecast>\r\n</div>"

/***/ }),

/***/ 597:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-10 col-md-offset-1\" id=\"dateTime\">{{dateTime}}</div>"

/***/ }),

/***/ 598:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-3 col-md-offset-1\" id=\"clock\">{{hoursAndMinutes}}</div>\r\n<div class=\"col-md-3\" id=\"clockSeconds\">{{seconds}}</div>\r\n"

/***/ }),

/***/ 599:
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let item of items.list\" class=\"row\">\r\n    <div *ngIf=\"useTwoColumns()\">\r\n        <div class=\"col-md-6 checklistItem\">{{item[0]}}</div>\r\n        <div *ngIf=\"item.length == 2\" class=\"col-md-6 checklistItem\">{{item[1]}}</div>\r\n    </div>\r\n    <div *ngIf=\"!useTwoColumns()\">\r\n        <div class=\"col-md-6 checklistItem\">{{item}}</div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 600:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-3\">\r\n    <img id=\"currentWeatherIcon\" class=\"largeImg\" [src]=\"icon\" alt=\"Weather Icon\" />\r\n</div>\r\n<div id=\"currentWeatherTemperature\" class=\"col-md-8\">{{temperature}} &deg;</div>"

/***/ }),

/***/ 601:
/***/ (function(module, exports) {

module.exports = "<div id=\"forecast\" class=\"col-md-5\">\r\n    <div *ngFor=\"let forecast of forecasts\" class=\"row smallText\">\r\n        <div id=\"day{{$index}}\" class=\"col-md-2 col-md-offset-2\">{{forecast.dayText}}</div>\r\n        <div class=\"col-md-2 imgHelper\">\r\n            <img id=\"icon{{$index}}\" class=\"smallImg\" [src]=\"forecast.icon\" />\r\n        </div>\r\n        <div id=\"max{{$index}}\" class=\"col-md-2 text-right\">{{forecast.tempMax}}</div>\r\n        <div id=\"min{{$index}}\" class=\"col-md-2 text-right\">{{forecast.tempMin}}</div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 882:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(429);


/***/ })

},[882]);
//# sourceMappingURL=main.bundle.js.map