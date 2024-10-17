import axios from 'axios'

const userapi = async () => {
    const api = "https://script.google.com/macros/s/AKfycbxpQoohOywiBida4LlUnld6bz_W2k-F8nyznjuzVS0GTyB6XzHkERCorYIFUqd2Z8Fi/exec"
     return await axios.get(api)
     .then( 
      (res) => res.data 
    )
}




export default userapi