import {
    createBrowserRouter,
  } from "react-router-dom";
import HomePage from '../components/HomePage';
import Sidebar from '../components/Sidebar';
import StadiumList from '../components/StadiumList';
import TeamList from '../components/TeamList';
import LeagueList from "../components/LeagueList";
import Login from '../components/Login';

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
        {
            path: "leagueList",
            element: <LeagueList />,
        },
        {
            path: "login",
            element: <Login />,
        },
      ],
    },
  ]);

export default router;