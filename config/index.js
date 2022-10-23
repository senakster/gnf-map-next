export const geoJSON_URL = 'https://raw.githubusercontent.com/magnuslarsen/geoJSON-Danish-municipalities/master/municipalities/municipalities.geojson'
export const mapBounds = {
    "centerDefault": {
        "lat": 56.3379289,
        "lng": 5,
        "coords": [11, 56.3379289]
    },
    "bounds": {
        "Denmark": [
            [
                5,
                52.682124,
            ],
            [
                16.608204,
                58.815147
            ]
        ]
    },
    "snaptobounds": {
        "Denmark": [
            [
                15.212128,
                54.543167
            ],
            [
                15.212128,
                57.774234,
            ],
            [
                8.000389,
                57.774234,
            ],
            [
                8.000389,
                54.543167
            ]
        ]
    }
}
const config = {
    geoJSON_URL,
    mapBounds,
}

export default config