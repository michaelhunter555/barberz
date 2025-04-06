import React, { useContext} from 'react';

export const useUser = () => {
    
    const checkDbUser = async (email: string) => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_SERVER}/user-auth`, 
                { 
                    method: 'POST',
                    body: JSON.stringify({ email }),
                    headers: { "Content-Type": "application/json"}
                })
            const data = await response.json();
            if(!data.ok) {
                throw new Error(data.error);
            }
            return data.user;
        } catch(err) {
            console.log("There was an error trying to retreive user data." + err)
        }
    }

    return { checkDbUser }
}