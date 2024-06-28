import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const useResponsiveMediaQuery = (query: string, initialValue: boolean) => {
  const [isClient, setIsClient] = useState(false);

  const mediaQuery = useMediaQuery({ query });

  useEffect(() => {
    setIsClient(true);
  }, [mediaQuery]);

  return isClient ? mediaQuery : initialValue;
};

export default useResponsiveMediaQuery;
