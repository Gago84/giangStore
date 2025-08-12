import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <h1>Văn phòng phẩm GHstore</h1>
      <nav>
        <Link to="/">Giới thiệu</Link> | <Link to="/shop">Mua hàng</Link>
      </nav>
    </header>
  );
}

export default Header;
