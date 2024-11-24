import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import * as GeoJSON from 'geojson';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent  implements OnInit {

  constructor() { }
  mapa: mapboxgl.Map;
  defaultMarker: mapboxgl.Marker;
  marker:mapboxgl.Marker;
  routeSource: mapboxgl.GeoJSONSource;
  startPoint: [number, number] = [-70.57887290490055, -33.598406972538456];
  mostrarBtn:boolean = false;

  

  ngOnInit() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoidG9teTMwMDAiLCJhIjoiY20yY29objR5MG8yZzJqcHYzeGtkcGI1YSJ9.TX_lknDmvQFgLgWi7-WSxQ';
    this.mapa = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.startPoint, // starting position [lng, lat]
      zoom: 16, // starting zoom
    });

      this.defaultMarker = new mapboxgl.Marker({
        color: "blue",
    }).setLngLat([-70.57887290490055, -33.598406972538456])
        .addTo(this.mapa);

            
    
  }

  crearMarcador(lng:number,lat:number){
    if(this.marker){
      this.marker.remove()
    }
      this.marker = new mapboxgl.Marker({
        color: "yellow",
    }).setLngLat([lng,lat])
        .addTo(this.mapa); 
  }

  async dibujarRuta(lng:number,lat:number){
    if (!this.mapa) {
      console.error("Map object is not initialized");
      return;
    }
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${this.startPoint[0]},${this.startPoint[1]};${lng},${lat}?steps=true&geometries=geojson&access_token=${(mapboxgl as any).accessToken}`,
      { method: 'GET' }
    );
    const json = await query.json();
  const data = json.routes[0];
  const route = data.geometry.coordinates;

  // Asegurarse de que la estructura de geojson es correcta
  const geojson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection', // 'FeatureCollection' para una colección de características
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString', // 'LineString' porque es una ruta
          coordinates: route
        }
      }
    ]
  };

  // Verifica si la fuente 'route' existe, y si no, la crea como GeoJSONSource
  const source = this.mapa.getSource('route');
  if (source) {
    // Asegúrate de que la fuente es de tipo GeoJSONSource
    if ((source as mapboxgl.GeoJSONSource).setData) {
      (source as mapboxgl.GeoJSONSource).setData(geojson);
    }
  } else {
    // Si la fuente no existe, agrega la capa y la fuente como GeoJSONSource
    this.mapa.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geojson
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 5,
        'line-opacity': 0.75
      }
    });
  }
}

cerrarMapa(){
  const mapContainer = document.getElementById('map');
  if(mapContainer){
    mapContainer.style.display="none";
    this.mostrarBtn=false;
  }
}
abrirMapa(){
  const mapContainer = document.getElementById('map');
  if(mapContainer){
    mapContainer.style.display="block";
    this.mostrarBtn=true;
  }
}
}
