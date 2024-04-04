import { Card } from '@/models/Card';

interface UserResult {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    location: {
        city: string;
        state: string;
        country: string;
    };
    email: string;
    dob: {
        date: string;
        age: number;
    };
    picture: {
        large: string;
        medium: string;
    };
    nat: string;
}

export let DATA: Card[] = [
    {
        id: 1,
        text: 'Card #1',
        uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg',
    },
    {
        id: 2,
        text: 'Card #2',
        uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg',
    },
    {
        id: 3,
        text: 'Card #3',
        uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg',
    },
    {
        id: 4,
        text: 'Card #4',
        uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg',
    },
    {
        id: 5,
        text: 'Card #5',
        uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg',
    },
    {
        id: 6,
        text: 'Card #6',
        uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg',
    },
    {
        id: 7,
        text: 'Card #7',
        uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg',
    },
    {
        id: 8,
        text: 'Card #8',
        uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg',
    },
];

// https://randomuser.me/documentation#results
export function generateUsers(): Promise<Card[]> {
    return fetch('https://randomuser.me/api/?results=8')
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw Error('Could not fetch users!');
        })
        .then((data: { results: UserResult[] }) => {
            return data.results.map((user, idx) => {
                return {
                    id: idx,
                    text: `Card #${idx + 1}`,
                    uri: user.picture.large,
                };
            });
        })
        .catch(err => {
            console.log(err.message);
            return DATA;
        });
}
