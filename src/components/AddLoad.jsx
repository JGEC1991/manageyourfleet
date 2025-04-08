import React, { useState } from 'react'
    import { supabase } from '../supabaseClient'
    import { useTranslation } from 'react-i18next'

    function AddLoad() {
      const [loadReferenceNumber, setLoadReferenceNumber] = useState('')
      const [originAddress, setOriginAddress] = useState('')
      const [destinationAddress, setDestinationAddress] = useState('')
      const [pickupDateTime, setPickupDateTime] = useState('')
      const [deliveryDateTime, setDeliveryDateTime] = useState('')
      const [loadStatus, setLoadStatus] = useState('Pending')
      const [rateFreightCharge, setRateFreightCharge] = useState('')
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(null)
      const { t } = useTranslation()

      const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const newLoad = {
          load_reference_number: loadReferenceNumber,
          origin_address: originAddress,
          destination_address: destinationAddress,
          pickup_date_time: pickupDateTime,
          delivery_date_time: deliveryDateTime,
          load_status: loadStatus,
          rate_freight_charge: rateFreightCharge,
        }

        console.log('Submitting load:', newLoad)

        try {
          const { data, error } = await supabase
            .from('loads')
            .insert([newLoad])
            .select()

          if (error) {
            console.error('Supabase insert error:', error)
            setError(error.message)
          } else {
            console.log('Supabase insert successful:', data)
            // Clear the form
            setLoadReferenceNumber('')
            setOriginAddress('')
            setDestinationAddress('')
            setPickupDateTime('')
            setDeliveryDateTime('')
            setLoadStatus('Pending')
            setRateFreightCharge('')
            alert('Load added successfully!')
          }
        } catch (err) {
          console.error('Error during Supabase insert:', err)
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }

      return (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">{t('Add New Load')}</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label htmlFor="loadReferenceNumber" className="block text-gray-700 text-sm font-bold mb-2">
                {t('Load Reference Number')}
              </label>
              <input
                type="text"
                id="loadReferenceNumber"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={t('Load Reference Number')}
                value={loadReferenceNumber}
                onChange={(e) => setLoadReferenceNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="originAddress" className="block text-gray-700 text-sm font-bold mb-2">
                {t('Origin Address')}
              </label>
              <input
                type="text"
                id="originAddress"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={t('Origin Address')}
                value={originAddress}
                onChange={(e) => setOriginAddress(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="destinationAddress" className="block text-gray-700 text-sm font-bold mb-2">
                {t('Destination Address')}
              </label>
              <input
                type="text"
                id="destinationAddress"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={t('Destination Address')}
                value={destinationAddress}
                onChange={(e) => setDestinationAddress(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="pickupDateTime" className="block text-gray-700 text-sm font-bold mb-2">
                {t('Pickup Date/Time')}
              </label>
              <input
                type="datetime-local"
                id="pickupDateTime"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={pickupDateTime}
                onChange={(e) => setPickupDateTime(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="deliveryDateTime" className="block text-gray-700 text-sm font-bold mb-2">
                {t('Delivery Date/Time')}
              </label>
              <input
                type="datetime-local"
                id="deliveryDateTime"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={deliveryDateTime}
                onChange={(e) => setDeliveryDateTime(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="loadStatus" className="block text-gray-700 text-sm font-bold mb-2">
                {t('Load Status')}
              </label>
              <select
                id="loadStatus"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={loadStatus}
                onChange={(e) => setLoadStatus(e.target.value)}
              >
                <option value="Pending">{t('Pending')}</option>
                <option value="In Transit">{t('In Transit')}</option>
                <option value="Delivered">{t('Delivered')}</option>
                <option value="Issue">{t('Issue')}</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="rateFreightCharge" className="block text-gray-700 text-sm font-bold mb-2">
                {t('Rate/Freight Charge')}
              </label>
              <input
                type="number"
                id="rateFreightCharge"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={t('Rate/Freight Charge')}
                value={rateFreightCharge}
                onChange={(e) => setRateFreightCharge(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                {loading ? t('Loading...') : t('Add Load')}
              </button>
            </div>
          </form>
        </div>
      )
    }

    export default AddLoad
