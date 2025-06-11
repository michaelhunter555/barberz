import { useState, useCallback } from 'react';
import useAuth from '@/context/auth/use-auth';
import { TService, type TCoupon } from '@/types';

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
     * @description Deletes an existing addOn by id
     * @parameters - service: TService - service shape (name, description, price);
     * @parameters - id: string - The addOn id to be deleted
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
        isLoading
    }
}