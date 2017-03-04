import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HabiticaSettingsDto } from '../dtos/habiticaSettings.dto';
import { WeatherSettingsDto } from '../dtos/weatherSettings.dto';

@Injectable()
export class SettingsService {
    private _settingsUrl = 'api/settings/settings.json';

    constructor(private _http: Http) { }

    public getHabiticaSettings(): Observable<HabiticaSettingsDto> {
        return this._http.get(this._settingsUrl)
            .map((response: Response) => response.json().habitica)
            .catch(this.handleError);
    }

    public getWeatherSettings(): Observable<WeatherSettingsDto> {
        return this._http.get(this._settingsUrl)
            .map((response: Response) => response.json().weather)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
