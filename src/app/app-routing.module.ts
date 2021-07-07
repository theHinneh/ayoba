import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';

const routes: Routes = [
  { path: '', component: SplashscreenComponent },
  { path: 'main', component: MainComponent },
  { path: '***', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
