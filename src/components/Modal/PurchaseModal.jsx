/* eslint-disable react/prop-types */
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "../Shared/Button/Button";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const PurchaseModal = ({ closeModal, isOpen, plant, refetch }) => {
  // 
  const navigate = useNavigate();
  //
  const axiosSecure = useAxiosSecure();
  //
  const { user } = useAuth();
  //
  const { _id, category, name, price, quantity, seller } = plant || {};
  //quantity
  const [totalQuantity, setTotalQuantity] = useState(1);
  // total price
  const [totalPrice, setTotalPrice] = useState(price);
  //purchased items
  const [purchased, setPurchased] = useState({
    coustomer: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    },
    productId: _id,
    price: totalPrice,
    quantity: totalQuantity,
    sellerEmail: seller?.email,
    address: "",
    status: "pending",
  });

  //
  const handleQuantity = (value) => {
    if (value > quantity) {
      setTotalQuantity(quantity);
      return toast.error("Quantity exceeds available stocks!");
    }
    if (value <= 0) {
      setTotalQuantity(1);
      return toast.error("You Need To Add at least 1 product!");
    }
    setTotalQuantity(value);
    setTotalPrice(value * price);
    setPurchased((prev) => ({
      ...prev,
      price: value * price,
      quantity: value,
    }));
  };


  // handle purchase
  const handlePurchase = async () => {
    try {
      await axiosSecure.post('/order', purchased);
      // update quantity to plant collection
      await axiosSecure.patch(`/plants/quantity/${_id}`, {quantityToUpdate:totalQuantity, status : 'decrease'} )
      toast.success("Plant Purchased");
      refetch();
      navigate('/dashboard/my-orders')
    } catch (err) {
      console.log(err);
    } finally {
      closeModal();
    }
  };
  //
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Review Info Before Purchase
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Plant: {name}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Category: {category}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Customer: {user?.displayName}
                  </p>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">Price: $ {price}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Available Quantity: {quantity} Plant
                  </p>
                </div>

                {/* Quantity */}
                <div className="space-x-2 text-sm my-2">
                  <label htmlFor="quantity" className=" text-gray-600">
                    Quantity :
                  </label>
                  <input
                    className=" p-2 w-44  text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                    name="quantity"
                    id="quantity"
                    type="number"
                    value={totalQuantity}
                    placeholder="Available quantity"
                    required
                    min={1}
                    onChange={(e) => handleQuantity(parseInt(e.target.value))}
                  />
                </div>
                {/* address input field */}
                <div className="space-x-2 text-sm my-2">
                  <label htmlFor="quantity" className=" text-gray-600">
                    Address :
                  </label>
                  <input
                    className=" p-2 w-44  text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                    name="address"
                    id="address"
                    type="text"
                    placeholder="Shipping Address"
                    required
                    onChange={(e) =>
                      setPurchased((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                  />
                </div>

                <Button
                  onClick={handlePurchase}
                  label={`Pay ${totalPrice} $`}
                ></Button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PurchaseModal;
