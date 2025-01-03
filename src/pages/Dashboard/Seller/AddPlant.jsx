import { Helmet } from "react-helmet-async";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import { imageUpload } from "../../../api/utlitis";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddPlant = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // upload button 
  const [uploadImage , setUploadImage] = useState({image :{ name: "Upload Image"}});
  const [loading , setLoading] = useState(false);
  //
  const handleAdd = async (e) => {
    setLoading(true)
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const category = form.category.value;
    const description = form.description.value;
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.quantity.value);
    const image = form.image.files[0];
    const plantImage = await imageUpload(image);
    const seller = {
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
    };
    // data object
    const plantData = {
      name,
      category,
      description,
      price,
      quantity,
      image:plantImage,
      seller,
    };
    // save plant in db
    try{
    const {data} = await axiosSecure.post('/plants', plantData);
      toast.success("data added SuccessFully")
    }catch(err){
       console.log(err);
    }finally {
     setLoading(false)
    }
  };
  //
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm loading={loading} uploadImage={uploadImage} setUploadImage={setUploadImage} handleAdd={handleAdd} />
    </div>
  );
};

export default AddPlant;
