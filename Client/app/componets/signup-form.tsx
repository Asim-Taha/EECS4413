'use client';

import { poppins } from '@/app/componets/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { signUp } from '../auth/actions';
import Link from 'next/link';

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(signUp,undefined);
  return (
    <>
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-0 pt-8">
        <h1 className={`${poppins.className} mb-3 text-2xl`}>
          Create Your account!
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errorMessage?.errors?.name && <p className='text-sm text-primary'>{errorMessage.errors.name}</p>}
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errorMessage?.errors?.email && <p className='text-sm text-primary'>{errorMessage.errors.email}</p>}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errorMessage?.errors?.password && <p className='text-sm text-primary'>{errorMessage.errors.password}</p>}
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl}/>
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Sign Up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
          {errorMessage?.message && (
            <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
            <p className="text-sm text-red-500">{errorMessage.message}</p>
            </>
          )}
        </div>
      </div>
    </form>
    <div className="flex justify-center text-sm text-black">
          <span>Have an account?<Link href="/login" className="ml-1.5 text-blue">Log In</Link></span>
        </div>
    </>
  );
}