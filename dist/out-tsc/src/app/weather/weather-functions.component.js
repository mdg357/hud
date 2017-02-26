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
var moment = require('moment');
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
                return (moment.utc() >= moment.utc(sunriseTime, formatting)
                    && moment.utc() < moment.utc(sunsetTime, formatting));
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
                var dateString = moment().add(i, 'days').format(dateFormat);
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
                var date = moment.utc(element.dt, unixFormat).format(dateFormat);
                var dayText = moment(date, dateFormat).format(threeLetterDayFormat);
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
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], WeatherFunctions);
    return WeatherFunctions;
}());
exports.WeatherFunctions = WeatherFunctions;
//# sourceMappingURL=weather-functions.component.js.map