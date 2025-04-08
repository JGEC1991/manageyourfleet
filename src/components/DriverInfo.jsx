import React from 'react'

    function DriverInfo({ driver }) {
      if (!driver) {
        return <p>Loading driver information...</p>
      }

      return (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Driver Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>License Number:</strong> {driver.licenseNumber}
            </div>
            <div>
              <strong>License Expiry:</strong> {driver.licenseExpiry}
            </div>
            <div>
              <strong>Date of Birth:</strong> {driver.dateOfBirth}
            </div>
            <div>
              <strong>Phone Number:</strong> {driver.phoneNumber}
            </div>
            <div>
              <strong>Address:</strong> {driver.address}
            </div>
          </div>
        </div>
      )
    }

    export default DriverInfo
