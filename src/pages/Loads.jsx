import React from 'react'
    import LoadsTable from '../components/LoadsTable'
    import { useTranslation } from 'react-i18next'
    import { Link } from 'react-router-dom'

    function Loads() {
      const { t } = useTranslation()

      return (
        <div>
          <LoadsTable />
        </div>
      )
    }

    export default Loads
