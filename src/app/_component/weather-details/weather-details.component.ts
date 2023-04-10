import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnChanges{
  @Input() weatherForecast: any;
  @Input() weekForecastData: any;

  ngOnChanges(changes: SimpleChanges): void {
    this.weatherForecast = changes['weatherForecast'].currentValue;
    this.weekForecastData = changes['weekForecastData'].currentValue;

    console.log(this.weekForecastData)
  }

}
