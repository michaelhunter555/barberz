
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
    id?: string;
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
  export type TBarberApp = { location?: string; licensed: boolean; termsApproved: boolean; onDemand: boolean, signature: string }
   
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
    _id?: string, 
    startTime: THourSlot, 
    endTime: THourSlot, 
    price?: number, 
    isBooked?: boolean;
    isChecked?: boolean;
  }

  export enum DaysOfWeek {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY,
  }
  
  /**
   * @name IScheduleByDay
   * @description Schedule representing a time of day for where a booking is available
   */
export interface IScheduleByDay {
    [day: string]: IDaySlot[] | [];
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

export type TService = { _id?: string | number; name: string, description: string, price: number }
/**
 * @name IBarberServices
 * @description service properties for add-ons including a name, description and price.
 */
export interface IBarberServices {
    barberId: string;
    service: TService[];
}

/**
 * @name LicenseInfo
 * @description the required fields for Maryland Licensed Barbers/Salons. Every Certified Barber should have this information available.
 */
export type LicenseInfo = {
   firstName: string;
   lastName: string;
    city: string;
    state: string;
    zip: number;
    expiration: string | Date;
    category: string;
    registrationNumber: number;
  }

  /**
   * @name TCoupon
   * @description Shape of coupon form submission for barbers
   */

  export type TCoupon = {
    /* coupon document id */
    _id?: number | string;

    /* name of the coupon - cannot exceed 45 characters */
    name: string;

    /*The owner of the id */
    ownerId: string | number;

     /* discount amount */
    amount: number;

     /* terms and conditions regarding coupon usage and activation */
    terms: string;

     /* min price set in terms */
    minPriceActivation: number;

     /* expiration date of coupon - point when it is no longer applicable */
    expirationDate: string;

     /* whether or not he coupon is available to the public */
    isPublic?: boolean;

     /* whether or not the coupon is active or not */
    isActive?: boolean; 

    /* total number of transactions */
    transactions?: number;

    /* created only for past customers (based on transaction history) */
    onlyForUsers?: (string|number)[];

  }