import '../styles/UserArea.css';
import { Link } from "react-router-dom";
function UserArea() {
  return (
    <div className="user-area">
      <span className="user-name">Guest</span>
      <Link to="/login" className="user-link">Log in</Link>
      <Link to="/signup" className="user-link">Sign up</Link>
      <a href="#" className="user-link logout" style={{ display: 'none' }}>Log out</a>
    </div>
  );
}

export default UserArea;
