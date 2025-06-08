import React, { useState, createContext, useContext } from 'react'
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { BigSideBar, SmallSideBar, Navbar } from '../components'
import Wrapper from '../assets/wrappers/Dashboard'
import { checkDefualtTheme } from '../routes/routes'
const dashboardContext = createContext();
export const useDashboardContext = () => useContext(dashboardContext);
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

// const checkDefualtTheme= ()=>{
//   const isDarkTheme=localStorage.getItem('darkTheme')==='true';
//       document.body.classList.toggle('dark-theme', isDarkTheme)
//       return isDarkTheme
// }

export const loader = async () => {
  try {
    const { data } = await customFetch('/users/current-user', { withCredentials: true });
    return data;
  } catch (error) {
    return redirect('/');
  }
};

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { user } = useLoaderData();
  console.log('DashboardLayout loader user:', user);
  // const user = { name: 'alya' };
  const [showSidebar, setShowSidebar] = useState(false);

  const [isDarkTheme, setIsDarkTheme] = useState(checkDefualtTheme());

  const toggleTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme)
    console.log('toggleTheme')
  }
  const toggleSideBar = () => {
    console.log('before toggle:', showSidebar);
    setShowSidebar(!showSidebar);
    console.log('after toggle :', !showSidebar);
  };


  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout', { withCredentials: true });
    toast.success('Logging out...');
  };

  return (
    <dashboardContext.Provider value={{
      user,
      showSidebar,
      isDarkTheme,
      toggleTheme,
      toggleSideBar,
      logoutUser

    }}>
      <Wrapper>
        <main className='dashboard'>
          <BigSideBar />
          <SmallSideBar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet context={{ user }} />

            </div>
          </div>
        </main>
      </Wrapper>
    </dashboardContext.Provider>
  )
}

export default DashboardLayout

// import React, { useState } from 'react';
// import DashboardContext from '../context/DashboardContext'

// const DashboardProvider = ({ children }) => {
//   const user = { name: 'alya' };
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [isDarkTheme, setIsDarkTheme] = useState(false);

//   const toggleTheme = () => {
//     console.log('toggleTheme');
//   };

//   const toggleSideBar = () => {
//     console.log('before toggle:', showSidebar);
//     setShowSidebar(prev => !prev);
//   };

//   const logoutUser = async () => {
//     console.log('user logged out');
//   };

//   return (
//     <DashboardContext.Provider
//       value={{
//         user,
//         showSidebar,
//         isDarkTheme,
//         toggleTheme,
//         toggleSideBar,
//         logoutUser,
//       }}
//     >
//       {children}
//     </DashboardContext.Provider>
//   );
// };

// export default DashboardProvider;
