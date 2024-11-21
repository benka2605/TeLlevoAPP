import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { ModalController } from '@ionic/angular';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { viajes } from 'src/app/Pages/model/viajes';
import { Viaje } from '../../servicio/crudfirebase.service'

import { AuthService } from '../../servicio/auth.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  suggestions: any[] = [];

  showSearchForm: boolean = false;
  showBtn:boolean = false;
  map: mapboxgl.Map;
  marker: mapboxgl.Marker;
  defaultCoordinates: [number, number] = [-70.57887290490055, -33.598406972538456];
  defaultMarker: mapboxgl.Marker;
  routeLayerId: string = 'routeLayer';
  savedRoutes: Array<{ start: [number, number], end: [number, number] }> = []; // Arreglo para guardar rutas
  searchQuery: string = '';
  

  @Output() Viaje = new EventEmitter<Viaje>();

  private isProcessing = false;

  usuario:string|null='';
  allowRouteCreation: boolean;

  constructor(private modalController: ModalController,private authService:AuthService) {}

  ngOnInit(): void {
    this.initializeMap(this.defaultCoordinates);
    this.authService.getAuthState().subscribe(user => {
      if (user) {
        this.usuario = user.displayName;
      }
    });
  }
  

  initializeMap(coordinates: [number, number]) {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoidG9teTMwMDAiLCJhIjoiY20yY29xaXVoMGoxYTJscHpkMmQ2M3R0cCJ9.28SM7i7STdT6iz-sEsghZg';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: coordinates,
      zoom: 15,
    });
    
    this.defaultMarker = new mapboxgl.Marker({ color: 'red' })
      .setLngLat(coordinates)
      .addTo(this.map);

    this.map.on('click', (event) => {
      if (this.isProcessing) return;
      this.isProcessing = true;

      const coords = event.lngLat;
      this.getNombreDestino(coords.lng, coords.lat);
    });
  }

  onSearchInput() {
    if (this.searchQuery.length > 2 && !this.isProcessing) {
      this.isProcessing = true;
      this.searchLocation(this.searchQuery);
    } else {
      this.suggestions = []; // Limpiar sugerencias si no hay suficientes caracteres
    }
  }

  searchLocation(query: string) {
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${(mapboxgl as any).accessToken}`;

    fetch(geocodingUrl)
      .then((response): Promise<{ features: any[] }> => response.json())
      .then(data => {
        if (data.features.length > 0) {
          this.suggestions = data.features; // Almacenar las sugerencias
        } else {
          this.suggestions = []; // Limpiar sugerencias si no se encuentran resultados
        }
        this.isProcessing = false; // Permitir nuevas búsquedas
      })
      .catch(error => {
        console.error('Error al buscar la ubicación:', error);
        this.suggestions = []; // Limpiar sugerencias en caso de error
        this.isProcessing = false; // Permitir nuevas búsquedas
      });
  }

  selectSuggestion(suggestion: any) {
    const coords = suggestion.geometry.coordinates;
    this.addMarker(coords[0], coords[1]); // Añadir un marcador en la ubicación seleccionada
    this.map.flyTo({ center: coords, zoom: 15 }); // Mover el mapa a la ubicación
    this.getNombreDestino(coords[0], coords[1]); // Obtener el nombre del destino
    this.suggestions = []; // Limpiar sugerencias
    this.searchQuery = suggestion.place_name; // Mostrar el nombre seleccionado en el input
  }

  addMarker(lng: number, lat: number) {
    if (this.marker) {
      this.marker.remove();
    }
    this.marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(this.map);
  }

  

  getNombreDestino(lng: number, lat: number) {
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${(mapboxgl as any).accessToken}`;
    
    fetch(geocodingUrl)
      .then((response): Promise<{ features: any[] }> => response.json())
      .then(data => {
        if (data.features.length > 0) {
          const nombreDestino = data.features[0].place_name;
          this.addMarker(lng, lat);
          const geojson = {};
          setTimeout(() => {
            this.presentConfirm(nombreDestino, this.defaultCoordinates, [lng, lat], geojson);
          }, 3000);
          this.drawRoute(this.defaultCoordinates, [lng, lat]);
        } else {
          alert('No se pudo obtener el nombre de la ubicación.');
          this.isProcessing = false;
        }
      })
      .catch(error => {
        console.error('Error al obtener el nombre del destino:', error);
        alert('Error al obtener el nombre del destino.');
        this.isProcessing = false;
      });
  }

  async presentConfirm(destino: string, start: [number, number], end: [number, number], geojson: any) {
    const modal = await this.modalController.create({
      component: ConfirmModalComponent,
      componentProps: { destino: destino },
    });
  
    modal.onDidDismiss().then((data) => {
      this.isProcessing = false;
      if (data.data && data.data.confirmado) {
        // Crea un objeto Viaje y emítelo, asegurándote de incluir todos los campos necesarios
        const viaje: Viaje = {
          costo_persona: '0',
          destino: destino,
          disponibles: 0,
          encuentro: '',
          ruta: { start, end, geojson },
          usuario:this.usuario || 'Usuario Anónimo',
          uid:''
        };
        this.Viaje.emit(viaje); // Emitimos el objeto viaje
         // Emitimos el objeto viaje
      }
    });
  
    return await modal.present();
  }
  


  openMap() {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      mapContainer.style.display = 'block';
      this.map.setCenter(this.defaultCoordinates);
      this.map.resize();
      this.showSearchForm = true;
      this.showBtn = true;
    }
  }
  
  hideSearchForm() {
    this.showSearchForm = false; // Cambia el estado a falso para ocultar el formulario
  }

  closeMap() {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      mapContainer.style.display = 'none';
      this.showSearchForm = false;
      this.showBtn = false;
    }
  }

  drawRoute(start: [number, number], end: [number, number]) {
    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(',')};${end.join(',')}?geometries=geojson&access_token=${(mapboxgl as any).accessToken}`;
    
    fetch(directionsUrl)
      .then((response): Promise<{ routes: any[] }> => response.json())
      .then(data => {
        if (data.routes && data.routes[0]) {
          const route = data.routes[0].geometry;

          // Guardar la ruta en el arreglo
          this.savedRoutes.push({ start, end });

          if (this.map.getLayer(this.routeLayerId)) {
            this.map.removeLayer(this.routeLayerId);
            this.map.removeSource(this.routeLayerId);
          }

          this.map.addLayer({
            id: this.routeLayerId,
            type: 'line',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: route,
              },
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#3880ff',
              'line-width': 5,
            },
          });
        } else {
          throw new Error('No routes found');
        }
      })
      .catch(error => {
        console.error('Error al obtener la ruta:', error);
        alert('Error al obtener la ruta.');
      });
  }

  // Método para visualizar rutas guardadas
  visualizeSavedRoutes() {
    this.savedRoutes.forEach(route => {
      this.drawRoute(route.start, route.end); // Dibuja cada ruta guardada
    });
  }
}
