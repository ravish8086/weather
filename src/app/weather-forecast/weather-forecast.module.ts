import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from './forecast/forecast.component';
import { WeatherDetailsComponent } from '../_component/weather-details/weather-details.component';
import { WeekForecastComponent } from '../_component/week-forecast/week-forecast.component';
import { TodayDetailCardComponent } from '../_component/today-detail-card/today-detail-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { WeatherForecastRoutingModule } from './weather-forecast-routing.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    ForecastComponent,
    WeatherDetailsComponent,
    WeekForecastComponent,
    TodayDetailCardComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    WeatherForecastRoutingModule,
    MatCardModule
  ]
})
export class WeatherForecastModule {
}
