import React, { useCallback, useEffect, useState } from 'react'
import { initDB } from '../../api/database/db';

const useInitDB = () => {
     const [isDBReady, setIsDBReady] = useState<boolean>(false);

  const handleInitDB = useCallback(async () => {
    const satus = await initDB();
    setIsDBReady(satus);
  }, []);

  useEffect(() => {
    handleInitDB();
  }, []);
  return {
    isDBReady
  }
}

export default useInitDB
