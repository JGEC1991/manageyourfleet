import React from 'react'
    import { useTranslation } from 'react-i18next'

    function LanguageToggler() {
      const { i18n } = useTranslation()

      const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
      }

      return (
        <div className="flex space-x-2">
          <button onClick={() => changeLanguage('en')} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            EN
          </button>
          <button onClick={() => changeLanguage('es')} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            ES
          </button>
        </div>
      )
    }

    export default LanguageToggler
