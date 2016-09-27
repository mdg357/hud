import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

@Component({
    selector: 'clock-date',
    template: '<div class="col-md-10 col-md-offset-1" id="dateTime">{{clock.dateTime}}</div>'
})

export class ClockDateComponent { 
    componentName: 'ClockDateComponent';

    private dateTimeFormat = "dddd, MMMM D, YYYY";
    private refreshInterval = 1000;
    
    constructor() {
        // Update the time, then update it every 1 second thereafter 
        this.updateTime();
        let timer = Observable.interval(this.refreshInterval);
        timer.subscribe(this.updateTime);
    }

    private updateTime = function() {
        this.clock = {
            dateTime: moment().format(this.dateTimeFormat)
        };
    };
}