import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Header from './components/Header';
import Post from './pages/modals/Post';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/myPage' element={<MyPage />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
