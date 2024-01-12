'use client';

import { useSearchParams } from 'next/navigation'
import { RegisterForm } from "@/lib/components/auth/RegisterForm";

const RegisterPage = () => {
  const searchParams = useSearchParams()

  return (
    <RegisterForm sponsorship={searchParams.get('sponsorship')} />
  );
}

export default RegisterPage;
