import { FirebaseStorage } from '@/firebase/config';
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
// import axios from 'axios'

const uploadImage = async (file) => {
    if (!file) return

    try {
        //////using Cloudinary 

        // const formData = new FormData()
        // formData.append('upload_preset', 'curso-vue')
        // formData.append('file', file)

        // const url = `https://www.api.cloudinary.com/v1_1/dlzvhqqqa/image/upload`
        // const {data} = await axios.post(url, formData)
        // console.log(data)

        // return data.secure_url
///////////////////////

        /////////using Firebase
        const storageRef = ref(FirebaseStorage, `journal/${Date.now()}`)
        const resp = await uploadBytes(storageRef, file).then(snapshot => {
           return getDownloadURL(snapshot.ref).then(url => url)
        })
      

        return resp




    } catch (error) {
        console.error('Error uploading image, check the logs')
        console.log(error)
        return null
    }
}

export default uploadImage