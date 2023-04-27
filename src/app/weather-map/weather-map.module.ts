import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { CityMapComponent } from './city-map/city-map.component';
import { WeatherMapRoutingModule } from './weather-map-routing.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CityMapComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    WeatherMapRoutingModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule
  ]
})
export class WeatherMapModule { }
