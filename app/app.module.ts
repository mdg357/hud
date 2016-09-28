import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { ClockDateComponent } from './clock-date.component';
import { ClockTimeComponent } from './clock-time.component';
import { WeatherCurrentComponent } from './weather-current.component';
import { WeatherForecastComponent } from './weather-forecast.component';
import { HabiticaTodoComponent } from './habitica-todo.component';

@NgModule({
    imports: [ BrowserModule, HttpModule ],
    declarations: [ 
        ClockDateComponent, 
        ClockTimeComponent, 
        WeatherCurrentComponent, 
        WeatherForecastComponent, 
        HabiticaTodoComponent 
    ],
    bootstrap: [ 
        ClockDateComponent, 
        ClockTimeComponent, 
        WeatherCurrentComponent, 
        WeatherForecastComponent, 
        HabiticaTodoComponent 
    ]
})

export class AppModule { }