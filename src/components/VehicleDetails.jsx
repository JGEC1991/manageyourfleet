import React from 'react'

    function VehicleDetails({ vehicle }) {
      if (!vehicle) {
        return <p>Loading vehicle details...</p>
      }

      return (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Make:</strong> {vehicle.make}
            </div>
            <div>
              <strong>Model:</strong> {vehicle.model}
            </div>
            <div>
              <strong>Year:</strong> {vehicle.year}
            </div>
            <div>
              <strong>VIN:</strong> {vehicle.vin}
            </div>
            <div>
              <strong>License Plate:</strong> {vehicle.licensePlate}
            </div>
            <div>
              <strong>Type:</strong> {vehicle.type}
            </div>
            <div>
              <strong>Status:</strong> {vehicle.status}
            </div>
          </div>
        </div>
      )
    }

    export default VehicleDetails
