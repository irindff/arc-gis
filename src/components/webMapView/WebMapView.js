import React from 'react';
import {loadModules} from 'esri-loader';
import './WebMapView.scss';


export class WebMapView extends React.Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
    }

    startMap() {
        // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer'], {css: true})
            .then(([ArcGISMap, MapView, FeatureLayer]) => {
                const map = new ArcGISMap({
                    basemap: "streets-navigation-vector",
                    spatialReference: {
                        "wkid": 4141,
                        "latestWkid": 4141
                    },
                });

                this.view = new MapView({
                    container: this.mapRef.current,
                    map: map,
                    center: [-118.80543, 34.02700],
                    // center: [34.811, 32.068],
                    zoom: 10,

                    ui: {
                        components: ["attribution"] // empty the UI, except for attribution
                    }
                });

                const earthquakesFeatureLayer = new FeatureLayer({
                    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/ks_earthquakes_since_2000/FeatureServer/0",
                })
                map.add(earthquakesFeatureLayer);

                // Trailheads feature layer (points)
                const trailheadsLayer = new FeatureLayer({
                    // url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
                    url: "https://services1.arcgis.com/8lB32dT1LAPsoSlg/arcgis/rest/services/Israel_Trail/FeatureServer/1/query?outFields=*&where=1%3D1"
                });

                map.add(trailheadsLayer);

                //Trails feature layer (lines)
                const trailsLayer = new FeatureLayer({
                    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
                });

                map.add(trailsLayer, 0);

                // Parks and open spaces (polygons)
                const parksLayer = new FeatureLayer({
                    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
                });

                map.add(parksLayer, 0);
            });


    }

    showBaseMap() {
        // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadModules(['esri/widgets/BasemapToggle', 'esri/widgets/BasemapGallery'], {css: true})
            .then(([BasemapToggle, BasemapGallery]) => {

                const basemapToggle = new BasemapToggle({
                    view: this.view,
                    nextBasemap: "satellite"
                });

                const basemapGallery = new BasemapGallery({
                    view: this.view,
                    source: {
                        portal: {
                            url: "https://www.arcgis.com",
                            useVectorBasemaps: true  // Load vector tile basemaps
                        }
                    }
                });
                this.view.ui.add(basemapToggle, "bottom-right");
                this.view.ui.add(basemapGallery, "top-right");
            });
    }


    componentDidMount() {
        this.startMap();
        this.showBaseMap();


    }

    componentWillUnmount() {
        if (this.view) {
            // destroy the map view
            this.view.container = null;
        }
    }


    render() {
        return (
            <div>
                <div className="webMap" ref={this.mapRef}/>


            </div>
        );
    }
}