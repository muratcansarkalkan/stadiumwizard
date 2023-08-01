import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './components/HomePage';
import Sidebar from './components/Sidebar';
import StadiumList from './components/StadiumList';
import TeamList from './components/TeamList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar/>,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "teamList",
        element: <TeamList />,
      },
      {
        path: "stadiumList",
        element: <StadiumList />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
