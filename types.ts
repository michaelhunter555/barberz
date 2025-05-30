
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

/**
 * @name: Inputs
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
   * @name: State
   * @description - State of form hook.
   */
  export type State = {
    inputs: Record<string, Inputs>;
    isValid: boolean;
  };
  
  /**
   * @name: InputChangeAction
   * @description - input changes in useForm hook.
   */
  export type InputChangeAction = {
    type: "INPUT_CHANGE";
    value: string | number | boolean | string[];
    isValid: boolean;
    inputId: string;
  };
  
  /**
   * @name: SetFormAction
   * @description - set form to confirm if all fields ar evalid
   */
  export type SetFormAction = {
    type: "SET_DATA";
    inputs: Record<string, Inputs>;
    formIsValid: boolean;
  };
  
  /**
   * @name: Action
   * @description - Action types for useForm hook
   */
  export type Action = InputChangeAction | SetFormAction;
  //endof formhook types
  
  /**
   * @name: TBarberApp
   * @description - Application type for users who want to provide hair services.
   */
  export type TBarberApp = { name: string; location: string; licensed: boolean; termsApproved: boolean; onDemand: boolean}
   