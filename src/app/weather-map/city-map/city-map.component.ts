import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { OpenaiService } from '../../_service/openai.service';

@Component({
  selector: 'app-city-map',
  templateUrl: './city-map.component.html',
  styleUrls: ['./city-map.component.css']
})
export class CityMapComponent implements OnInit {

  @ViewChild('mapSearchField') searchField: ElementRef | undefined;
  @ViewChild(GoogleMap) map: GoogleMap | undefined;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow | undefined;

  markers: any = [];
  zoom = 12;
  center: any;
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  value: any;
  todoLookup: string | undefined = 'Austin Tx';
  openAIRemarks: string[] | undefined;

  constructor(private openAI: OpenaiService) {
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
    this.askAI();
  }

  ngAfterViewInit(): void {
    const searchBox = new google.maps.places.SearchBox(this.searchField?.nativeElement);
    searchBox.addListener('places_changed', () => {
      this.openAIRemarks = undefined;
      this.todoLookup = undefined;
      const places = searchBox.getPlaces();
      if (places?.length === 0) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      if (places) {
        this.todoLookup = places[0].formatted_address;
        this.askAI();
      }
      places?.forEach(place => {
        if (!place.geometry || !place.geometry.location) {
          return;
        }

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
        this.addMarker(place);
      });
      this.map?.fitBounds(bounds);
    });
  }

  addMarker(place: google.maps.places.PlaceResult) {
    this.markers.push({
      position: {
        lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng(),
      },
      label: {
        color: 'red',
        text: place.formatted_address,
      },
      title: place.formatted_address,
      info: place.business_status,
      options: {
        animation: google.maps.Animation.DROP,
      },
    });

  }

  zoomIn() {
    // @ts-ignore
    if (this.zoom < this.options.maxZoom) this.zoom++;
  }

  zoomOut() {
    // @ts-ignore
    if (this.zoom > this.options.minZoom) this.zoom--;
  }

  askAI() {
    this.openAI.generateText(`What can I do in ${this.todoLookup} ?`)
      .then((message) => {
        this.openAIRemarks = message.split('\n');
        console.log(this.openAIRemarks);
      })
      .catch((error) => {
        console.error(error);
      });
  }


}
