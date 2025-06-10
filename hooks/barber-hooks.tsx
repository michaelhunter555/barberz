import { useState, useCallback } from 'react';
import useAuth from '@/context/auth/use-auth';
import { type TCoupon } from '@/types';

export const useBarber = () => {
    const auth = useAuth();
    const barber = auth?.userAuth;
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
    }, [])

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
    }, [])

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
    }, [])

    return {
        getPastCustomers,
        updateStartingPrice,
        getCoupons,
        createCoupon,
        updateCoupon,
        deleteCoupon,
        isLoading
    }
}