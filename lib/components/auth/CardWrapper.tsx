'use client';

import React from "react";

import { Card, CardContent, CardHeader, CardFooter } from '@/lib/shadcn-components/ui/card';
import {Header} from "@/lib/components/auth/Header";
import {Social} from "@/lib/components/auth/Social";
import {BackButton} from '@/lib/components/auth/BackButton';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
                              children,
                              headerLabel,
                              backButtonLabel,
                              backButtonHref,
                              showSocial
                            }: CardWrapperProps) => {
  return (
    <Card className='w-[400px] shadow-md'>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
}
