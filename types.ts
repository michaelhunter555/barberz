
export type Services = {
    serviceType: string;
    price: number;
    description: string;
};

export type Status = 'Available' | "Busy" | "Away";

/**
 * @name IBarber
 * @description Barber interface
 */
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

/**
 * @name Inputs
 * @description - Form Inputs for useForm() hook.
 */
export type Inputs = {
    value:
      | string
      | number
      | boolean
      | string[]
      | Record<string, any>[]
      | undefined;
    isValid: boolean;
  };
  
  /**
   * @name State
   * @description - State of form hook.
   */
  export type State = {
    inputs: Record<string, Inputs>;
    isValid: boolean;
  };
  
  /**
   * @name InputChangeAction
   * @description - input changes in useForm hook.
   */
  export type InputChangeAction = {
    type: "INPUT_CHANGE";
    value: string | number | boolean | string[];
    isValid: boolean;
    inputId: string;
  };
  
  /**
   * @name SetFormAction
   * @description - set form to confirm if all fields ar evalid
   */
  export type SetFormAction = {
    type: "SET_DATA";
    inputs: Record<string, Inputs>;
    formIsValid: boolean;
  };
  
  /**
   * @name Action
   * @description - Action types for useForm hook
   */
  export type Action = InputChangeAction | SetFormAction;
  //endof formhook types
  
  /**
   * @name TBarberApp
   * @description - Application type for users who want to provide hair services.
   */
  export type TBarberApp = { name: string; location: string; licensed: boolean; termsApproved: boolean; onDemand: boolean}
   
/**
   * @name THourSlot
   * @description Schedule representing a time of day for where a booking is available
   * @types THourSlot props for start and end times.
   */

  type THourSlot = { value: number; hour: number; minute: number };

  /**
   * @name IDaySlot
   * @description slot available for booking and price 
   * @types uses THourSlot props for start and end times.
   */
  export interface IDaySlot {  
    startTime: THourSlot, 
    endTime: THourSlot, 
    price: number, 
    isBooked: boolean;
    isChecked?: boolean;
  }
  
  /**
   * @name IScheduleByDay
   * @description Schedule representing a time of day for where a booking is available
   */
export interface IScheduleByDay {
    [day: string]: IDaySlot[];
}

export interface IHours {
        barberId:  string;
        schedule: IScheduleByDay
};

/**
 * @name ICoupon
 * @description Coupon properties for creating barber coupon
 */
export interface ICoupon {
  name: string;
  ownerId: string;
  isPublic: boolean;
  isActive: boolean;
  transactionComplete: boolean;
  amount: number;
  terms: string;
  minPriceActivation: number;
  expirationDate: Date;
  transactions: number;
  onlyForUsers?: [string];
}

type TService = { name: string, description: string, price: number }
/**
 * @name IBarberServices
 * @description service properties for add-ons including a name, description and price.
 */
export interface IBarberServices {
    barberId: string;
    service: TService[];
}