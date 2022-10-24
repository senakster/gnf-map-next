type Municipality = {
    geometry: GeometryWithCoordinates
    properties: { label_dk: string }
}

type GeometryWithCoordinates = Geometry & {
    coordinates: [number, number][],
}

type Group = {
    title: string
    facebook: string
    type: string
    municipality: string
}

type GroupMunicipality = {
    title: string
    groups: Group[]
}