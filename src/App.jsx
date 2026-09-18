import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoutes';
import AuthScreen from './pages/AuthScreen';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<AuthScreen />} />
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
