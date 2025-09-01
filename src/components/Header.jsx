import { NavLink } from 'react-router-dom';
import '../styles/header.css';
import UserArea from './UserArea.jsx';

function Header() {
  return (
    <header>
      <h1>Đồ dùng học sinh - Văn phòng phẩm GHstore</h1>
      <div>
        <nav>
          <NavLink to="/" end>Giới thiệu</NavLink>
          <NavLink to="/DDHS">Đồ dùng học sinh</NavLink>
          <NavLink to="/VPP">Văn phòng phẩm</NavLink>
          <NavLink to="/combo">Bán chạy</NavLink>
          <NavLink to="/Blog">Bài viết</NavLink>
        </nav>
        <nav>
          <UserArea />
        </nav>
      </div>
    </header>
  );
}

export default Header;
