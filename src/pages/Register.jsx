import React, { useEffect } from 'react'
    import RegistrationForm from '../components/RegistrationForm'
    import { useTranslation } from 'react-i18next'
    import { useNavigate } from 'react-router-dom'
    import { supabase } from '../supabaseClient'

    function Register() {
      const { t } = useTranslation()
      const navigate = useNavigate()

      useEffect(() => {
        const checkSession = async () => {
          const { data: { session } } = await supabase.auth.getSession()

          if (session) {
            navigate('/')
          }
        }

        checkSession()
      }, [navigate])

      return (
        <div>
          <h1>{t('Register')}</h1>
          <RegistrationForm />
        </div>
      )
    }

    export default Register
