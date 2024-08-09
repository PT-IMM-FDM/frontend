import React from 'react'
import MenuHeader from '../../component/MenuHeader'
import useAuthStore from '../../stores/useAuthStore'
import QuestionList from '../../component/ManagementQuestion/QuestionList'

const ManagementQuestionPage = () => {
  const { user, token } = useAuthStore((state) => ({user: state.user, token: state.token}))
  return (
    <>
      <MenuHeader role={user.role.name} title={"Kelola Pertanyaan"} name={user?.full_name} email={user?.email}/>
      <div className='h-[35rem] rounded-[10px] bg-white'>
        <QuestionList token={token}/>
      </div>
    </>
  )
}

export default ManagementQuestionPage