import React from 'react'
import UploadFile from './components/UploadFile'
import GetFile from './components/GetFile'

const App = () => {
  return (
    <div className='mx-auto'>
      <div className='text-xl'> S3 - Upload and Download files</div>
      <UploadFile />
      <GetFile />
    </div>
  )
}

export default App