import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

@Component({
    selector: 'clock-time',
    templateUrl: './clock-time.component.html'
})

export class ClockTimeComponent {
    constructor() {
        // Update the time, then update it every 1 second thereafter
        this._timer = Observable.timer(0, this._refreshInterval);
        this._timer.subscribe(data => this.updateTime());
    }

    private _refreshInterval = 1000;
    private _hoursAndMinutesFormat = 'hh:mm';
    private _secondsFormat = 'ss';
    private _timer: Observable<number>;

    public hoursAndMinutes: string;
    public seconds: string;

    private updateTime() {
        this.hoursAndMinutes = moment().format(this._hoursAndMinutesFormat);
        this.seconds = moment().format(this._secondsFormat);
    };
}
