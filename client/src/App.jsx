import React from 'react'
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';
// import DashboardProvider from './context/DashboardContext';

const App = () => {
  return (

    <>
         {/* <DashboardProvider> */}
            <RouterProvider router={router} />
         {/* </DashboardProvider> */}
      
    </>
  )
}

export default App