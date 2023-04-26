import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityMapComponent } from './city-map/city-map.component';

const routes: Routes = [
  { path: '', component: CityMapComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherMapRoutingModule {
}
