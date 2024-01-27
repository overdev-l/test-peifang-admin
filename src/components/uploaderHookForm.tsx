import { Plus } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { uploadResourceCover } from "@/actions/aws-s3"
import { ChangeEvent} from "react";
import { ControllerRenderProps } from 'react-hook-form';
import { formSchema } from "@/schemas/register";
import z from 'zod'

export default function Uploader({
    field,
    className
}: { field: ControllerRenderProps<z.infer<typeof formSchema>, "avatar">,  className?: string }) {


    const fileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const formData = new FormData()
            formData.set("file", file)
            const url = await uploadResourceCover(formData)
            field.onChange(url as string)
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
                ref={field.ref}
            />
            {
                !field.value ? <Plus></Plus> : <Image src={field.value} width={80} height={80} alt='cover'></Image>
            }
        </div>
    )
}