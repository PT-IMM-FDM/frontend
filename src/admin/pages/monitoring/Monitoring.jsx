import React from 'react'
import Layout from '../../component/Layout'
import MenuHeader from '../../component/MenuHeader'
import EnhancedTable from '../../component/Monitoring/TableMonitoring'

const Monitoring = () => {
  return (
    <Layout>
      <MenuHeader title={"Data Monitoring"}/>
      <div>
        <EnhancedTable />
      </div>
    </Layout>
  )
}

export default Monitoring