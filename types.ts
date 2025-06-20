
export type Services = {
    _id?: string | number;
    serviceType: string;
    price: number;
    description: string;
};

export type Status = 'Available' | "Busy" | "Away";

export type UserLicense = {
  category: string;
  city: string;
  expiration: string | Date;
  name: string;
  registrationNumber: number;
  state: string;
  zip: string;
}

/**
 * @name IBarber
 * @description Barber interface
 */
export interface IBarber {
  /* Optional user id property */
    _id?: string;
    id?: string;

  /* user name */
    name: string;

  /* user google email */
    email: string;

  /* whether a servicer is visible in search results */
    isVisible: boolean;

  /* user's primary image */
    image: string;

  /* Services only Only - Gallery images */
    imageOne: string;
    imageTwo: string;
    imageThree: string;
    imageFour: string;
    imageFive: string;
    appleId: string;

  /* Geo-Location for AppleMaps */
    geoLocation?: {
        type: 'Point';
        coordinates: [number, number]; // [longitude, latitude]
      };

  /* user listed location */
    location: string;

  /* Whether a user is actively using app or not */
    userIsLive: boolean;

  /* Services Only - shop name if owned */
    shopName: string;

  /* Add-ons not including the base service price */
    services: Services[];
  
  /* user availability */
    isAvailable: boolean;

  /* user status */
    status: Status;
  
  /* Barbers starting price */
    startingPrice: number;

  /* [deprecated] - see IHours */
    hours: string;

  /* Servicers average review rating */
    avgReviewScore: number;

  /* total reviews a servicer has */  
    totalReviews: number;

  /* Object ids connected to each review - see IReviews */  
    reviews: number[];

  /* Object ids connected to each stripe transaction */  
    transactions: number[];

  /* The number of requested bookings */ 
    requestedBooking: number;

   /* Booking object id for created bookings */ 
    customerBookings: number[];

  /* whether or not a user has a servier has an active coupon */  
    hasActiveDeal: boolean;

  /* Account type - note: only licensed users can convert to barber */  
    accountType: 'user' | 'barber';

  /* Shop ids connected to a single servicer */  
    shops: number[]

  /* User license data */
    userLicense: UserLicense;

  /* client facing coupons applied during checkout */
   myCoupons: ICoupon[]

  /* barber created coupons for display on profile and card */
  coupons: ICoupon[],
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

     /* whether or not the coupon is available to the public */
    isPublic?: boolean;

     /* whether or not the coupon is active or not */
    isActive?: boolean; 

    /* total number of transactions */
    transactions?: number;

    /* created only for past customers (based on transaction history) */
    onlyForUsers?: (string|number)[];

  }

  /**
   * @name IBarberAppointments 
   * @description Properties belonging to a booking appointment
   */

  export interface IBookings {
    /* the unique id representing an existing booking */
    _id?: string | number;

    /* The user id of client */
    customerId: string | number; // ref: Barbers (Yes, Barbers!)

    /* The user id of servicer */
    barberId: string | number; // ref: Barbers

    /* Whether the appoint is confirmed - default false */
    isConfirmed: boolean;

    /* Set time & date */
    bookingDateAndTime: string;

    /* Set location */
    bookingLocation: string;

    /* Add-ons for the service */
    addOns: string[];

    /* The price paid */
    price: number;

    /* discount amount */
    discount?: number;

    /* Coupon code added by client (if applicable) */
    couponAdded?: string;

    /* Tip added by client (if applicable) */
    tip?: number;

    /* Platform fee */
    platformFee: number;

    /* Whether a service has begun, triggered by servicer - default false */
    barberIsStarted: boolean;

    /* The start time when a service was marked "started" */
    barberStartTime: string;

    /* Whether a service has been completed - default false */
    barberIsComplete: boolean;

    /* The end time when a service has been marked completed */
    barberCompleteTime: string;

    /* Whether or not the client has confirmed the service complete. - default false */
    customerConfirmComplete: boolean;
};