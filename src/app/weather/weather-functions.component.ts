import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { ForecastDto } from '../dtos/forecast.dto';

@Injectable()
export class WeatherFunctions {
    private _defaultWeatherIconIdDay = 0;
    private _defaultWeatherIconIdNight = 1;
    private _imagePath = 'assets/images/';
    private _weatherIconList = [
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
    public getWeatherIcon(id: number, sunriseTime: string, sunsetTime: string) {
        let defaultIconIndex = (this.isDayTime(sunriseTime, sunsetTime) ? this._defaultWeatherIconIdDay : this._defaultWeatherIconIdNight);
        let icon = this._imagePath + this._weatherIconList[defaultIconIndex].icon;
        let description = this._weatherIconList[defaultIconIndex].description;
        let imagePath = 'assets/images/';

        if (id === null) {
            return icon;
        }

        this._weatherIconList.forEach(
            (element) => {
                if (element.id === id) {
                    icon = imagePath + element.icon;
                    description = element.description;
                    return false;
                }
            }
        );

        return icon;
    };

    /// <summary>
    /// Check if the current time is between sunrise and sunset
    /// </summary>
    /// <param name=""></param>
    /// <returns>True, if it is currently daytime, False otherwise</returns>
    public isDayTime(sunriseTime: string, sunsetTime: string): boolean {
        if (sunriseTime !== null && sunsetTime !== null) {
            let formatting = 'h:mm:ss A';

            return (moment.utc() >= moment.utc(sunriseTime, formatting)
                && moment.utc() < moment.utc(sunsetTime, formatting));
        }
        return true;
    };

    public setupForecasts(dateFormat: string, defaultText: string, threeLetterDayFormat: string): ForecastDto[] {
      let forecasts = new Array<ForecastDto>();

      for (let i = 1; i <= 5; ++i) {
            let date = moment().add(i, 'days').format(dateFormat);
            let dayText = moment(date, dateFormat).format(threeLetterDayFormat);
            let forecast = new ForecastDto(date, dayText, defaultText);
            forecasts.push(forecast);
      }

      return forecasts;
    }

    public setupDayList(dateFormat: string): string[] {
      let dayList = new Array<string>();

      for (let i = 1; i <= 5; ++i) {
            let date = moment().add(i, 'days').format(dateFormat);
            dayList.push(date);
      }

      return dayList;
    }

    public getDayIndex(date: string, dayList: string[]): number {
      return dayList.indexOf(date) !== -1
        ? dayList.indexOf(date)
        : null;
    }

    /// <summary>
    /// Analyze and transform the forecast data from the web service.
    /// </summary>
    /// <param name="forecastData">The data to analyze</param>
    /// <returns></returns>
    public interpretForecastData(forecastData): ForecastDto[] {
        let defaultText = '';
        let unknownText = '?';
        let dateFormat = 'MM/DD/YYYY';
        let unixFormat = 'X';
        let threeLetterDayFormat = 'ddd';
        let forecasts = this.setupForecasts(dateFormat, defaultText, threeLetterDayFormat);
        let dayList = this.setupDayList(dateFormat);

        // Locate the minimum temps, maximum temps, and types of weather
        forecastData.forEach((element) => {
            let date = moment.utc(element.dt, unixFormat).format(dateFormat);
            let index = this.getDayIndex(date, dayList);

            // If an index was found, populate the object
            if (index !== null) {
              let entry = forecasts[index];
              entry.addMinimumTemperatures(element.main.temp_min);
              entry.addMaximumTemperatures(element.main.temp_max);
              entry.addWeatherType(element.weather[0].id);
              entry.icon = this.getWeatherIcon(entry.weatherId, null, null);
            }
        });

        return forecasts;
    };
}
