import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

@Component({
    selector: 'clock-time',
    templateUrl: 'app/clock-time.component.html'
})

export class ClockTimeComponent { 
    componentName: 'ClockTimeComponent';

    private _refreshInterval: number = 1000;
    private _hoursAndMinutesFormat: string = "hh:mm";
    private _secondsFormat: string = "ss";
    private _timer: Observable<number>;

    public hoursAndMinutes: string;
    public seconds: string;
    
    constructor() {
        // Update the time, then update it every 1 second thereafter 
        this._timer = Observable.timer(0, this._refreshInterval);
        this._timer.subscribe(t=> {
            this.updateTime();
        });
    }

    private updateTime = function() {
        this.hoursAndMinutes = moment().format(this._hoursAndMinutesFormat);
        this.seconds = moment().format(this._secondsFormat);
    };
}