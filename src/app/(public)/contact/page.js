import React from 'react';
import Contact from './Contact';
import Global from './Global';
import ACinfo from './ACinfo';
import { COLORS } from '@/app/utils/COLORS';

const page = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: COLORS.backgroundColor,
          color: "#000",
          height: '100vh',
        }}
      >
        <Contact />
      </div>
      <Global />
      <ACinfo />
    </>
  );
};

export default page;
