import { Link } from 'react-router-dom';
import '../styles/header.css';
import UserArea from './UserArea.jsx';

function Header() {
  return (
    <header>
      <h1>Đồ dùng học sinh - Văn phòng phẩm GHstore</h1>
      <div>
        <nav>
          <Link to="/">Giới thiệu</Link>
          <Link to="/DDHS">Đồ dùng học sinh</Link>
          <Link to="/VPP">Văn phòng phẩm</Link>
          <Link to="/Blog">Bài viết</Link>
        </nav>
        <nav>
          <UserArea />
        </nav>
      </div>
    </header>
  );
}

export default Header;
