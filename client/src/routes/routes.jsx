import { createBrowserRouter } from 'react-router-dom';
import {
  Layout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  NotFound,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
} from '../pages'
import { action as registerAction } from '../pages/Register';
import { loginAction } from '../pages/Login';
import { loader as dashboardLoader } from '../pages/DashboardLayout';

export const checkDefualtTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme)
  return isDarkTheme

}
checkDefualtTheme();
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <Admin />,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />
          }
        ]
      },


    ],
  },

  {
    path: '*',
    element: <NotFound />
  },
]);

export default router;
