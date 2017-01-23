import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SettingsService {
    private _settingsUrl = 'api/settings/settings.json';

    constructor(private _http: Http) { }

    public getHabiticaSettings(): Observable<string[]> {
        return this._http.get(this._settingsUrl)
            .map((response: Response) => <string[]> response.json().habitica)
            // .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    public getWeatherSettings(): Observable<string[]> {
        return this._http.get(this._settingsUrl)
            .map((response: Response) => <string[]> response.json().weather)
            // .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // In a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
