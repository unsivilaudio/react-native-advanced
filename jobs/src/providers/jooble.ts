import axios, { AxiosResponse } from 'axios';
import { JOOBLE_API_KEY } from '@env';

if (!JOOBLE_API_KEY) {
    throw new Error(
        'You must provide a {JOOBLE_API_KEY} in your environment variables configuration.'
    );
}

const instance = axios.create({
    baseURL: `https://jooble.org/api/${JOOBLE_API_KEY}`,
});

export type Job = {
    title: string;
    location: string;
    snippet: string;
    salary: string;
    source: string;
    type: string;
    link: string;
    company: string;
    updated: string;
    id: number;
};

export type FetchedJobs = {
    totalCount: number;
    jobs: Job[];
};

type FetchJobsByLocationRequest = {
    location: string;
};

type FetchJobsByLocationResponse = AxiosResponse<FetchedJobs>;

export async function fetchJobsByLocation(location: string) {
    // console.log(location);
    const response = await instance.post<
        FetchJobsByLocationRequest,
        FetchJobsByLocationResponse
    >('', {
        location,
    });

    return response.data;
}
