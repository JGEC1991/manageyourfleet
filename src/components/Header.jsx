import React, { useEffect, useState } from 'react'
    import { Link, useNavigate } from 'react-router-dom'
    import LanguageToggler from './LanguageToggler'
    import { useTranslation } from 'react-i18next'
    import { supabase } from '../supabaseClient'

    function Header() {
      const { t } = useTranslation()
      const [session, setSession] = useState(null)
      const navigate = useNavigate()

      useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
      }, [])

      const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/login')
      }

      return (
        <header className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">
              {t('Fleet Management CRM')}
            </Link>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    {t('Home')}
                  </Link>
                </li>
                <li>
                  <Link to="/loads" className="hover:text-gray-300">
                    {t('Loads')}
                  </Link>
                </li>
                <li>
                  <Link to="/activity" className="hover:text-gray-300">
                    {t('Activity')}
                  </Link>
                </li>
                <li>
                  <Link to="/admin" className="hover:text-gray-300">
                    {t('Admin')}
                  </Link>
                </li>
                {session ? (
                  <>
                    <li>
                      <Link to="/add-load" className="hover:text-gray-300">
                        {t('Add New Load')}
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="hover:text-gray-300">
                        {t('Logout')}
                      </button>
                    </li>
                  </>
                ) : null}
                {!session ? (
                  <>
                    <li>
                      <Link to="/login" className="hover:text-gray-300">
                        {t('Login')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="hover:text-gray-300">
                        {t('Register')}
                      </Link>
                    </li>
                  </>
                ) : null}
              </ul>
            </nav>
            <LanguageToggler />
          </div>
        </header>
      )
    }

    export default Header
