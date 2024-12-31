import axios from "axios";


export const imageUpload = async(imageData)=>{
    const formData = new FormData();
    formData.append("image", imageData);
     //  data send to image bb
     const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_BB_API}`,
        formData
      );
      return data.data?.display_url;
 
}