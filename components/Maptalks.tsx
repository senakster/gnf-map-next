import Script from "next/script"
import React, { useState, useEffect } from 'react'
import Loading from '@components/Loading'
import { Geometry, Map } from 'maptalks'
import config, { mapBounds } from '../config/'
import {onlyUnique} from '../helpers'

type Props = {
    municipalities: GeoJSON.FeatureCollection,
    pageData: any[]
    toggle: (params: {municipality?: string}) => void
}
let map: Map;
const Maptalks = (props: Props) => {
    
    const {municipalities, pageData, toggle} = props
    // const [map, setMap] = useState<Map>() 

    const initMap = () => {
        const {mapBounds} = config
        map = new maptalks.Map('map', {
            center: mapBounds.centerDefault.coords,
            zoom: 5,
            minZoom: 5,
            maxZoom: 10,
            pitch: 0,
            // draggable: false,        //disable drag
            // dragPan: false,          //disable drag panning
            dragRotate: false,       //disable drag rotation
            // dragPitch: false,        //disable drag pitch
            // scrollWheelZoom: false,  //disable wheel zoom
            // touchZoom: false,        //disable touchzoom
            // doubleClickZoom: false,  //disable doubleclick zoom
            // baseLayer: new maptalks.TileLayer('base', {
            //     'urlTemplate': 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            //     'subdomains': ['a', 'b', 'c', 'd'],
            //     'attribution': '&copy; <a href="http://www.osm.org/copyright">OSM</a> contributors, ' +
            //         '&copy; <a href="https://carto.com/attributions">CARTO</a>'
            // }),  
            layers: [
                new maptalks.VectorLayer('municipalities'),
                new maptalks.VectorLayer('labels')
            ]
        });
        // setMap(map)
        drawMunicipalities()

        fitBounds()
    }
    const fitBounds = ()  => {
        if (!map) return
        const polygon = new maptalks.Polygon([mapBounds.snaptobounds.Denmark], {
            symbol: {
                'lineColor': 'transparent',
                'lineWidth': 0,
                polygonFill: 'transparent',
                polygonOpacity: 0
            }})
        polygon.addTo(map.getLayer('municipalities'))
        const extent = polygon.getExtent()
        map.setMaxExtent(extent);   
        map.fitExtent(extent, 0)
        map.setZoom(map.getZoom(), { animation: true });
        map.setMinZoom(map.getZoom());
    }

    const drawMunicipalities = () => {
        // console.log(municipalities, maptalks.GeoJSON.toGeometry(municipalities))
        const layer = map && map.getLayer('municipalities')
        if (!layer) return
  
        // console.log('#municipalities: ', municipalities.features.map(f => f.properties?.label_dk).filter(onlyUnique).length)
        municipalities.features.forEach(d => { 
            // d.properties?.label_dk && console.log(`${saneNames(d.properties?.label_dk)} groups: `, pageData.filter(m => m.title === saneNames(d.properties?.label_dk))[0].groups.length)
            
            const groupCount = pageData.filter(m => m.title === saneNames(d.properties?.label_dk))[0]?.groups?.length || 0
                // console.log(pageData.filter(g => g.municipality?.title == d?.properties?.label_dk))
            // const groups = getGroupsByMunicipality(d.properties?.label_dk)
            // console.log(groups)
            const { coordinates } = d.geometry as unknown as GeometryWithCoordinates
            // console.log(coordinates)
            const polygon = new maptalks.Polygon(coordinates,
                {
                    visible: true,
                    editable: false,
                    cursor: 'pointer',
                    shadowBlur: 1,
                    shadowColor: 'black',
                    draggable: false,
                    dragShadow: false, // display a shadow during dragging
                    drawOnAxis: null,  // force dragging stick on a axis, can be: x, y
                    symbol: {
                        'lineColor': '#000000',
                        'lineWidth': 2,
                        'polygonFill': groupCount > 0 ? 'hsl(141, 73%, 42%)' : 'beige',
                        'polygonOpacity': groupCount > 0 ? .5 + 0.1 * groupCount : 1
                    }
                }).on('mouseenter', function (e: any) {
                    //update markerFill to highlight
                    e.target.updateSymbol({
                        'polygonFill': '#16C7B8',
                        'polygonOpacity': 1,
                    });
                }).on('mouseout', function (e: any) {
                    //reset color
                    if(e.target.classList?.contains('active')) return 
                    e.target.updateSymbol({
                        'polygonFill': groupCount > 0 ? 'hsl(141, 73%, 42%)' : 'beige',
                        'polygonOpacity': groupCount > 0 ? .5 + 0.1 * groupCount : 1
                    });
                }).on('click', (e:any) => {
                    map.fitExtent(e.target.getExtent(),-1)
                    console.log(e.target.getExtent(), d.properties?.label_dk)
                    console.log('fly to e.target offset left 20vw')
                    toggle({ municipality: d.properties?.label_dk })
                    
                });
            polygon.addTo(layer)
            var label = new maptalks.Label(d.properties?.label_dk,
                polygon.getCenter(),
                {
                    'draggable': true,
                    'textSymbol': {
                        'textFaceName': 'Dosis',
                        'textFill': 'white',
                        'textHaloFill': 'gray',
                        'textHaloRadius': 1,
                        'textSize': { stops: [[7, 2], [14, 30]] },
                        'textVerticalAlignment': 'top'
                    },
                }).addTo(map.getLayer('labels'))
        })
    }

    // const getGroupsByMunicipality = (municipality: Municipality, ) => {
    //     return pageData.filter(g => g.municipality?.title == municipality?.properties?.label_dk)
    // }

    return (
        <>
            <section className="">
                <div id="map" className="h-screen w-screen">
                    <Loading type="map" /> 
                </div>
            </section>
            <Script
                type="text/javascript"
                src="https://cdn.jsdelivr.net/npm/maptalks/dist/maptalks.min.js"
                onLoad={initMap}
            />
        </>

    )
}

export default Maptalks

const highlightPolygon = (target: any) => {
    
}

export const saneNames = (label_dk: string) => {
    return label_dk == 'Brønderslev-Dronninglund' ? 'Brønderslev'
        : label_dk
}