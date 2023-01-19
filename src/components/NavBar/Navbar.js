import { Link, NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import Button from "../button/Button";
import Svg from "../../assets/Svg";

const NavBar = () => {
  return (
    <div className={classes.navbar}>
      <nav>
        <Link to="/">
          <Svg />
        </Link>
        <NavLink to="/create">
          <Button>Create Recipe</Button>
        </NavLink>
      </nav>
    </div>
  );
};

export default NavBar;
