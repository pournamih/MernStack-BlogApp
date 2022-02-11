import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/about/About';
import Home from './components/home/Home';
import ErrorPage from './components/error/Error'
import Header from './components/header/Header';
import ArticleList from './components/article/ArticleList';
import Article from './components/article/Article';
import AddPost from './components/post/AddPost';
import Signup from './components/userAccounts/Signup';
import Login from './components/userAccounts/Login';
import useToken from './components/userAccounts/useToken';
import Logout from './components/userAccounts/Logout';
import UpdatePost from './components/post/UpdatePost';
import DeletePost from './components/post/DeletePost';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return (
      <Router>
        <Header token={ token }/>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    ) 
  }
  return (
    <Router>
      <Header token={ token } />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/article-list" element={<ArticleList token={ token }/>} />
        <Route path="/article/:id" element={<Article token={ token } />} />
        <Route path="/post/create" element={<AddPost />} />
        <Route path="/post/update/:id" element={<UpdatePost />} />
        <Route path="/post/delete/:id" element={<DeletePost />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;
