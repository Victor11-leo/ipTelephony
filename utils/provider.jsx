'use client'

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";


const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  }
)

const Providers = ({ children }) => {

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default Providers;