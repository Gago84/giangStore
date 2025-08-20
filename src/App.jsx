import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Intro from './pages/Intro';
import Shop from './pages/Shop';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/signup" element={<SignUp />} /> 
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
