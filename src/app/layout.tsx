"use client"; // this is a client component 👈🏽
import { ReactNode } from 'react';
import {SessionProvider} from "next-auth/react"
import AppBar from './Appbar';
import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import './globals.css';
import { store } from '../../redux/store';
import { Provider } from 'react-redux';

// Initialize the query client
const queryClient = new QueryClient();


export default function RootLayout({ children}: { children: React.ReactNode },{session}:any) {
  return (
    
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
      <html lang="en"> 
        <body>
        <AppBar></AppBar>
          {children}</body>
      </html>
      </Provider>
    </QueryClientProvider>
  );
}
