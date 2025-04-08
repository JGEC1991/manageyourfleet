import React from 'react'

    function ActivityFeed() {
      // Placeholder data for activity feed
      const activities = [
        {
          id: '1',
          timestamp: '2024-05-09 14:30',
          user: 'John Doe',
          action: 'Created a new load',
          details: 'Load ID: 123',
        },
        {
          id: '2',
          timestamp: '2024-05-09 15:45',
          user: 'Jane Smith',
          action: 'Updated vehicle status',
          details: 'Vehicle ID: 456',
        },
      ]

      return (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Activity Feed</h2>
          <ul>
            {activities.map((activity) => (
              <li key={activity.id} className="py-2 border-b last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold">{activity.user}</span> {activity.action}
                  </div>
                  <div className="text-gray-500 text-sm">{activity.timestamp}</div>
                </div>
                <div className="text-gray-600">{activity.details}</div>
              </li>
            ))}
          </ul>
        </div>
      )
    }

    export default ActivityFeed
