import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const clientParams = {
    region: "us-east-1",
    signatureVersion: 'v4'
}

const client = new S3Client(clientParams);
const Bucket = "pssastry-react-file-upload-s3"

export const handler = async (event) => {
    console.log("event: ", event)
    const file_name = event.queryStringParameters.file_name;
    const file_type = event.queryStringParameters.file_type;

    const response = {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*"
        },
        body: JSON.stringify({ message: "Presignedurl successfully generated for PutObject" }),
    };

    const key = file_name
    const getObjectParams = {
        Bucket: Bucket,
        Key: key,
        ContentType: file_type
    }

    try {
        const command = new PutObjectCommand(getObjectParams);
        const url = await getSignedUrl(client, command, { expiresIn: 3600 });
        console.log("presigned URL: ", url)
        response.statusCode = 200
        response.body = JSON.stringify({ message: "Success", "url": url })
    } catch (e) {
        console.error(e)
        response.statusCode = 400
        response.body = JSON.stringify({ message: `Failed to generate presignedurl for file ${file_name}` })
    }

    return response
}