import SignUp from './Components/SignUp'
import Login from './Components/Login'
import Feed from './Components/Feed'
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import {AuthProvider} from './Context/AuthContext'
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile'
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Feed />} />
            <Route exact path="/profile/:id" element={<Profile/>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
