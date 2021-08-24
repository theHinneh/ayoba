import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  var old = console.log;
  var logger: any = document.getElementById('log');
  console.log = function (message) {
    if (typeof message == 'object') {
      logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
    } else {
      logger.innerHTML += message + '<br />';
    }
  }
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err: any) => console.error(err));
