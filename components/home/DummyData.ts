export type TUser = {
    id: number;
    title: string;
    image: string;
    rating: number;
    name: string;
    location: string;
    price: number;
}
 export const dummyUsers: TUser[] = [
    {title: "0", id:0 , image: 'https://images.unsplash.com/photo-1612214070582-5f980dd16bf2?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.5, name: 'Dave Marcus', location: 'Baltimore, Md', price: 80},
    {title: "1", id:1, image: 'https://images.unsplash.com/photo-1508511135-784eae8bec5f?q=80&w=1728&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.5, name: 'Donte zaus', location: 'Washington, DC', price: 30},
    {title: "2", id:2, image: 'https://images.unsplash.com/photo-1612213993024-b0ed04dfb248?q=80&w=2433&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.5, name: 'Charles temus', location: 'Baltimore, Md', price: 20},
    {title: "3", id:3, image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=2240&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.5, name: 'Zani arcus', location: 'Baltimore, Md', price: 45},
    {title: "4", id:4, image: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?q=80&w=3044&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.5, name: 'Dave Marcus', location: 'Baltimore, Md', price: 80},
    {title: "5", id:5, image: 'https://plus.unsplash.com/premium_photo-1671741519429-c0465c1b5c12?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.5, name: 'Donte zaus', location: 'Washington, DC', price: 30},
    {title: "6", id:6, image: 'https://plus.unsplash.com/premium_photo-1682097768451-7d8388195275?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.5, name: 'Charles temus', location: 'Baltimore, Md', price: 20},
    {title: "7", id:7, image: 'https://images.unsplash.com/photo-1629881544138-c45fc917eb81?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.5, name: 'Zani arcus', location: 'Baltimore, Md', price: 45},
]