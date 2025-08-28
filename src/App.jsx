import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Intro from './pages/Intro';
import DDHS from './pages/DDHS';
import VPP from './pages/VPP';
import KhuyenMai from './pages/KhuyenMai';
import Blog from './pages/Blog';
import BlogPost from "./pages/BlogPost";
import SignUp from './pages/SignUp';
import Login from "./pages/Login";
import Profile from "./pages/Profile";  // ✅ ở đây mới import

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/DDHS" element={<DDHS />} />
          <Route path="/VPP" element={<VPP />} />
          <Route path="/KhuyenMai" element={<KhuyenMai />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/login" element={<Login />} />           
          <Route path="/profile" element={<Profile />} /> {/* ✅ Profile route */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
