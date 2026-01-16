"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";

export function QueryProvider({children}){

    const [client] = useState(()=> new QueryClient())

    return(
        <QueryClientProvider client={client}>
            {children}
            <Toaster />
        </QueryClientProvider>
    )
}