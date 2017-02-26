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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var moment = require('moment');
var settings_service_1 = require('../services/settings.service');
var HabiticaTodoComponent = (function () {
    function HabiticaTodoComponent(_http, _settingsService) {
        this._http = _http;
        this._settingsService = _settingsService;
        this._habiticaSettings = null;
        this._habiticaTaskUrl = 'https://habitica.com/api/v3/tasks/user';
        this._refreshInterval = 1000 * 60 * 30; // 30 minutes
        this._maxTodoItemsPerColumn = 8;
        this._maxTodoItems = 16;
        this._habiticaTaskType = 'daily';
        this._shortDateStrings = {
            sun: 'su', mon: 'm', tue: 't', wed: 'w', thu: 'th', fri: 'f', sat: 's'
        };
        this.errorMessage = '';
        this.items = {
            totalItems: 0,
            list: []
        };
    }
    HabiticaTodoComponent.prototype.ngOnInit = function () {
        if (!this._habiticaSettings) {
            this.getApiSettings();
        }
    };
    HabiticaTodoComponent.prototype.getApiSettings = function () {
        var _this = this;
        this._settingsService.getHabiticaSettings()
            .subscribe(function (settings) { return _this.setupTimer(settings); }, function (error) { return _this.errorMessage = error; });
    };
    HabiticaTodoComponent.prototype.setupTimer = function (settings) {
        var _this = this;
        this._habiticaSettings = settings;
        // Update the tasks, then update it every 30 minutes thereafter
        this.getHabiticaTasks();
        var timer = Rx_1.Observable.interval(this._refreshInterval);
        timer.subscribe(function (data) { return _this.getHabiticaTasks(); });
    };
    HabiticaTodoComponent.prototype.getHabiticaTasks = function () {
        var _this = this;
        if (!this._habiticaSettings) {
            console.log('Habitica API Key or User ID not set');
            return false;
        }
        var headers = new http_1.Headers();
        headers.append('x-api-user', this._habiticaSettings.UserId);
        headers.append('x-api-key', this._habiticaSettings.ApiKey);
        this._http.get(this._habiticaTaskUrl, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.items = _this.interpretHabitData(data.data);
        }, function (err) { return console.error(err); });
    };
    ;
    HabiticaTodoComponent.prototype.interpretHabitData = function (habitData) {
        var day = moment().format('ddd').toLowerCase();
        var shortDay = this._shortDateStrings[day];
        var itemCount = 0;
        var todoList = [];
        var todos = [];
        var self = this;
        habitData.forEach(function (value, key) {
            if (value.completed === false && value.type === self._habiticaTaskType && value.repeat[shortDay] === true) {
                todos.push(value.text);
                itemCount += 1;
                if (itemCount >= self._maxTodoItems) {
                    return false;
                }
            }
        });
        if (itemCount > self._maxTodoItemsPerColumn) {
            for (var i = 0; i < todos.length;) {
                if (i + 1 < todos.length) {
                    todoList.push([todos[i++], todos[i++]]);
                }
                else {
                    todoList.push([todos[i++]]);
                }
            }
        }
        else {
            todoList = todos;
        }
        return {
            totalItems: itemCount,
            list: todoList
        };
    };
    ;
    HabiticaTodoComponent.prototype.useTwoColumns = function () {
        return (this.items.totalItems > this._maxTodoItemsPerColumn);
    };
    ;
    HabiticaTodoComponent = __decorate([
        core_1.Component({
            selector: 'habitica-todo',
            templateUrl: './habitica-todo.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, settings_service_1.SettingsService])
    ], HabiticaTodoComponent);
    return HabiticaTodoComponent;
}());
exports.HabiticaTodoComponent = HabiticaTodoComponent;
//# sourceMappingURL=habitica-todo.component.js.map