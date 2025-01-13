import { useState } from 'react'
import UpdateUserModal from '../../Modal/UpdateUserModal'
import PropTypes from 'prop-types'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
const UserDataRow = ({userData , refetch}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {_id,userEmail, role,status} = userData || {};
  const axiosSecure = useAxiosSecure();

  const updateRole = async(selectedRole)=>{
    if(role === selectedRole) return toast.error(`User already updated in ${selectedRole} role`)
     try{
         const {data} = await axiosSecure.patch(`/user/role/${userEmail}`, {role:selectedRole})
          console.log(data);
          if(data?.modifiedCount ===1){
            refetch()
            toast.success(`User role updated to ${selectedRole}`)
            setIsOpen(!isOpen)
          }
     }
     catch(err){
         console.log(err);
     }
  }


  // 
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{userEmail}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap capitalize'>{role} </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
       {
        status?<p className={`${status === "requested"?"text-yellow-600" : "text-green-500"} whitespace-no-wrap capitalize`}>{status}</p>
        :<p className='text-red-500 whitespace-no-wrap capitalize'>Unavailable</p>
       }
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
        </span>
        {/* Modal */}
        <UpdateUserModal role={role} updateRole={updateRole} isOpen={isOpen} setIsOpen={setIsOpen} />
      </td>
    </tr>
  )
}

UserDataRow.propTypes = {
  userData: PropTypes.object,
  refetch: PropTypes.func,
}

export default UserDataRow
