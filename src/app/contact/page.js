import React from 'react';
import Contact from './Contact';
import Global from './Global';
import ACinfo from './ACinfo';

const page = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: "linear-gradient(to bottom, rgb(0, 30, 87), rgb(1, 46, 129))",
          height: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
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
