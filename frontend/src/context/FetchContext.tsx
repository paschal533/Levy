import React from "react";

import { useFetchData } from "@/hooks/useFetchData";

type Context = ReturnType<typeof useFetchData>;

export const FetchContext = React.createContext<Context>({} as Context);

interface Props {
  children: React.ReactNode;
}

export const FetchProvider = ({ children }: Props) => {
  const value = useFetchData();

  return (
    <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
  );
};
