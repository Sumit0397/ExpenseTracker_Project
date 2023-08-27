import './App.css';
import { Route ,Routes } from 'react-router-dom';
import SignupForm from './components/SignUpLogin/SignUpForm';
import Profile from './components/WelcomePage/Profile';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignupForm/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </div>
  );
}

export default App;
