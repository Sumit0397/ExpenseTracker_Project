import './App.css';
import { Route ,Routes } from 'react-router-dom';
import SignupForm from './components/SignUpLogin/SignUpForm';
import Profile from './components/WelcomePage/Profile';
import Root from './components/Layout/Root';
import Expense from './components/ExpensePage/Expense';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignupForm/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profile/expense-tracker" element={<Root/>}>
          <Route index element={<Expense/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
