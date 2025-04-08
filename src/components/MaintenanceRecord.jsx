import React from 'react'

    function MaintenanceRecord({ record }) {
      if (!record) {
        return <p>Loading maintenance record...</p>
      }

      return (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Maintenance Record</h2>
          <div>
            <strong>Service Date:</strong> {record.serviceDate}
          </div>
          <div>
            <strong>Description:</strong> {record.description}
          </div>
          <div>
            <strong>Cost:</strong> {record.cost}
          </div>
          <div>
            <strong>Service Provider:</strong> {record.serviceProvider}
          </div>
        </div>
      )
    }

    export default MaintenanceRecord
