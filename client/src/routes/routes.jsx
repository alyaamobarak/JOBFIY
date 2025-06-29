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
import { action as addJobAction } from '../pages/AddJob';
import { loginAction } from '../pages/Login';
import { loader as dashboardLoader } from '../pages/DashboardLayout';
import { loader as dashboardAllJobLoader } from '../pages/AllJobs'
import { loader as editJobLoader } from '../pages/EditJob';
import { action as editJobAction } from '../pages/EditJob';
import { action as deleteJobAction } from '../pages/DeleteJob';
import { action as profileAction } from '../pages/Profile';
import { loader as adminLoader } from '../pages/Admin';

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
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'profile',
            element: <Profile />,
            action:profileAction,
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: dashboardAllJobLoader,
          },
        

          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          {
            path: 'delete-job/:id',
            action: deleteJobAction,
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
