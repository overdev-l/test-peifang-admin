import { Plus } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { uploadResourceCover } from "@/actions/aws-s3"
import { ChangeEvent, useState } from "react";

export default function Uploader({
    url,
    uploadSuccess,
    className
}: { url: string, uploadSuccess: (url: string) => any, className?: string }) {

    const [cover, setCover] = useState(url)
    const fileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const formData = new FormData()
            formData.set("file", file)
            const url = await uploadResourceCover(formData)
            setCover(url as string)
            console.log(url)
            uploadSuccess(url as string)
        }
    }
    return (
        <div className={cn(
            "aspect-square relative border rounded-md hover:border-2 flex justify-center items-center",
            className
        )}>
            <input
                type="file"
                className='absolute left-0 top-0 bottom-0 right-0 hover:cursor-pointer opacity-0'
                accept=".png,.jpg,.jpeg,.webp"
                onChange={fileChange}
            />
            {
                !cover ? <Plus></Plus> : <Image src={cover} width={80} height={80} alt='cover'></Image>
            }
        </div>
    )
}