import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ClockTimeComponent } from './clock/clock-time.component';
import { ClockDateComponent } from './clock/clock-date.component';
import { WeatherForecastComponent } from './weather/weather-forecast.component';
import { WeatherCurrentComponent } from './weather/weather-current.component';
import { HabiticaTodoComponent } from './habitica/habitica-todo.component';

@NgModule({
    imports: [ BrowserModule, HttpModule ],
    declarations: [
        AppComponent,
        ClockTimeComponent,
        ClockDateComponent,
        WeatherForecastComponent,
        WeatherCurrentComponent,
        HabiticaTodoComponent ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }