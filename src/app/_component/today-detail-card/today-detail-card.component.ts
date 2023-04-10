import { Component, Input } from '@angular/core';
import { Current } from '../../_model/weather.model';

@Component({
  selector: 'app-today-detail-card',
  templateUrl: './today-detail-card.component.html',
  styleUrls: ['./today-detail-card.component.css']
})
export class TodayDetailCardComponent {

  @Input() todayWeatherForecast: Current | undefined;


}
