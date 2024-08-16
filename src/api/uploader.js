import axios from 'axios';

export async function uploadImage(file) {
   const data = new FormData();
   data.append('file', file);
   data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);

   try {
      const response = await axios.post(
         process.env.REACT_APP_CLOUDINARY_URL,
         data
      );
      return response.data.url;
   } catch (error) {
      console.error('이미지 업로드 중 오류 발생 : ', error);
      throw error;
   }
}
