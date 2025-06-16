import { useState, useCallback } from 'react';
import useAuth from '@/context/auth/use-auth';
import { useMutation } from '@tanstack/react-query';
import { DaysOfWeek, IDaySlot, IHours, IScheduleByDay, TService, type TCoupon } from '@/types';

export const useBarber = () => {
    const auth = useAuth();
    const barber = auth?.userAuth;
    const [isLoading, setIsLoading] = useState<boolean>(false);


    /* Coupon - GET, CREATE, UPDATE & DELETE */

    /**
     * @name getCoupons
     * @description Retrieves all coupons created by a user
     * @parameters - none
     */
    const getCoupons = useCallback(async (): Promise<TCoupon[] | undefined> => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_SERVER}/barber/get-coupons?id=${barber?.id}`);
            const data = await response.json();
            if(!data.ok) {
                throw new Error(data.error);
            }
            return data.coupons;
        } catch(err) {
            console.log(err);
        }
    }, []);

     /**
     * @name createCoupon
     * @description Creates a new coupon.
     * @parameters couponData: TCoupon
     * @parameters users: string[] | undefined - A list of past customers eligible for the coupon.
     */
    const createCoupon = useCallback(async(couponData: TCoupon, users?: string[]) => {
        setIsLoading(true);
        try{
            const response = await fetch(
                `${process.env.EXPO_PUBLIC_API_SERVER}/barber/create-coupon`,
                {
                    method: 'POST',
                    body: JSON.stringify({ id: barber?.id,  couponData, ...(users && { users }) }),
                    headers: { "Content-Type": "application/json" }
                }
            )
            const data = await response.json();
            if(!data.ok) {
                throw new Error(data.error);
            }
            setIsLoading(false);
        } catch(err) {
            setIsLoading(false);
            console.log("Error creating a coupon", err);
        }
    }, []);

     /**
     * @name updateCoupon
     * @description Updates an existing coupon by id
     * @parameters - editCoupon: TCoupon
     */
    const updateCoupon = useCallback(async (editCoupon: TCoupon) => {
        setIsLoading(true)
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_SERVER}/barber/edit-coupon`, {
                method: 'POST',
                body: JSON.stringify({ editCoupon }),
                headers: { "Content-Type": "application/json" }
            })
            const data = await response.json();
            if(!data.ok) {
                throw new Error(data.error);
            }
            setIsLoading(false)
            return data.message;
        } catch(err) {
            setIsLoading(false);
            console.log("error updating coupon: ", err)
        }
    }, []);

       /**
     * @name deleteCoupon
     * @description Deletes an existing coupon by id
     * @parameters - id: string - The coupon id to be deleted
     */
    const deleteCoupon = useCallback(async (id: string) => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_SERVER}/barber/delete-coupon?id=${id}`, {
                method: 'DELETE',
                body: null,
                headers: {},
            })
            const data = await response.json();
            if(!data.ok) {
                throw new Error(data.error);
            }
            return data.message;
        } catch(err){
            console.log("There was an error deleting this id.", err);
        }
    }, []);
     /* END of Coupon */


     /* Services (AddOns) - CREATE, GET, UPDATE & DELETE */

       /**
     * @name getAddOn
     * @description Gets all add-ons (services) for a barber
     * @parameters - id: string - the user.id
     */
     const getAddOns = useCallback(async(id: string): Promise<TService[] | void> => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_SERVER}/barber/get-add-ons?id=${id}`);
            const data = await response.json();
            if(!data.ok) {
                throw new Error(data.error);
            }
            return data.services ?? [];
        } catch(err) {
            console.log("There was an error with retrieving your add-ons.", err);
        }
     }, []);

       /**
     * @name createAddOn
     * @description Creates a new add-on (service)
     * @parameters - service: TService - service shape (name, description, price);
     * @parameters - id: string - user.id
     */
     const createAddOn = useCallback(async(service: TService, id: string) => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_SERVER}/barber/create-add-on`, {
                method: 'POST',
                body: JSON.stringify({ service, id }),
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            if(!data.ok) {
                throw new Error(data.error);
            }
            return data.message;
        } catch(err) {
            console.log("There was an error with creating your add-on.", err);
        }
     }, []);

       /**
     * @name updateAddOn
     * @description Updates an existing addOn by id
     * @parameters - service: TService - service shape (name, description, price);
     * @parameters - id: string - user id
     */
     const updateAddOn = useCallback(async( editService: TService, id: string) => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_SERVER}/barber/update-add-on?barberId=${barber?.id}`, {
                method: 'POST',
                body: JSON.stringify({ editService, id }),
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            if(!data.ok) {
                throw new Error(data.error);
            }
            return data.message;
        } catch(err) {
            console.log("There was an error with retrieving your add-ons.", err);
        }
     }, []);

        /**
     * @name deleteAddOn
     * @description Deletes an existing addOn by id
     * @parameters - id: string - The addOn id to be deleted
     */
     const deleteAddOn = useCallback(async(id: string) => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_SERVER}/barber/delete-add-on?id=${id}&barberId=${barber?.id}`, {
                method: 'DELETE',
                body: null,
                headers: {}
            });
            const data = await response.json();
            if(!data.ok) {
                throw new Error(data.error);
            }
            return data.message;
        } catch(err) {
            console.log("There was an error with deleting your add-ons.", err);
        }
     }, []);

     /* End of Services */

    /* GET - Retrieves past customers  */
    const getPastCustomers = useCallback(async () => {
        try {
            const response = await fetch(
                `${process.env.EXPO_PUBLIC_API_SERVER}/barber/get-past-customers?barberId=${barber?.id}`
            );
            const data = await response.json();
            if(!data.ok) {
                throw new Error(data.error);
            }
            return data.pastCustomers;
        } catch(err) {
            console.log("Error retrieving past customers list.", err);

        }
    }, []);

     /* POST - Updates Barber Base Price  */
    const updateStartingPrice = useCallback(async (newPrice: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_SERVER}/barber/update-starting-price`, {
                method: 'POST',
                body: JSON.stringify({ id: auth?.userAuth?.id, newPrice }),
                headers: {"Content-Type": "application/json"}
            })
            const data = await response.json();
            if(!data.ok){
                throw new Error(data.error);
            }
            const currentAuth = { ...auth?.userAuth };
            auth?.updateUser({
                ...currentAuth,
                startingPrice: data.newPrice,
            });
            setIsLoading(false);
        } catch(err) {
            console.log(err);
            setIsLoading(false);
        }
    }, []);

    /* Hours (Schedule) */

    /**
     * @name getSchedule
     * @description retrieves all time slots for a M-S Schedule.
     * @parameters id: string - user id
     */
    const getSchedule = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_SERVER}/barber/get-schedule?barberId=${barber?.id}`);
            const data = await response.json();
            if(!data.ok) {
                throw new Error(data.error);
            }
            return data.schedule as IScheduleByDay;
        } catch(err) {
            console.log("There was an error getting your schedule.", err);
        }
    };
    /**
     * @name addTimeSlot
     * @description handles individual editing or additions to slots for a M-S Schedule.
     * @parameters id: string - user id
     * @parameters schedule: IScheduleByDay[] | IScheduleByDay
     * @parameters day?: Day of the week | undefined (all days)
     */

    const addTimeSlot = useCallback( async (
     timeSlot: IDaySlot | IDaySlot[],
     day?: string,
     bulkDays?: string[],
    ): Promise<IScheduleByDay | undefined> => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_SERVER}/barber/add-time-slot`, {
                method: 'POST',
                body: JSON.stringify({day,  bulkDays, timeSlot, barberId: barber?.id }),
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            if(!data.ok) {
                throw new Error(data.error);
            }
            return data.schedule;
        } catch(err) {
            console.log("Error adding time slot", err);
        }
    }, [])

     /**
     * @name createSchedule
     * @description handles individual editing or additions to slots for a M-S Schedule.
     * @parameters id: string - user id
     * @parameters schedule: IScheduleByDay[] | IScheduleByDay
     * @parameters day?: Day of the week | undefined (all days)
     */

    const createSchedule = useCallback(
        async (day: keyof DaysOfWeek, schedule: IScheduleByDay | IScheduleByDay[]): Promise<void> => {
        try {
            const response = await fetch(
                `${process.env.EXPO_PUBLIC_API_SERVER}/barber/manage-schedule?barber=${barber?.id}`, {
                method: 'POST',
                body: JSON.stringify({ schedule }),
                headers: { "Content-Type" : "application/json" },
            });
            const data = await response.json();
            if(!data.ok) {
                throw new Error(data.error);
            }
        } catch(err) {
            console.log("error trying to update schedule management changes.", err);
        }
    }, []);

      /**
     * @name editTimeSlot
     * @description handles individual editing to existing slots for a M-S Schedule.
     * @parameters id: string - user id
     * @parameters schedule: IScheduleByDay[] | IScheduleByDay
     * @parameters day?: Day of the week | undefined (all days)
     * @parameters timeSlotId - id of the timeslot to be edited.
     */
    const editTimeSlot = useCallback(
        async (day: string, daySlot: IDaySlot | IDaySlot[], timeSlotId: string): Promise<void> => {
        try {
            const response = await fetch(
                `${process.env.EXPO_PUBLIC_API_SERVER}/barber/edit-time-slot?barberId=${barber?.id}`, {
                method: 'POST',
                body: JSON.stringify({ daySlot, timeSlotId, day }),
                headers: { "Content-Type" : "application/json" },
            });
            const data = await response.json();
            if(!data.ok) {
                throw new Error(data.error);
            }
        } catch(err) {
            console.log("error trying to update schedule management changes.", err);
        }
    }, []);

     /**
     * @name deleteTimeSlot
     * @description removes time slots for a M-S Schedule.
     * @parameters timeSlotId - string of objectIds
     * @parameters day - day for where time slots are deleted.
     */
    const deleteTimeSlot = useCallback(async (timeSlotIds: string[], day: string): Promise<void | string> => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_SERVER}/barber/delete-time-slot`, {
                method: 'DELETE',
                body: JSON.stringify({ timeSlotIds, day, barberId: barber?.id }),
                headers: { "Content-Type":"application/json" },
            });
            const data = await response.json();
            if(!data.ok) {
                throw new Error(data.error);
            }
            return data.message;
        } catch(err) {
            console.log("Error attempting to delete time slots.")
        }
    }, []);

    /**
     * @name clearSchedule
     * @description removes all time slots for M-Su
     */
    
    const clearSchedule = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_SERVER}/barber/clear-schedule?barberId=${barber?.id}`, {
                method: 'POST',
                body: null,
                headers: {},
            });
            const data = await response.json();
            if(!data.ok) {
                throw new Error(data.error);
            }
            return data.message;
        } catch(err) {
            console.log("An error occured clearing the schedule. ", err);
        }
    }, []);

    return {
        // addons
        getAddOns,
        updateAddOn,
        createAddOn,
        deleteAddOn,
        // past customers
        getPastCustomers,
        // base price
        updateStartingPrice,
        // coupons
        getCoupons,
        createCoupon,
        updateCoupon,
        deleteCoupon,
        // schedule
        addTimeSlot,
        createSchedule,
        deleteTimeSlot,
        clearSchedule,
        editTimeSlot,
        getSchedule,
        isLoading
    }
}