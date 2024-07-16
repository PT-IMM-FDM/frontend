import React from 'react'
import Layout from '../../component/Layout'
import MenuHeader from '../../component/MenuHeader'
import EnhancedTable from '../../component/Monitoring/TableMonitoring'
import useAuthStore from '../../stores/useAuthStore'

const Monitoring = () => {
  const {user} = useAuthStore((state) => ({user: state.user}))

  return (
    <>
      <MenuHeader title={"Data Monitoring"} name={user.full_name} email={user.email}/>
      <div className='mt-2'>
        <EnhancedTable />
      </div>
    </>
  )
}

export default Monitoring