import React from 'react'
import Layout from '../../component/Layout'
import MenuHeader from '../../component/MenuHeader'
import EnhancedTable from '../../component/ManagementUser/Table'
import useAuthStore from '../../stores/useAuthStore'

const ManagementUser = () => {
    const {user} = useAuthStore((state) => ({user: state.user}))

  return (
    <Layout>
      <MenuHeader title={"Data Pengguna"} name={user?.full_name} email={user?.email}/>
      <div className='mt-2'>
        <EnhancedTable />
      </div>
    </Layout>
  )
}

export default ManagementUser;