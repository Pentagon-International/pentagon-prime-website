'use client';

import { Suspense } from 'react';
import CustomerRequestForm from './CustomerRequestForm';
import Loader from '../component/common/Loader';

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <CustomerRequestForm />
    </Suspense>
  );
}
