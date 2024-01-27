"use server"
import { S3, PutObjectCommand } from "@aws-sdk/client-s3"
export const uploadResourceCover = async (formData: FormData) => {
    const file = formData.get("file") as File
    const s3 = new S3({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS__KEY!,
            secretAccessKey: process.env.AWS_SECTRE_KEY!
        }
    })
    const bfile = await file.arrayBuffer()
    const fileBuffer = Buffer.from(bfile)
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.name,
        Body: fileBuffer,
        ContentType: file.type
    }

    try {
        const upload = await s3.send(new PutObjectCommand(params))
        return `https://d2pwlbghwqo3td.cloudfront.net/${file.name}`
    } catch(e) {
        console.log(e)
        return e
    }

}