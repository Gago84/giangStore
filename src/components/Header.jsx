import { NavLink } from 'react-router-dom';
import '../styles/header.css';
import UserArea from './UserArea.jsx';

function Header() {
  return (
    <header>
      <h1>Đồ dùng học sinh - Văn phòng phẩm GHstore111</h1>
      <div>
        <nav>
          <NavLink to="/" end>Giới thiệu</NavLink>

<div className="tab-with-dropdown">
  <NavLink to="/DDHS" className="has-dropdown">
    Đồ dùng học sinh <span className="arrow">▾</span>
  </NavLink>

  <div className="mega-dropdown">
    <div className="dropdown-column">
      <strong>Bút</strong>
      <NavLink to="/DDHS/but/1">Bút 1</NavLink>
      <NavLink to="/DDHS/but/2">Bút 2</NavLink>
      <NavLink to="/DDHS/but/3">Bút 3</NavLink>
    </div>
    <div className="dropdown-column">
      <strong>Vở</strong>
      <NavLink to="/DDHS/vo/1">Vở 1</NavLink>
      <NavLink to="/DDHS/vo/2">Vở 2</NavLink>
      <NavLink to="/DDHS/vo/3">Vở 3</NavLink>
    </div>
  </div>
</div>

          
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
