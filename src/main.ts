import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { LOAD_WASM } from 'ngx-scanner-qrcode';

LOAD_WASM().subscribe(res => {
  
});

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
