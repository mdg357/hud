import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import * as moment from 'moment';

import { SettingsService } from '../services/settings.service';
import { HabitDto } from '../dtos/habit.dto';
import { HabiticaSettingsDto } from '../dtos/habiticaSettings.dto';

@Component({
    selector: 'habitica-todo',
    templateUrl: './habitica-todo.component.html'
})

export class HabiticaTodoComponent implements OnInit {
    constructor(private _http: Http,
        private _settingsService: SettingsService) {
    }

    private _habiticaSettings: HabiticaSettingsDto;
    private _maxTodoItems = 16;
    private _habiticaTaskType = 'daily';
    private _shortDateStrings: any = {
        sun: 'su', mon: 'm', tue: 't', wed: 'w', thu: 'th', fri: 'f', sat: 's'
    };

    public errorMessage: any = '';
    public todoList: any;

    ngOnInit() {
        if (!this._habiticaSettings) {
            this.getApiSettings();
        }
    }

    private getApiSettings() {
        this._settingsService.getHabiticaSettings()
            .subscribe(
                settings => this.setupTimer(settings),
                error => this.errorMessage = error);
    }

    private setupTimer (settings: HabiticaSettingsDto) {
        this._habiticaSettings = settings;

        // Update the tasks, then update it every 30 minutes thereafter
        this.getHabiticaTasks();
        let timer = Observable.interval(this._habiticaSettings.refreshInterval);
        timer.subscribe(data => this.getHabiticaTasks());
    }

    private getHabiticaTasks () {
        if (!this._habiticaSettings) {
            console.error('Habitica API Key or User ID not set');
            return false;
        }

        let headers = new Headers();
        headers.append('x-api-user', this._habiticaSettings.userId);
        headers.append('x-api-key', this._habiticaSettings.apiKey);

        this._http.get(this._habiticaSettings.taskUrl, { headers: headers })
            .map((res: Response) => res.json())
            .subscribe(
                data => {
                    this.todoList = this.interpretHabitData(data.data);
                },
                err => console.error(err)
            );
    };

    private interpretHabitData(habitData: any) {
        let day = moment().format('ddd').toLowerCase();
        let shortDay = this._shortDateStrings[day];
        let todos = new Array<HabitDto>();
        let itemCount = 0;
        let list = [];

        habitData.forEach((value) => {
            if (value.completed === false && value.type === this._habiticaTaskType && value.repeat[shortDay] === true) {
                todos.push(new HabitDto(value.id, value.text));
                itemCount += 1;

                // Only grab the first N items from the response
                if (itemCount >= this._maxTodoItems) {
                    return false;
                }
            }
        });

        for (let i = 0; i < todos.length; ) {
            if (i + 1 < todos.length) {
                list.push([todos[i++], todos[i++]]);
            } else {
                list.push([todos[i++]]);
            }
        }

        return list;
    };
}
