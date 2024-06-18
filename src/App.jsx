import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import {Visitors, HomeLayout,Cells,Login,Dashboard,Settings,Prisoners,PrisonGuards} from './pages'
import FacialRecognitionAuthentication from './pages/FacialRecognitionAuthentication';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,

      // children: [
      //   {
      //     index: true,
      //     element: <Dashboard />,

      //   },
      //   {
      //     path: 'cells',
      //     element: <Cells />,

      //   },
      //   {
      //     path: 'visitors/',
      //     element: <Visitors />,

      //   },
      //   {
      //     path: 'setting',
      //     element: <Settings />,
      //   },
      //   { path: 'guards',
      //    element: <PrisonGuards /> },
      //   {
      //     path: 'prisoners',
      //     element: <Prisoners />,
      //   },
      // ],
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/prisoners",
      element: <Prisoners />,
    },
    {
      path: "/cells",
      element: <Cells />,
    },
    {
      path: "/visitors",
      element: <Visitors />,
    },
    {
      path: "/setting",
      element: <Settings />,
    },
    {
      path: "/guards",
      element: <PrisonGuards />,
    },
    {
      path: "/facial",
      element: < FacialRecognitionAuthentication/>,
    }
    
  ]);
  const App = () => {
    return <RouterProvider router={router}></RouterProvider>
    
}

export default App
