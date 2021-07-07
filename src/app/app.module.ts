import {
  NgModule,
  ErrorHandler,
  Injectable,
  Injector,
  InjectionToken,
  Inject,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import * as Rollbar from 'rollbar';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';

const rollbarConfig = {
  accessToken: '9366220067ea47eeaf7abf3fd7ad603a',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
  constructor(@Inject(RollbarService) private rollbar: Rollbar) {}

  handleError(err: any): void {
    this.rollbar.error(err.originalError || err);
    this.rollbar.log(err.originalError || err);
  }
}

export function rollbarFactory() {
  return new Rollbar(rollbarConfig);
}

export const RollbarService = new InjectionToken<Rollbar>('rollbar');

@NgModule({
  declarations: [AppComponent, MainComponent, SplashscreenComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, BrowserAnimationsModule],
  providers: [
    { provide: ErrorHandler, useClass: RollbarErrorHandler },
    { provide: RollbarService, useFactory: rollbarFactory },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
