import React, { useState } from 'react'
    import { supabase } from '../supabaseClient'
    import { useNavigate } from 'react-router-dom'
    import { useTranslation } from 'react-i18next'

    function LoginForm() {
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(null)
      const navigate = useNavigate()
      const { t } = useTranslation()

      const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          })

          if (error) {
            setError(error.message)
          } else {
            // Redirect to home page after successful login
            navigate('/')
          }
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }

      return (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">{t('Login')}</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                {t('Email')}
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={t('Email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                {t('Password')}
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={t('Password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                {loading ? t('Loading...') : t('Sign In')}
              </button>
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                {t('Forgot Password?')}
              </a>
            </div>
          </form>
        </div>
      )
    }

    export default LoginForm
