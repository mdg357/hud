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
var ClockDateComponent = (function () {
    function ClockDateComponent() {
        var _this = this;
        this._dateTimeFormat = 'dddd, MMMM D, YYYY';
        this._refreshInterval = 1000;
        // Update the time, then update it every 1 second thereafter
        this.updateDate();
        var timer = Rx_1.Observable.interval(this._refreshInterval);
        timer.subscribe(function (data) { return _this.updateDate(); });
    }
    ClockDateComponent.prototype.updateDate = function () {
        this.dateTime = moment().format(this._dateTimeFormat);
    };
    ;
    ClockDateComponent = __decorate([
        core_1.Component({
            selector: 'clock-date',
            templateUrl: './clock-date.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ClockDateComponent);
    return ClockDateComponent;
}());
exports.ClockDateComponent = ClockDateComponent;
//# sourceMappingURL=clock-date.component.js.map