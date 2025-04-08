import React, { useState, useEffect } from 'react'
    import { useParams } from 'react-router-dom'
    import MaintenanceRecord from '../components/MaintenanceRecord'

    function MaintenanceRepairs() {
      const { id } = useParams()
      const [record, setRecord] = useState(null)

      useEffect(() => {
        // Placeholder maintenance record data
        const mockMaintenanceRecord = {
          id: id,
          serviceDate: '2024-05-05',
          description: 'Oil change and filter replacement',
          cost: 150,
          serviceProvider: 'Quick Lube',
        }
        setRecord(mockMaintenanceRecord)
      }, [id])

      return (
        <div>
          <h1>Maintenance and Repairs</h1>
          <MaintenanceRecord record={record} />
        </div>
      )
    }

    export default MaintenanceRepairs
