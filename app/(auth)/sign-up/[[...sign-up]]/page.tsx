'use client';

import { RedirectToSignIn, SignUp } from "@clerk/nextjs";
import {usePathname, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import axios from "axios";
import {Loader2} from "lucide-react";

export default function Page() {
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState<boolean | undefined>(undefined);

    const verifyEmailBypass = usePathname() === '/sign-up/verify-email-address';
    const inviteLinkValue = searchParams.get('invite-link');

    useEffect(() => {
        if (verifyEmailBypass) return;
        if (inviteLinkValue === null) {
            setIsValid(false);
            return;
        }

        console.log('Checking if valid invite-link...');
        setIsLoading(true);
        axios.get(`api/invite-link/${inviteLinkValue}`)
            .then((response) => {
                // if the server responds anything else than a 200, means invite link is wrong
                if (response.status !== 200) setIsValid(false);
                else setIsValid(true);
            })
            .catch((error) => {
                setIsValid(false);
                console.log(error);
            })
            .finally(() => setIsLoading(false))
    }, [inviteLinkValue, verifyEmailBypass]);

    if (isLoading) {
        return (
            <Loader2 className={'animate-spin text-zinc-500 w-10 h-10'}/>
        );
    }

    if (!verifyEmailBypass && isValid === false) {
        console.log('You tried to access the sign-up page with an invalid or no invite link. You\'ve been redirected to sign-in page.');

        return <RedirectToSignIn />;
    }

    return (
        <SignUp
            appearance={{
                elements: {
                    footerAction: 'hidden'
                },
            }}
        />
    );
}