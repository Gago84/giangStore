import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './components/Footer';
import Intro from './pages/Intro';
import Shop from './pages/Shop';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
