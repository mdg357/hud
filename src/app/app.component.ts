import { Component } from '@angular/core';
import { SettingsService } from './services/settings.service';

@Component({
    selector: 'hud-app',
    templateUrl: './app.component.html',
    providers: [ SettingsService ]
})

export class AppComponent {
}
