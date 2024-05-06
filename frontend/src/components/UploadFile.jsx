import axios from 'axios'
import { useState } from 'react'

const UploadFile = () => {
    const [uploadFile, setUploadFile] = useState(null)

    const uploadFileToS3 = async () => {
        const url = `https://iebfvkv2nk.execute-api.us-east-2.amazonaws.com/DEV/file-upload-presignedurl?file_name=${uploadFile.name}&file_type=${uploadFile.type}`

        const getUrl = await axios.get(url)
        const postUrl = getUrl.data.url
        console.log("postUrl", postUrl)

        try {
            const uploadResult = await axios.put(postUrl, uploadFile)
            console.log("uploadResult", uploadResult)
        } catch (e) {
            console.log("Error uploading Object URL", e)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        uploadFileToS3()
        setUploadFile(null)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>Please choose a file to upload</div>
                <input
                    className='w-full'
                    type="file"
                    onChange={(e) => setUploadFile(e.target.files[0])}
                />
                <button className="bg-blue-500 text-white w-[100px] rounded" type="submit">Upload</button>
            </form>
        </div>

    )
}

export default UploadFile