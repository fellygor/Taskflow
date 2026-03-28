import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Signup from './pages/SignupPage';
import Login from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoutes';
import Splash from './pages/SplashScreen';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Splash />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
         <Route 
          path='/dashboard' 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
