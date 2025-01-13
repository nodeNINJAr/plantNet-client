import PropTypes from 'prop-types'
import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'


const SellerOrderDataRow = ({refetch , orderData}) => {
  const axiosSecure = useAxiosSecure();
  // 
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  //  
const { plantName,address,coustomer,price,productId , quantity , _id ,status } = orderData || {};
  // order status update
const handleStatusUpdate= async(setStatus)=>{
    try{
       await axiosSecure.patch(`/manage-order/status/${_id}`, {setStatus})
       toast.success(`Status Updated to ${setStatus}`)
       refetch()
      
    }
    catch(err){
       console.log(err);
    }
}



  // order cancled by seller
  const handleCancle = async () => {
    try {
      await axiosSecure.delete(`/order-cancle/${_id}`);
      // update quantity to plant collection
      await axiosSecure.patch(`/plants/quantity/${productId}`, { quantityToUpdate:quantity , status:'increase'});
      refetch();
      toast.success("Order cancled");
    } catch (err) {
       toast.error(err?.response?.data)
    } finally {
      closeModal();
    }
  };
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap truncate'>{plantName}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{coustomer?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>${price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{quantity}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap truncate'>{address ||"Not given"}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap truncate'>{status}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center gap-2'>
          <select
            defaultValue={status}
            disabled={status ==="delivered"}
            required
            className='p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900 whitespace-no-wrap bg-white'
            name='category'
            onChange={(e)=>handleStatusUpdate(e.target.value)}
          >
            <option value='pending'>Pending</option>
            <option value='in Progress'>Start Processing</option>
            <option value='delivered'>Deliver</option>
          </select>
          <button
            onClick={() => setIsOpen(true)}
            className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
          >
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
            ></span>
            <span className='relative'>Cancel</span>
          </button>
        </div>
        <DeleteModal handleCancle={handleCancle} isOpen={isOpen} closeModal={closeModal} />
      </td>
    </tr>
  )
}

SellerOrderDataRow.propTypes = {
  orderData: PropTypes.object,
  order: PropTypes.object,
  refetch: PropTypes.func,
}

export default SellerOrderDataRow
