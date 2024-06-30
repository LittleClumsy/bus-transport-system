import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Reports from './components/Reports';
import Navbar from './components/Navbar';
import Login from './components/Login';
import BusForm from './components/BusForm';
import EditLearner from './components/EditLearner';
import Register from './components/Register';
import DeleteLearner from './components/DeleteLearner';
import YourLearner from './components/YourLearner';
import CreateLearner from './components/CreateLearner';
import ProtectedRoute from './components/ProtectedRoutes';
import PasswordResetRequest from './components/passwordResetRequest';
import PasswordReset from './components/PasswordReset';
import { useAuth } from './components/AuthContext';

import './App.css'
import ApplicationApproval from './components/ApplicationApproval';


function App() {
  const location = useLocation()
  const { user } = useAuth();
  const noNavbar = location.pathname === "/register" || location.pathname === "/" || location.pathname === "/login" ||
    location.pathname.includes("password")

  return (
    <>
      {
        noNavbar ?
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/request/password_reset" element={<PasswordResetRequest />} />
            <Route path="/password-reset/:token" element={<PasswordReset />} />
          </Routes>

          :

          <Navbar
            content={
              <Routes>
                <Route element={<ProtectedRoute />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/create" element={<CreateLearner />} />
                  <Route path="/yourlearner" element={<YourLearner />} />
                  <Route path="/yourlearner/edit/:id" element={<EditLearner />} />
                  <Route path="/yourlearner/delete/:id" element={<DeleteLearner />} />
                  <Route path="/busform" element={<BusForm />} />
                  {user && user.is_admin && (
                    <Route path="/reports" element={<Reports />} />
                  )}
                  {user && user.is_admin && (
                    <Route path="/reports/delete/:id" element={<DeleteLearner />} />
                  )}
                  {user && user.is_admin && (
                    <Route path="/applicationapproval" element={<ApplicationApproval />} />
                  )}
                </Route>

              </Routes>
            }
          />
      }
    </>
  )
}

export default App
