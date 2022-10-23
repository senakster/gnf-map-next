import Script from "next/script"
import { useState, useEffect } from 'react'
import Loading from '@components/Loading'
import { Geometry, Map } from 'maptalks'
import config, { mapBounds } from '../config/'

console.log(config)
type GeometryWithCoordinates = Geometry & {
    coordinates: [number, number][]
}
type Props = {
    data: GeoJSON.FeatureCollection
}
let map: Map;
const Maptalks = (props: Props) => {
    
    const {data} = props
    // const [map, setMap] = useState<Map>() 

    const initMap = () => {
        const {mapBounds} = config
        map = new maptalks.Map('map', {
            center: mapBounds.centerDefault.coords,
            zoom: 7,
            minZoom: 7,
            maxZoom: 13,
            // baseLayer: new maptalks.TileLayer('base', {
            //     'urlTemplate': 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            //     'subdomains': ['a', 'b', 'c', 'd'],
            //     'attribution': '&copy; <a href="http://www.osm.org/copyright">OSM</a> contributors, ' +
            //         '&copy; <a href="https://carto.com/attributions">CARTO</a>'
            // }),
            layers: [
                new maptalks.VectorLayer('municipalities')
            ]
        });
        // setMap(map)
        addData()
        fitBounds()
    }
    const fitBounds = ()  => {
        if (!map) return
        const polygon = new maptalks.Polygon([mapBounds.snaptobounds.Denmark], {
            symbol: {
                'lineColor': 'transparent',
                'lineWidth': 0,
                polygonFill: '#fff',
                polygonOpacity: 0.1
            }})
        polygon.addTo(map.getLayer('municipalities'))
        const extent = polygon.getExtent()
        map.setMaxExtent(extent);   
        map.fitExtent(extent, 0)
        map.setZoom(map.getZoom(), { animation: true });
        map.setMinZoom(map.getZoom());
    }
    const addData = () => {
        // console.log(data, maptalks.GeoJSON.toGeometry(data))
        const layer = map && map.getLayer('municipalities')
        if (!layer) return
        data.features.forEach(d => { 
            const { coordinates } = d.geometry as GeometryWithCoordinates
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
                        'lineColor': '#34495e',
                        'lineWidth': 1,
                        'polygonFill': 'rgb(135,196,240)',
                        'polygonOpacity': 0.2
                    }
                })
            // const polygon = { 
            //     ...maptalks.GeoJSON.toGeometry(d), 
            //     visible: true,
            //     editable: true,
            //     cursor: 'pointer',
            //     shadowBlur: 0,
            //     shadowColor: 'black',
            //     draggable: false,
            //     dragShadow: false, // display a shadow during dragging
            //     drawOnAxis: null,  // force dragging stick on a axis, can be: x, y
            //     symbol: {
            //         'lineColor': '#34495e',
            //         'lineWidth': 2,
            //         'polygonFill': 'rgb(135,196,240)',
            //         'polygonOpacity': 0.6
            //     }
            // }
            // const polygon = new maptalks.Polygon([coordinates])
            // console.log(polygon)
            // console.log({...maptalks.GeoJSON.toGeometry(d), }); 
            // maptalks.GeoJSON.toGeometry(d).addTo(map.getLayer('municipalities'))})
            polygon.addTo(layer)
        })
    }
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

