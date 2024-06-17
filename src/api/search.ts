import { Place } from "./Place";

interface SearchRespone {
    features: {
        geometry: {
            coordinates: number[];
        }
        properties: {
            place_id: number;
            display_name: string;
        }
    }[]
}

export const search = async (term: string) => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${term}&format=geojson&addressdetails=1&layer=address&limit=5`
    );
    const data: SearchRespone = await response.json();

    const places: Place[] = data.features.map((feature) => {
        return {
            id: feature.properties.place_id,
            name: feature.properties.display_name,
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0],
        }
    });

    return places;
}

