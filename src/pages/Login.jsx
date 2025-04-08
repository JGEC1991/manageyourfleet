import React from 'react'
    import LoginForm from '../components/LoginForm'
    import { useTranslation } from 'react-i18next'

    function Login() {
      const { t } = useTranslation()

      return (
        <div>
          <h1>{t('Login')}</h1>
          <LoginForm />
        </div>
      )
    }

    export default Login
