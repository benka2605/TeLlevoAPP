import { Component, AfterViewInit, Input } from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements AfterViewInit {

  @Input() lat: number;
  @Input() lng: number;
  map!: mapboxgl.Map;
  userMarker!: mapboxgl.Marker;

  constructor() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoidG9teTMwMDAiLCJhIjoiY20yY29xaXVoMGoxYTJscHpkMmQ2M3R0cCJ9.28SM7i7STdT6iz-sEsghZg';
  }

  ngAfterViewInit() {
    this.initializeMap();
  }

  initializeMap() {
    this.map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.lng, this.lat],
      zoom: 14,
    });

    // Marcador de usuario
    this.userMarker = new mapboxgl.Marker({ color: 'blue' }).setLngLat([this.lng, this.lat]).addTo(this.map);
    
    // Obtener ubicación del usuario
    this.getUserLocation();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLng = position.coords.longitude;
          const userLat = position.coords.latitude;

          // Actualiza el centro del mapa y la posición del marcador
          this.map.setCenter([userLng, userLat]);
          this.userMarker.setLngLat([userLng, userLat]);
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      console.error('La geolocalización no es soportada por este navegador.');
    }
  }
}


