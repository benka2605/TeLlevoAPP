import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { ModalController } from '@ionic/angular';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  map: mapboxgl.Map;
  marker: mapboxgl.Marker; // Almacenar el único marcador
  defaultCoordinates: [number, number] = [-70.57887290490055, -33.598406972538456];
  defaultMarker: mapboxgl.Marker;
  
  @Output() destinoSeleccionado = new EventEmitter<string>();
  
  private isProcessing = false; // Bandera para controlar la emisión

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {
    this.initializeMap(this.defaultCoordinates);
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
      if (this.isProcessing) return; // Prevenir múltiples clics
      this.isProcessing = true; // Marcar que estamos procesando un clic

      const coords = event.lngLat;
      this.getNombreDestino(coords.lng, coords.lat); // Obtén el nombre del destino
    });
  }

  addMarker(lng: number, lat: number) {
    if (this.marker) {
      this.marker.remove(); // Remueve el marcador anterior si existe
    }
    this.marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(this.map);
  }

  getNombreDestino(lng: number, lat: number) {
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${(mapboxgl as any).accessToken}`;
    
    fetch(geocodingUrl)
      .then(response => response.json())
      .then(data => {
        if (data.features.length > 0) {
          const nombreDestino = data.features[0].place_name; // Obtén el nombre del lugar
          this.addMarker(lng, lat); // Añadir marcador en la ubicación seleccionada
          this.presentConfirm(nombreDestino); // Abrir modal de confirmación
        } else {
          alert('No se pudo obtener el nombre de la ubicación.');
          this.isProcessing = false; // Restablecer al cerrar
        }
      })
      .catch(error => {
        console.error('Error al obtener el nombre del destino:', error);
        alert('Error al obtener el nombre del destino.');
        this.isProcessing = false; // Restablecer al cerrar
      });
  }

  async presentConfirm(destino: string) {
    const modal = await this.modalController.create({
      component: ConfirmModalComponent,
      componentProps: { destino: destino },
    });

    modal.onDidDismiss().then((data) => {
      this.isProcessing = false; // Restablecer al cerrar
      if (data.data && data.data.confirmado) {
        this.destinoSeleccionado.emit(destino); // Emitir nombre
        this.closeMap(); // Cerrar mapa
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
    }
  }

  closeMap() {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      mapContainer.style.display = 'none'; // Solo oculta el mapa, no lo elimina
    }
  }
}
