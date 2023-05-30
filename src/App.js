import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Header from './components/Header';
import Post from './pages/modals/Post';
import { AuthProvider } from './context/AuthContext';
import EditPost from './pages/modals/EditPost';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/myPage' element={<MyPage />} />
          <Route path='' element={<Post />} />
          <Route path='' element={<EditPost />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
