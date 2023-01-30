import React from 'react'
import Card from "@mui/material/Card";
import { useSelector} from 'react-redux'
import {  useUploadUserImageMutation,  useUpdateUserImageMutation
}  from "../services/Api"


const UploadUserImage = () => {
  const props = useSelector((state) => state.counter)

  let [upload]=useUploadUserImageMutation()
  let [update]=useUpdateUserImageMutation()
  // let [trigger, result, lastPromiseInfo]=useCurrentUserQuery()

    const handleimage=async (event)=>{
      const imageFile = event.target.files[0];
      const formData = new FormData();
      formData.append('image',imageFile)
       let {data,error,isLoading}=await upload({formData})
        await update({Image:data.image.src}) 
        setTimeout(()=>{
          window.location.reload(true) 
        },1000)
      }

  return (
    <Card className='div-center-80 p-[20px] flex justify-between User-Image-Card'>
        <div>

      {/* <h2>Change Image</h2> */}
      <div class="form-row">
        <input type="file" className='form-font' id="image" accept="image/*" onChange={handleimage} />
      </div>
        </div>


      <div className='w-[100px] h-[100px] relative flex justify-center Image-box' style={{borderRadius:"50%",background:"brown",alignItems:"center",color:"white"}}>
        {!props?.user?.image ?
            <h3 className='form-font'>{props?.user?.name.substring(0,1)}</h3>:
            <img alt="Image" src={props.user?.image}  className="absolute w-[100%] h-[100%] border-r-[50%]" style={{borderRadius:"50%"}}/>
        }
      </div>
    </Card>
  )
}

export default UploadUserImage
