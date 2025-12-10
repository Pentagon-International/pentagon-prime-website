import React from 'react';
import Contact from './Contact';
import Global from './Global';
import ACinfo from './ACinfo';

const page = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#FFF",
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
