import './App.css';
import { Route ,Routes } from 'react-router-dom';
import SignupForm from './components/SignUpLogin/SignUpForm';
import Welcome from './components/WelcomePage/Welcome';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignupForm/>} />
        <Route path='/welcome' element={<Welcome/>} />
      </Routes>
    </div>
  );
}

export default App;
