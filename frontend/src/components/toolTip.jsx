

import { logRoles } from '@testing-library/react';
import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => {
    setIsVisible(true);
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  return (
    <div
      class="relative"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isVisible && (
        <div className='absolute p-1 bg-green-900 text-white rounded-md text-xs bottom-full left-1/2 transform -translate-x-1/2'>
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
