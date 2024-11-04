import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import Telefonlista from './components/TelefonLista';
import TelefonFelvetel from './components/TelefonFelvetel';
import Telefontörlés from './components/Telefontörlés';
import TelefonRészletek from './components/telefonRészleteg';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Telefonlista />,
  },
  {
    path: "/telefonok",
    element: <Telefonlista />,
  },  
  {
    path: "/telefonfelvetel",
    element: <TelefonFelvetel />,
  },
  {
    path: "/telefontörlés",
    element: <Telefontörlés />,
  },
  {
    path: "/telefonRész/:telefonId",
    element: <TelefonRészletek />,
  },
]);


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
