import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/Signin';
import Signup from './pages/Signup';
import About from './pages/About';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      { index: true, element: <Home /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <Signup /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "about", element: <About /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
