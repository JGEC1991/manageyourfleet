import React from 'react'

    function DashboardCard({ title, value, alert, link }) {
      return (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <div className="text-3xl font-bold">{value}</div>
          {alert && <div className="text-red-500">{alert}</div>}
          {link && (
            <a href={link} className="text-blue-500 hover:text-blue-700">
              View Details
            </a>
          )}
        </div>
      )
    }

    export default DashboardCard
