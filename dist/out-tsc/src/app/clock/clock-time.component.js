"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
var moment = require('moment');
var ClockTimeComponent = (function () {
    function ClockTimeComponent() {
        var _this = this;
        this._refreshInterval = 1000;
        this._hoursAndMinutesFormat = 'hh:mm';
        this._secondsFormat = 'ss';
        // Update the time, then update it every 1 second thereafter
        this._timer = Rx_1.Observable.timer(0, this._refreshInterval);
        this._timer.subscribe(function (data) { return _this.updateTime(); });
    }
    ClockTimeComponent.prototype.updateTime = function () {
        this.hoursAndMinutes = moment().format(this._hoursAndMinutesFormat);
        this.seconds = moment().format(this._secondsFormat);
    };
    ;
    ClockTimeComponent = __decorate([
        core_1.Component({
            selector: 'clock-time',
            templateUrl: './clock-time.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ClockTimeComponent);
    return ClockTimeComponent;
}());
exports.ClockTimeComponent = ClockTimeComponent;
//# sourceMappingURL=clock-time.component.js.map