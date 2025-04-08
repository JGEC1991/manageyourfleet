import React, { useState, useEffect } from 'react'
    import { useParams } from 'react-router-dom'
    import VehicleDetails from '../components/VehicleDetails'

    function Vehicle() {
      const { id } = useParams()
      const [vehicle, setVehicle] = useState(null)

      useEffect(() => {
        // Placeholder vehicle data
        const mockVehicleData = {
          id: id,
          make: 'Toyota',
          model: 'Tacoma',
          year: 2020,
          vin: '1234567890ABCDEFG',
          licensePlate: 'ABC-123',
          type: 'Truck',
          status: 'Active',
        }
        setVehicle(mockVehicleData)
      }, [id])

      return (
        <div>
          <h1>Vehicle Details</h1>
          <VehicleDetails vehicle={vehicle} />
        </div>
      )
    }

    export default Vehicle
