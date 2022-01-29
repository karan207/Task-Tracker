import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({ title, color, onAdd, showAdd }) => {
  const location = useLocation()
  console.log(location);
  return (
    <header className="header" style={{ backgroundColor: color }}>
      <h1>{title}</h1>
      {location.pathname === '/' && (
        <Button
          text={showAdd ? "Close" : "Add"}
          color={showAdd ? "red" : "green"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  color: "grey",
};

export default Header;
