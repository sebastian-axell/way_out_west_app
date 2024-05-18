import { useEffect } from 'react';

function TimeOutHook(flag, setFlag, timeout) {
  useEffect(() => {
    if (flag) {
      const timer = setTimeout(() => {
        setFlag(false);
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [flag, setFlag, timeout]);
}

export default TimeOutHook;
