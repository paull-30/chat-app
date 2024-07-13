'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';

const AuthNavigation = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className='mx-auto items-center flex relative gap-x-6'>
      <RegisterLink className='flex-1'>
        <Button
          className='bg-cyan-900 hover:bg-emerald-400 py-4 px-10 text-lg'
          onClick={() => setIsLoading(true)}
          disabled={isLoading}
        >
          Sign Up
        </Button>
      </RegisterLink>

      <LoginLink>
        <Button
          className='bg-cyan-900 hover:bg-emerald-400 py-4 px-10 text-lg'
          onClick={() => setIsLoading(true)}
          disabled={isLoading}
        >
          Sign In
        </Button>
      </LoginLink>
    </div>
  );
};

export default AuthNavigation;
