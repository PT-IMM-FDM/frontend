import { useState } from 'react';
import { Card, Button } from 'flowbite-react';
import useAuthStore from '../../../admin/stores/useAuthStore';
import UserDetailsCard from './UserDetailsCard';
import EditProfileModal from './EditProfileModal';
import ChangePasswordModal from './ChangePasswordModal';

const ProfileWrapper = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  const [openModal, setOpenModal] = useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card>
        <div className='flex ml-auto gap-2'>
          <Button gradientMonochrome="purple" className="text-white w-fit" size="xs" onClick={() => setOpenModal(true)}>Edit</Button>
          <Button gradientMonochrome="failure" className="text-white w-fit" size="xs" onClick={() => setOpenChangePasswordModal(true)}>Change Password</Button>
        </div>
        <UserDetailsCard user={user} />
      </Card>
      <EditProfileModal show={openModal} onClose={() => setOpenModal(false)} />
      <ChangePasswordModal show={openChangePasswordModal} onClose={() => setOpenChangePasswordModal(false)} />
    </div>
  );
};

export default ProfileWrapper;
