import Link from '@mui/material/Link';
import { NavLink } from "react-router-dom";

export default function HomePage() {
    return (
      <p id="zero-state">
        <h2>Welcome to Stadium Wizard.</h2>
        This website will help you easily navigate through available teams, leagues and stadiums in FIFA Manager 23.
        <br />
        To see whether your favorite team has a stadium, go to <Link component={NavLink} to={'teamList'}>Team List</Link> page.
        <br />
        To see what stadiums are available in our collection, go to <Link component={NavLink} to={'stadiumList'}>Stadium List</Link> page.
      </p>
    );
  }
  