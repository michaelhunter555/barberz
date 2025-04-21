
export type Services = {
    serviceType: string;
    price: number;
    description: string;
};

export type Status = 'Available' | "Busy" | "Away";

export interface IBarber {
    _id?: string;
    name: string;
    email: string;
    image: string;
    imageOne: string;
    imageTwo: string;
    imageThree: string;
    imageFour: string;
    imageFive: string;
    appleId: string;
    geoLocation?: {
        type: 'Point';
        coordinates: [number, number]; // [longitude, latitude]
      };
    location: string;
    userIsLive: boolean;
    shopName: string;
    services: Services[];
    isAvailable: boolean;
    status: Status;
    startingPrice: number;
    hours: string;
    avgReviewScore: number;
    totalReviews: number;
    reviews: number[];
    transactions: number[];
    requestedBooking: number;
    customerBookings: number[];
    hasActiveDeal: boolean;
    accountType: 'user' | 'barber',
    shops: number[]
};
