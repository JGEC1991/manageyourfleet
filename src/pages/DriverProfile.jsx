import React, { useState, useEffect } from 'react'
    import { useParams } from 'react-router-dom'
    import DriverInfo from '../components/DriverInfo'

    function DriverProfile() {
      const { id } = useParams()
      const [driver, setDriver] = useState(null)

      useEffect(() => {
        // Placeholder driver data
        const mockDriverData = {
          id: id,
          licenseNumber: 'DL1234567890',
          licenseExpiry: '2025-12-31',
          dateOfBirth: '1980-01-01',
          phoneNumber: '123-456-7890',
          address: '123 Main St, Anytown',
        }
        setDriver(mockDriverData)
      }, [id])

      return (
        <div>
          <h1>Driver Profile</h1>
          <DriverInfo driver={driver} />
        </div>
      )
    }

    export default DriverProfile
