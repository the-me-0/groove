'use client';

import { RedirectToSignIn, SignUp } from "@clerk/nextjs";
import {usePathname, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import axios from "axios";
import {Loader2} from "lucide-react";

export default function Page() {
  const searchParams = useSearchParams();
  const [isTreated, setIsTreated] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isRedirected, setIsRedirected] = useState(false);

  const verifyEmailBypass = usePathname() === '/sign-up/verify-email-address';

  const inviteLinkValue = searchParams.get('invite-link');

  useEffect(() => {
    axios.get(`api/invite-link/${inviteLinkValue}`)
        .then((response) => {
          if (response.status !== 200) {
            setIsInvalid(true);
          }
        })
        .catch((error) => {
          setIsInvalid(true);
          console.log(error);
        })
        .finally(() => setIsTreated(true))
  }, [inviteLinkValue]);

  if (!verifyEmailBypass && (!inviteLinkValue || isInvalid)) {
    setTimeout(() => {
      setIsRedirected(true);
    }, 5000);

    return (
        <div>
          <p>Please provide a valid invite link. You will be redirected to the sign-in page soon.</p>
          {isRedirected && (<RedirectToSignIn />)}
        </div>
    );
  }

  if (!isTreated) {
    return (
        <Loader2 className={'animate-spin text-zinc-500 w-10 h-10'}/>
    );
  }

  return <SignUp />;
}