import { Component, Input } from '@angular/core';
import { Daily } from '../../_model/weather.model';

@Component({
  selector: 'app-week-forecast',
  templateUrl: './week-forecast.component.html',
  styleUrls: ['./week-forecast.component.css']
})
export class WeekForecastComponent {
  @Input() weekForecast: Daily[] | undefined;

  daysWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  constructor() { }

  ngOnInit(): void {
  }
}
