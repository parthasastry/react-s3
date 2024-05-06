import { useState } from 'react'
import axios from 'axios'

const GetFile = () => {
    const [filename, setFilename] = useState("")
    const [image, setImage] = useState("")

    const getImage = async () => {
        const url = `https://iebfvkv2nk.execute-api.us-east-2.amazonaws.com/DEV/file-download-presignedurl?file_name=${filename}`

        const result = await axios.get(url)
        console.log("result", result.data.url)
        setImage(result.data.url)
        console.log("image: ", image)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getImage()
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input className='border w-full' onChange={(e) => setFilename(e.target.value)} />
                    <button className="bg-red-500 text-white w-[100px] rounded" type="submit">Get File</button>
                </form>
            </div>
            {image ? (
                <div>
                    <img src={image} alt="test" />
                </div>
            ) : null}
        </div>
    )
}

export default GetFile