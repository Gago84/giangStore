import '../styles/UserArea.css';
import app from '../firebase/config';

function UserArea() {
  return (
    <div className="user-area">
      <span className="user-name">Guest</span>
      <a href="#" className="user-link">Log in</a>
      <a href="#" className="user-link">Sign up</a>
      <a href="#" className="user-link logout" style={{ display: 'none' }}>Log out</a>
    </div>
  );
}

export default UserArea;
