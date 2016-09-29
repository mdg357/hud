import { Component, Input, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

@Component({
    selector: 'habitica-todo',
    templateUrl: 'app/habitica-todo.component.html'
})

export class HabiticaTodoComponent {
    componentName: 'HabiticaTodoComponent';

    private _habiticaApiKey: string = '';
    private _habiticaUserId: string = '';

    private _habiticaTaskUrl: string = 'https://habitica.com/api/v3/tasks/user';
    private _refreshInterval: number = 1000 * 60 * 30; // 30 minutes
    private _maxTodoItemsPerColumn: number = 8;
    private _maxTodoItems: number = 16;
    private _habiticaTaskType: string = 'daily';
    private _shortDateStrings: any = {
        sun: 'su', mon: 'm', tue: 't', wed: 'w', thu: 'th', fri: 'f', sat: 's'
    };

    public items: any = {
        totalItems: 0,
        list: []
    };

    constructor(private _http: Http) {
        // Update the weather, then update it every 1 second thereafter
        this.getHabiticaTasks();
        let timer = Observable.interval(this._refreshInterval);
        timer.subscribe(this.getHabiticaTasks);
    }

    private getHabiticaTasks = function() {
        if (this._habiticaApiKey === '' || this._habiticaUserId === '') {
            console.log('Habitica API Key or User ID not set');
            console.log('Habitica API Key: ' + this._weatherApiKey);
            console.log('User Id: ' + this._cityId);
            return false;
        }

        let headers = new Headers();
        headers.append('x-api-user', this._habiticaUserId);
        headers.append('x-api-key', this._habiticaApiKey);

        this._http.get(this._habiticaTaskUrl, { headers: headers })
            .map((res: Response) => res.json())
            .subscribe(
                data => {
                    this.items = this.interpretHabitData(data.data);
                },
                err => console.error(err)
            );
    };

    private interpretHabitData = function(habitData) {
        let day = moment().format('ddd').toLowerCase();
        let shortDay = this._shortDateStrings[day];
        let itemCount = 0;
        let todoList = [];
        let todos = [];
        let self = this;

        habitData.forEach(function(value, key) {
            if (value.completed === false && value.type === self._habiticaTaskType && value.repeat[shortDay] === true) {
                todos.push(value.text);
                itemCount += 1;

                if (itemCount >= self._maxTodoItems) {
                    return false;
                }
            }
        });

        if (itemCount > self._maxTodoItemsPerColumn) {
            for (let i = 0; i < todos.length; ) {
                if (i + 1 < todos.length) {
                    todoList.push([todos[i++], todos[i++]]);
                } else {
                    todoList.push([todos[i++]]);
                }
            }
        } else {
            todoList = todos;
        }

        return {
            totalItems: itemCount,
            list: todoList
        };
    };

    public useTwoColumns = function() {
        return (this.items.totalItems > this._maxTodoItemsPerColumn);
    };
}
