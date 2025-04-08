import React, { useState, useEffect } from 'react'
    import { supabase } from '../supabaseClient'
    import { useTranslation } from 'react-i18next'
    import { Link } from 'react-router-dom'

    function LoadsTable() {
      const [loads, setLoads] = useState([])
      const [searchTerm, setSearchTerm] = useState('')
      const [statusFilter, setStatusFilter] = useState('')
      const { t } = useTranslation()
      const [visibleColumns, setVisibleColumns] = useState({
        id: true,
        load_reference_number: true,
        origin_address: true,
        origin_contact_information: false,
        destination_address: true,
        destination_contact_information: false,
        pickup_date_time: true,
        delivery_date_time: true,
        equipment_type_required: false,
        commodity_description: false,
        load_status: true,
        assigned_driver: false,
        carrier_information: false,
        rate_freight_charge: true,
        fuel_surcharge: false,
        accessorial_charges: false,
        total_payment_due: false,
        payment_status: false,
        special_instructions: false,
        document_links: false,
        mileage: false,
        load_board_posting_status: false,
        broker_shipper_details: false,
        created_at: false,
        updated_at: false,
        actions: true,
      })
      const [showColumnSelection, setShowColumnSelection] = useState(false)

      useEffect(() => {
        const fetchLoads = async () => {
          let query = supabase
            .from('loads')
            .select('*')

          if (searchTerm) {
            query = query.ilike('origin_address', `%${searchTerm}%`)
          }

          if (statusFilter) {
            query = query.eq('load_status', statusFilter)
          }

          const { data, error } = await query

          if (error) {
            console.error('Error fetching loads:', error)
          } else {
            setLoads(data || [])
          }
        }

        fetchLoads()
      }, [searchTerm, statusFilter])

      const handleStatusChange = async (id, newStatus) => {
        const { error } = await supabase
          .from('loads')
          .update({ load_status: newStatus })
          .eq('id', id)

        if (error) {
          console.error('Error updating status:', error)
        } else {
          setLoads(loads.map(load => (load.id === id ? { ...load, load_status: newStatus } : load)))
        }
      }

      const toggleColumnVisibility = (column) => {
        setVisibleColumns({
          ...visibleColumns,
          [column]: !visibleColumns[column],
        })
      }

      const toggleColumnSelection = () => {
        setShowColumnSelection(!showColumnSelection)
      }

      const statuses = ['Pending', 'In Transit', 'Delivered', 'Issue']

      return (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <select
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">{t('All Statuses')}</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder={t('Search by pickup location')}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <Link
                to="/add-load"
                className="text-gray-700 hover:text-gray-900 font-bold py-2 px-4 rounded mr-2"
              >
                +
              </Link>
              <button
                onClick={toggleColumnSelection}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                &#x2630;
              </button>
            </div>
          </div>

          {showColumnSelection && (
            <div className="mb-4">
              {Object.keys(visibleColumns).map(column => (
                <label key={column} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    checked={visibleColumns[column]}
                    onChange={() => toggleColumnVisibility(column)}
                  />
                  <span className="ml-2 text-gray-700">{column}</span>
                </label>
              ))}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  {visibleColumns.id && <th className="py-2 px-4 border-b">ID</th>}
                  {visibleColumns.load_reference_number && <th className="py-2 px-4 border-b">Load Ref #</th>}
                  {visibleColumns.origin_address && <th className="py-2 px-4 border-b">Origin Address</th>}
                  {visibleColumns.origin_contact_information && <th className="py-2 px-4 border-b">Origin Contact</th>}
                  {visibleColumns.destination_address && <th className="py-2 px-4 border-b">Dest Address</th>}
                  {visibleColumns.destination_contact_information && <th className="py-2 px-4 border-b">Dest Contact</th>}
                  {visibleColumns.pickup_date_time && <th className="py-2 px-4 border-b">Pickup Time</th>}
                  {visibleColumns.delivery_date_time && <th className="py-2 px-4 border-b">Delivery Time</th>}
                  {visibleColumns.equipment_type_required && <th className="py-2 px-4 border-b">Equip Type</th>}
                  {visibleColumns.commodity_description && <th className="py-2 px-4 border-b">Commodity</th>}
                  {visibleColumns.load_status && <th className="py-2 px-4 border-b">Status</th>}
                  {visibleColumns.assigned_driver && <th className="py-2 px-4 border-b">Assigned Driver</th>}
                  {visibleColumns.carrier_information && <th className="py-2 px-4 border-b">Carrier Info</th>}
                  {visibleColumns.rate_freight_charge && <th className="py-2 px-4 border-b">Rate</th>}
                  {visibleColumns.fuel_surcharge && <th className="py-2 px-4 border-b">Fuel Surcharge</th>}
                  {visibleColumns.accessorial_charges && <th className="py-2 px-4 border-b">Accessorial</th>}
                  {visibleColumns.total_payment_due && <th className="py-2 px-4 border-b">Total Due</th>}
                  {visibleColumns.payment_status && <th className="py-2 px-4 border-b">Payment Status</th>}
                  {visibleColumns.special_instructions && <th className="py-2 px-4 border-b">Instructions</th>}
                  {visibleColumns.document_links && <th className="py-2 px-4 border-b">Docs</th>}
                  {visibleColumns.mileage && <th className="py-2 px-4 border-b">Mileage</th>}
                  {visibleColumns.load_board_posting_status && <th className="py-2 px-4 border-b">Load Board Status</th>}
                  {visibleColumns.broker_shipper_details && <th className="py-2 px-4 border-b">Broker/Shipper</th>}
                  {visibleColumns.created_at && <th className="py-2 px-4 border-b">Created At</th>}
                  {visibleColumns.updated_at && <th className="py-2 px-4 border-b">Updated At</th>}
                  {visibleColumns.actions && <th className="py-2 px-4 border-b">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {loads.map((load) => (
                  <tr key={load.id} className="hover:bg-gray-50">
                    {visibleColumns.id && <td className="py-2 px-4 border-b">{load.id}</td>}
                    {visibleColumns.load_reference_number && <td className="py-2 px-4 border-b">{load.load_reference_number}</td>}
                    {visibleColumns.origin_address && <td className="py-2 px-4 border-b">{load.origin_address}</td>}
                    {visibleColumns.origin_contact_information && <td className="py-2 px-4 border-b">{load.origin_contact_information}</td>}
                    {visibleColumns.destination_address && <td className="py-2 px-4 border-b">{load.destination_address}</td>}
                    {visibleColumns.destination_contact_information && <td className="py-2 px-4 border-b">{load.destination_contact_information}</td>}
                    {visibleColumns.pickup_date_time && <td className="py-2 px-4 border-b">{load.pickup_date_time}</td>}
                    {visibleColumns.delivery_date_time && <td className="py-2 px-4 border-b">{load.delivery_date_time}</td>}
                    {visibleColumns.equipment_type_required && <td className="py-2 px-4 border-b">{load.equipment_type_required}</td>}
                    {visibleColumns.commodity_description && <td className="py-2 px-4 border-b">{load.commodity_description}</td>}
                    {visibleColumns.load_status && (
                      <td className="py-2 px-4 border-b">
                        <select
                          value={load.load_status}
                          onChange={(e) => handleStatusChange(load.id, e.target.value)}
                        >
                          {statuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                    )}
                    {visibleColumns.assigned_driver && <td className="py-2 px-4 border-b">{load.assigned_driver}</td>}
                    {visibleColumns.carrier_information && <td className="py-2 px-4 border-b">{load.carrier_information}</td>}
                    {visibleColumns.rate_freight_charge && <td className="py-2 px-4 border-b">{load.rate_freight_charge}</td>}
                    {visibleColumns.fuel_surcharge && <td className="py-2 px-4 border-b">{load.fuel_surcharge}</td>}
                    {visibleColumns.accessorial_charges && <td className="py-2 px-4 border-b">{load.accessorial_charges}</td>}
                    {visibleColumns.total_payment_due && <td className="py-2 px-4 border-b">{load.total_payment_due}</td>}
                    {visibleColumns.payment_status && <td className="py-2 px-4 border-b">{load.payment_status}</td>}
                    {visibleColumns.special_instructions && <td className="py-2 px-4 border-b">{load.special_instructions}</td>}
                    {visibleColumns.document_links && <td className="py-2 px-4 border-b">{load.document_links}</td>}
                    {visibleColumns.mileage && <td className="py-2 px-4 border-b">{load.mileage}</td>}
                    {visibleColumns.load_board_posting_status && <td className="py-2 px-4 border-b">{load.load_board_posting_status}</td>}
                    {visibleColumns.broker_shipper_details && <td className="py-2 px-4 border-b">{load.broker_shipper_details}</td>}
                    {visibleColumns.created_at && <td className="py-2 px-4 border-b">{load.created_at}</td>}
                    {visibleColumns.updated_at && <td className="py-2 px-4 border-b">{load.updated_at}</td>}
                    {visibleColumns.actions && (
                      <td className="py-2 px-4 border-b">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                          {t('View Details')}
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    }

    export default LoadsTable
