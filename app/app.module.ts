import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClockDateComponent } from './clock-date.component';
import { ClockTimeComponent } from './clock-time.component';

@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ ClockDateComponent, ClockTimeComponent ],
    bootstrap:    [ ClockDateComponent, ClockTimeComponent ]
})

export class AppModule { }