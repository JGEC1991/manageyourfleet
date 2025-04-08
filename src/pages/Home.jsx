import React, { useState, useEffect } from 'react'
    import { supabase } from '../supabaseClient'
    import DashboardCard from '../components/DashboardCard'
    import { useTranslation } from 'react-i18next'

    function Home() {
      const [loads, setLoads] = useState([])
      const [vehicles, setVehicles] = useState([])
      const { t } = useTranslation()

      useEffect(() => {
        const fetchLoads = async () => {
          const { data, error } = await supabase
            .from('loads')
            .select('*')

          if (error) {
            console.error('Error fetching loads:', error)
          } else {
            setLoads(data)
          }
        }

        const fetchVehicles = async () => {
          const { data, error } = await supabase
            .from('vehicles')
            .select('*')

          if (error) {
            console.error('Error fetching vehicles:', error)
          } else {
            setVehicles(data)
          }
        }

        fetchLoads()
        fetchVehicles()
      }, [])

      const activeLoads = loads.filter(load => load.status === 'In Transit').length
      const vehiclesNeedingMaintenance = vehicles.filter(vehicle => vehicle.status === 'Maintenance').length
      const recentRevenue = loads.reduce((total, load) => total + load.revenue, 0)

      return (
        <div>
          <h1>{t('Home')}</h1>
          <p>{t('Welcome to the Fleet Management CRM')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard
              title={t('Active Loads')}
              value={activeLoads}
              link="/loads"
            />
            <DashboardCard
              title={t('Vehicles Needing Maintenance')}
              value={vehiclesNeedingMaintenance}
              alert={vehiclesNeedingMaintenance > 0 ? `${vehiclesNeedingMaintenance} Vehicles Maintenance Due Soon` : null}
              link="/vehicles"
            />
            <DashboardCard
              title={t('Recent Revenue')}
              value={`$${recentRevenue}`}
            />
            <DashboardCard
              title={t('Driver Availability')}
              value="8/10"
            />
          </div>
        </div>
      )
    }

    export default Home
