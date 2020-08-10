import React from 'react';
import {loadModules} from 'esri-loader';
import './BaseMap.scss';


export function BaseMapToggle(view) {
    return loadModules(['esri/widgets/BasemapToggle', 'esri/widgets/BasemapGallery'], {css: true})
        .then(([BasemapToggle, BasemapGallery]) => {
            const BaseMapToggle = new BasemapToggle({
                view: view,
                nextBasemap: "satellite"
            });

        })
}



/*
export default class BaseMap extends React.Component {
    constructor(props) {
        super(props);

    }
componentDidMount() {
    console.log(this.props.view)
}

   componentDidMount() {
          // lazy load the required ArcGIS API for JavaScript modules and CSS
          loadModules(['esri/Map', 'esri/views/MapView', 'esri/widgets/BasemapToggle', 'esri/widgets/BasemapGallery'], {css: true})
              .then(([BasemapToggle, BasemapGallery]) => {

                  const BaseMapToggle = new BasemapToggle({
                      view: this.props.view,
                      nextBasemap: "satellite"
                  });

                  const BaseMapGallery = new BasemapGallery({
                      view: this.props.view,
                      source: {
                          portal: {
                              url: "https://www.arcgis.com",
                              useVectorBasemaps: true  // Load vector tile basemaps
                          }
                      }
                  });
                  this.props.view.ui.add(BaseMapToggle, "bottom-right");
                  this.props.view.ui.add(BaseMapGallery, "top-right");
              });
      }


render() {
    return (
        <div className='baseMap'>
            123
        </div>
    );
}
}
 */