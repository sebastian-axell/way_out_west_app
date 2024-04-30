import React from 'react';

function Spinner() {
  return (
    <div className="fixed top-0 left-0 w-full p-1 h-full flex justify-center items-center bg-pink-200 z-50">
      {/* Replace 'logo.svg' with the path to your logo */}
      <img src="https://way-out-west-app-backend.vercel.app/media/weoutwest.svg" alt="Logo" className="w-full h-20 " style={{ animation: 'App-logo-spin infinite 7s linear' }} />
    </div>
  );
}

export default Spinner;