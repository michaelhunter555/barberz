export type TUser = {
    image: string;
    rating: number;
    name: string;
    location: string;
    price: number;
}
 export const dummyUsers: TUser[] = [
    {image: '', rating: 4.5, name: 'Dave Marcus', location: 'Baltimore, Md', price: 40},
]