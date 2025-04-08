import React from 'react'
    import AddLoad from '../components/AddLoad'
    import { useTranslation } from 'react-i18next'

    function AddLoadPage() {
      const { t } = useTranslation()

      return (
        <div>
          <h1>{t('Add New Load')}</h1>
          <AddLoad />
        </div>
      )
    }

    export default AddLoadPage
