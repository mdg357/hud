import { Component } from '@angular/core';
import { ClockTimeComponent } from './clock/clock-time.component';
import { WeatherCurrentComponent } from './weather/weather-current.component';
import { WeatherForecastComponent } from './weather/weather-forecast.component';
import { HabiticaTodoComponent } from './habitica/habitica-todo.component';
import { SettingsService } from './services/settings.service';

@Component({
    selector: 'hud-app',
    template: `
        <div class="row">
            <clock-date>Loading date...</clock-date>
        </div>
        <div class="row">
            <div class="col-md-7">
                <clock-time>Loading time...</clock-time>
            </div>
            <div id="currentWeather" class="col-md-4 col-md-offset-1">
                <weather-current>Loading current weather...</weather-current>
            </div>
        </div>
        <div class="row">
            <div class="row">&nbsp;</div>
            <div class="col-md-6 col-md-offset-1">
                <habitica-todo>Loading Habitica tasks...</habitica-todo>
            </div> 
            <weather-forecast>Loading forecast weather...</weather-forecast>
        </div>
    `,
    providers: [ SettingsService ]
})

export class AppComponent {

}