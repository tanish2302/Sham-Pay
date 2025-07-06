import './stylesheets/text-elements.css';
import './stylesheets/form-elements.css';
import './stylesheets/custom-components.css';
import './stylesheets/theme.css';
import './stylesheets/layout.css';
import './stylesheets/alignments.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Transactions from './pages/Transactions';
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoading, HideLoading } from "./redux/loaderSlice";
import Requests from "./pages/Requests";
import Users from "./pages/Users";
import Profile from './pages/Profile';


function App() {
  const dispatch =useDispatch();
  const isLoading =useSelector((state) => state.loader.isLoading);
  return (
    <div>
      {isLoading && <div className="loader">Loading...</div>}

      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/transactions' element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path='/requests' element={<ProtectedRoute><Requests /></ProtectedRoute>} />
          <Route path='/users' element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
