import React from 'react'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'
import AdminHome from './AdminHome'
import AdminDashboardRoutes from './AdminDashboardRoutes'
import './AdminHeader.css'

const AdminDashboardLayout = () => {
  return (
    <div className='admin-layout'>
        <AdminHeader />
        <div className='d-flex flex-row admin-body'>
          <AdminSidebar />
          <main className='admin-content'>
            <AdminDashboardRoutes />
          </main>
        </div>
    </div>
  )
}

export default AdminDashboardLayout