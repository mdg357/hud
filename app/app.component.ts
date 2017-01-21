import { Component } from '@angular/core';
import { ClockTimeComponent } from './clock/clock-time.component';
import { WeatherCurrentComponent } from './weather/weather-current.component';
import { WeatherForecastComponent } from './weather/weather-forecast.component';
import { HabiticaTodoComponent } from './habitica/habitica-todo.component';
import { SettingsService } from './services/settings.service';

@Component({
    selector: 'hud-app',
    templateUrl: './app/app.component.html',
    providers: [ SettingsService ]
})

export class AppComponent {
}