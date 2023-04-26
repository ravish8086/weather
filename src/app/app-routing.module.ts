import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./weather-forecast/weather-forecast.module').then(m => m.WeatherForecastModule)
  },
  {
    path: 'weather',
    loadChildren: () => import('./weather-forecast/weather-forecast.module').then(m => m.WeatherForecastModule)
  },
  {
    path: 'city',
    loadChildren: () => import('./weather-map/weather-map.module').then(m => m.WeatherMapModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
