import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

@Component({
    selector: 'clock-date',
    templateUrl: 'app/clock/clock-date.component.html'
})

export class ClockDateComponent {
    componentName: 'ClockDateComponent';

    private _dateTimeFormat: string = 'dddd, MMMM D, YYYY';
    private _refreshInterval: number = 1000;

    constructor() {
        // Update the time, then update it every 1 second thereafter 
        this.updateDate();
        let timer = Observable.interval(this._refreshInterval);
        timer.subscribe(data => this.updateDate());
    }

    private updateDate = function() {
        this.clock = {
            dateTime: moment().format(this._dateTimeFormat)
        };
    };
}