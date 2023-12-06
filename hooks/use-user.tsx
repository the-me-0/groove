import { useEffect, useState, createContext, useContext } from 'react';
import { useUser as useClerkUser } from '@clerk/nextjs';
import { Profile } from '@prisma/client'
import { db } from "@/lib/db";
import axios from "axios";

type UserContextType = {
    user: Profile | null;
    isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export interface Props {
    [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
    const clerkUseUser = useClerkUser();
    const [user, setUser] = useState<Profile | null>(null);
    const [isLoadingData, setIsLoadingData] = useState(false);

    const getUserDetails = () => axios.get('/api/profile');

    useEffect(() => {
        if (clerkUseUser.user?.id && !isLoadingData) {
            setIsLoadingData(true);
            getUserDetails().then(
                (response) => {
                    const profile: Profile = response.data;
                    setUser(profile);
                    setIsLoadingData(false);
                }
            );
        } else if (!user?.userId && !clerkUseUser.isLoaded && !isLoadingData) {
            setUser(null);
        }
    }, [clerkUseUser.isLoaded, clerkUseUser.user]);

    const value = {
        user,
        isLoading: isLoadingData,
    };

    return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error(`useUser must be used within a MyUserContextProvider.`);
    }
    return context;
};