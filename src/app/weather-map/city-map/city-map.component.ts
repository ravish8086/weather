import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { OpenaiService } from '../../_service/openai.service';
import { BehaviorSubject } from 'rxjs';

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
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

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

  /**
   * Life cycle hook, called after ngInit.
   * Load the google map and marker based on the entered and selected address on google map
   */
  ngAfterViewInit(): void {
    const searchBox = new google.maps.places.SearchBox(this.searchField?.nativeElement);
    // Event listner to observe any address change or selection
    searchBox.addListener('places_changed', () => {
      this.loading.next(true);
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

  /**
   * Add Marker to the entered city.
   *
   * @param place
   */
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

  /**
   * Zoom in the google MAP
   */
  zoomIn() {
    // @ts-ignore
    if (this.zoom < this.options.maxZoom) this.zoom++;
  }

  /**
   * Zoom Out the google MAP
   */
  zoomOut() {
    // @ts-ignore
    if (this.zoom > this.options.minZoom) this.zoom--;
  }

  /**
   * Rest API call to Open AI to get the suggestu=ion for
   * "What can I do in a given City"
   */
  askAI() {
    this.loading.next(true);
    this.openAI.generateText(`What can I do in ${this.todoLookup} ?`)
      .then((message) => {
        this.openAIRemarks = message.split('\n');
        console.log(this.openAIRemarks);
        this.loading.next(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }


}
