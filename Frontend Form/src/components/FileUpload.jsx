// import React, { useState } from "react";
// import { set } from "react-datepicker/dist/date_utils";
        
// const FileUpload = () => {
//     const [file,setFile]=useState(null);
//     return (
//         <div >
//              <input type="file" onChange={() =>{setFile(e.target.files[0])}} />
//         </div>
//     );
// };
// export default FileUpload;
import React, { useState } from "react"
import axios from 'axios'

function FileUpload() {
  const [file, setFile] = useState()
  const upload = () => {
    const formData = new FormData()
    formData.append('file', file)
    axios.post('http://localhost:3001/upload',formData )
    .then( res => {})
    .catch(er => console.log(er))
  }
   return (
    <div>
      <input type="file" className="text-black" onChange={(e) => setFile(e.target.files[0])}/>
      <button type="button" onClick={upload}>Upload</button>
    </div>
  )
}

export default FileUpload;