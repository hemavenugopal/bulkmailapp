import { useState } from 'react'
import axios from 'axios'
import * as  XLSX from 'xlsx'


function App() {
  const[msg, setMsg] = useState("")
  const[status, setStatus] = useState(false)
  const[emailList, setEmailList] = useState([])
    function handleMsg(event){
    setMsg(event.target.value)
  }
  function send(){
    setStatus(true)
    // axios.post("http://localhost:5000/sendemail",{msg:msg,emailList:emailList})
    axios.post("https://bulkmailapp-backend-ozqn.onrender.com/sendemail",{msg:msg,emailList:emailList})
    .then(function(data){
      if(data.data === true){
        alert("Email sent successfully")
        setStatus(false)
      }
      else{
        alert("Failed")
        setStatus(false)
      }

    })
    }
    function handleFile(event){
       const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = function(event){
        const data = event.target.result
        const workbook = XLSX.read(data,{type:"binary"})
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const emailList = XLSX.utils.sheet_to_json(worksheet,{header:'A'})
        const totalEmail = emailList.map((item)=>{
          return (item.A)
        })
        console.log(totalEmail);
        setEmailList(totalEmail)
        
    }

    reader.readAsBinaryString(file)

    }
      
    
  
  return (
    <div>
    <div className='bg-blue-950 text-white text-center'>
      <h1 className='text-2xl font-medium px-5 py-3'>BulkMail</h1>
    </div>
     <div className='bg-blue-800 text-white text-center'>
      <h1 className='font-medium px-5 py-3'>We can help your business with sending multiple emails at once</h1>
    </div>
    <div className='bg-blue-600 text-white text-center'>
      <h1 className='font-medium px-5 py-3'>Drag and Drop</h1>
    </div>
    <div className='bg-blue-400 flex flex-col text-black items-center px-5 py-3'>
      <textarea onChange={handleMsg} value={msg} className='w-[80%] h-32 py-2 outline-none px-2 border border-black rounded-md' placeholder='Enter your email...'></textarea>
     <div >
      <input type='file' onChange={handleFile} className='border-4 border-dashed px-4 py-4 mt-5 mb-5'/>
    </div>
    <p>Total emails in the file: {emailList.length}</p>
    <button onClick={send} className='bg-blue-950 text-white px-2 py-2 rounded-md font-medium mt-2'>{status?"Sending...":"Send"}</button>
    </div>
   
    
    
      <div className='bg-blue-300 text-white text-center p-8'>
      
    </div>
      <div className='bg-blue-200 text-white text-center p-8'>
      
    </div>
    </div>
  )
}

export default App
