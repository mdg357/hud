import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

@Component({
    selector: 'clock-time',
    template: '<div class="col-md-7"><div class="col-md-3 col-md-offset-1" id="clock">{{hoursAndMinutes}}</div><div class="col-md-3" id="clockSeconds">{{seconds}}</div></div>'
})

export class ClockTimeComponent { 
    componentName: 'ClockTimeComponent';

    private refreshInterval: number = 1000;
    private hoursAndMinutesFormat: string = "hh:mm";
    private secondsFormat: string = "ss";
    private timer: Observable<number>;

    public hoursAndMinutes: string;
    public seconds: string;
    
    constructor() {
        // Update the time, then update it every 1 second thereafter 
        this.timer = Observable.timer(0, this.refreshInterval);
        this.timer.subscribe(t=> {
            this.updateTime();
        });
    }

    private updateTime = function() {
        this.hoursAndMinutes = moment().format(this.hoursAndMinutesFormat);
        this.seconds = moment().format(this.secondsFormat);
    };
}