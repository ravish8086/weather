import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CoordinateWeather, Current, Daily, WeatherData } from '../../_model/weather.model';
import { WeatherService } from '../../_service/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  title = 'MET-CS 701 Weather Application';
  loading: boolean = true;

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  value = 'Austin';
  coordinateWeather: CoordinateWeather | undefined;
  weatherData: WeatherData | undefined;

  weekForecast: Daily[] | undefined;
  imageURL: any;
  weatherDescription: string | undefined;
  currentTime: Date | undefined;
  location: any;
  todayWeather: Current | undefined;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadWeatherDetails();
  }

  async getGeolocation() {
    this.coordinateWeather = await this.weatherService.getCoordinates(this.value);
    return this.coordinateWeather;
  }

  async getWeatherDetails(coordinateWeather: CoordinateWeather) {
    this.weatherData = await this.weatherService.getWeatherDetails(coordinateWeather.coord);
    return this.weatherData;
  }

  loadWeatherDetails() {
    this.loading = true;
    this.getGeolocation().then((coordinateWeather: CoordinateWeather) => {
      this.getWeatherDetails(coordinateWeather).then((weatherData) => {
        this.weatherData = weatherData;
        this.weekForecast = this.weatherData.daily;
        this.todayWeather = this.weatherData.current;
        const weatherIcon = this.todayWeather.weather[0].icon;
        this.currentTime = new Date(this.todayWeather.dt * 1000);
        this.weatherDescription = this.todayWeather.weather[0].description;
        this.imageURL = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        this.loading = false;
        this.location = this.coordinateWeather?.name;
      });
    });
  }
}
