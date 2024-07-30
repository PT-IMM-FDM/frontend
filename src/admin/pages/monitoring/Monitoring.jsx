import React from 'react'
import MenuHeader from '../../component/MenuHeader'
import EnhancedTable from '../../component/DataMonitoring/Table'
import useAuthStore from '../../stores/useAuthStore'

const Monitoring = () => {
  const {user, token} = useAuthStore((state) => ({user: state.user, token: state.token}))

  return (
    <>
      <MenuHeader title={"Data Monitoring"} name={user.full_name} email={user.email}/>
      <div className='mt-2'>
        <EnhancedTable token={token}/>
      </div>
    </>
  )
}

export default Monitoring