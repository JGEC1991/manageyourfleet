import React from 'react'
    import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
    import Home from './pages/Home'
    import Loads from './pages/Loads'
    import Activity from './pages/Activity'
    import Vehicle from './pages/Vehicle'
    import Admin from './pages/Admin'
    import DriverProfile from './pages/DriverProfile'
    import MaintenanceRepairs from './pages/MaintenanceRepairs'
    import Login from './pages/Login'
    import Register from './pages/Register'
    import Header from './components/Header'
    import Footer from './components/Footer'
    import AddLoadPage from './pages/AddLoadPage'

    function App() {
      return (
        <Router>
          <Header />
          <div className="container mx-auto py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/loads" element={<Loads />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/vehicle/:id" element={<Vehicle />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/driver/:id" element={<DriverProfile />} />
              <Route path="/maintenance/:id" element={<MaintenanceRepairs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/add-load" element={<AddLoadPage />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      )
    }

    export default App
