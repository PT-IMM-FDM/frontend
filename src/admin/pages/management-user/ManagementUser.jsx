import React from 'react'
import Layout from '../../component/Layout'
import MenuHeader from '../../component/MenuHeader'
import EnhancedTable from '../../component/ManagementUser/Table'
import useAuthStore from '../../stores/useAuthStore'

const ManagementUser = () => {
    const {user, token} = useAuthStore((state) => ({user: state.user, token: state.token}))
    
  return (
    <>
      <MenuHeader role={user.role.name} title={"Data Pengguna"} name={user?.full_name} email={user?.email}/>
      <div className='mt-2'>
        <EnhancedTable token={token}/>
      </div>
    </>
  )
}

export default ManagementUser;