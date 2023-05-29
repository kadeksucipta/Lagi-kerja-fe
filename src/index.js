import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loginpage from './page/Login/Loginpage';
import Homepage from './page/Home/Homepage';
import store from "./App/store"
import Registerpage from './page/Register/Registerpage';
import Tambahloker from './page/Tambahloker/Tambahloker';
import Contactpage from './page/Contact/Contactpage';
import Profilepage from './page/Profile/Profilepage';
import Logoutpage from './page/Logout/Logoutpage';
import Tambahskill from './page/Tambahskill/Tambahskill';
import Tambahriwayat from './page/Tambahriwayat/Tambahriwayat';
import Basicinfo from './page/Basicinfo/Basicinfo';
import Experience from './page/Experience/Experience';
import Education from './page/Education/Education';
import Desain from './Detailpage/Desain/Desain';
import Software from './Detailpage/Software/Software';
import Notice from './page/Notice/Notice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/Loginpage",
    element: <Loginpage/>
  },
  {
    path: "/Homepage",
    element: <Homepage/>
  },
  {
    path: "/Registerpage",
    element: <Registerpage/>
  },
  {
    path: "/Tambahloker",
    element: <Tambahloker/>
  },
  {
    path: "/Contactpage",
    element: <Contactpage/>
  },
  {
    path: "/Profilepage",
    element: <Profilepage/>
  },
  {
    path: "/Logoutpage",
    element: <Logoutpage/>
  },
  {
    path: "/Tambahskill",
    element: <Tambahskill/>
  },
  {
    path: "/Tambahriwayat",
    element: <Tambahriwayat/>
  },
  {
    path: "/Basicinfo",
    element: <Basicinfo/>
  },
  {
    path: "/Experience",
    element: <Experience/>
  },
  {
    path: "/Education",
    element: <Education/>
  },
  {
    path: "/Desain",
    element: <Desain/>
  },
  {
    path: "/Software",
    element: <Software/>
  },
  {
    path: "/Notice",
    element: <Notice/>
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
