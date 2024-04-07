import axios, { AxiosResponse } from 'axios';
import { GOOGLE_MAPS_API_KEY } from '@env';

if (!GOOGLE_MAPS_API_KEY) {
    throw new Error(
        'You must provide a {GOOGLE_MAPS_API_KEY} in your environment variable configuration.'
    );
}

type AddressComponentTypes =
    | 'street_number'
    | 'route'
    | 'neighborhood'
    | 'sublocality'
    | 'locality'
    | 'administrative_area_level_2'
    | 'administrative_area_level_1'
    | 'political'
    | 'country'
    | 'political'
    | 'postal_code';
type ReverseGeocodeResponse = AxiosResponse<{
    status:
        | 'OK'
        | 'ZERO_RESULTS'
        | 'REQUEST_DENIED'
        | 'INVALID_REQUEST'
        | 'UNKNOWN_ERROR';
    results:
        | [
              {
                  address_components: {
                      long_name: string;
                      short_name: string;
                      types: AddressComponentTypes[];
                  }[];
              }
          ]
        | [];
    formatted_addrees: string;
}>;

const instance = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api',
});

export async function reverseGeocode(lat: number, lng: number) {
    const response = await instance.post<undefined, ReverseGeocodeResponse>(
        `/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
    );
    // console.log(response.data);
    if (response.data.status !== 'OK' || response.data.results.length === 0) {
        throw new Error('Failed to retrieve reverse geocode location.');
    }

    return response.data.results[0];
}
