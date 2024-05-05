import React from 'react'; 
import SpinnerIcon from './SpinnerIcon';

function Spinner() {
  return (
    <div className="fixed top-0 left-0 w-full p-1 h-full flex justify-center items-center bg-pink-200 z-50 animate-scale-in-out">
      <div className="animate-logo">
        <SpinnerIcon />
      </div>
    </div>
  );
}

export default Spinner;