import { Injectable } from '@angular/core';
import { Coord, CoordinateWeather, WeatherData } from '../_model/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherAPI: string = 'https://openweathermap.org/data/2.5/onecall';
  geoCodeAPI: string = 'https://openweathermap.org/data/2.5/weather';
  appId: string = 'XX';

  constructor() {
  }

  async getCoordinates(city: string): Promise<CoordinateWeather> {
    const url = `${this.geoCodeAPI}?q=${city}&units=metric&appid=${this.appId}`;
    let coordinateWeather = await fetch(url);
    return coordinateWeather.json();
  }

  async getWeatherDetails(coord: Coord): Promise<WeatherData> {
    const url = `${this.weatherAPI}?lat=${coord.lat}&lon=${coord.lon}&appid=${this.appId}&exclude=hourly,daily`;
    let weatherData = await fetch(url);
    return weatherData.json();
  }

}
