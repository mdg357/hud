import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

@Component({
    selector: 'clock-date',
    templateUrl: './clock-date.component.html'
})

export class ClockDateComponent {
    constructor() {
        // Update the time, then update it every 1 second thereafter
        this.updateDate();
        let timer = Observable.interval(this._refreshInterval);
        timer.subscribe(data => this.updateDate());
    }

    private _dateTimeFormat = 'dddd, MMMM D, YYYY';
    private _refreshInterval = 1000;

    public dateTime: string;

    private updateDate() {
        this.dateTime = moment().format(this._dateTimeFormat);
    };
}
