"use client"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { Textarea } from './ui/textarea'
import { useEffect, useState } from 'react'
import Uploader from './uploader'
import SelectComponent from './select-component'
import { findAll } from '@/actions/category'
import WidgetSelect from './widget-select'
import { z } from 'zod'
import { postSchema } from "@/schemas/resources";
export default function ResourceDialog({
    tip,
    id,
    title,
    name,
    status,
    url,
    cover,
    categoryId,
    type,
    widget,
    description,
    children,
    onPut,
    onPost,
}: {
    tip: string
    title: string
    name: string
    status?: boolean
    url: string
    cover: string
    categoryId: string
    type: number
    widget: number
    description: string
    id?: string
    children: React.ReactNode
    onPost?: (body: z.infer<typeof postSchema>) => any
    onPut?: (body: z.infer<typeof postSchema> & { id: number, status: number }) => any
}) {
    const [currentTitle, setCurrentTitle] = useState(title)
    const [currentName, setCurrentName] = useState(name)
    const [currentStatus, setCurrentStatus] = useState(status)
    const [currentUrl, setCurrentUrl] = useState(url)
    const [currentCover, setCurrentCover] = useState(cover)
    const [currentCategoryId, setCurrentCategoryId] = useState(categoryId)
    const [currentWidget, setCurrentWidget] = useState(widget)
    const [currentDesc, seyCurrentDesc] = useState(description)
    const [categoryList, setCategoryList] = useState<Array<{ label: string, value: string }>>([])
    useEffect(() => {
        categoryhandler()
    }, [])
    const actions = () => {
        if (type === 1) {
            onPost?.({
                name: currentName,
                title: currentName,
                description: currentDesc,
                url: currentUrl,
                cover: currentCover,
                category: currentCategoryId,
                widget: Number(currentWidget)
            })
        } else {
            onPut?.(
                {
                    name: currentName,
                    title: currentName,
                    description: currentDesc,
                    url: currentUrl,
                    cover: currentCover,
                    category: currentCategoryId,
                    widget: Number(currentWidget),
                    status: currentStatus ? 2 : 3,
                    id: Number(id)
                }
            )
        }
    }
    const categoryhandler = async () => {
        const list = await findAll()
        const result = list.map(item => ({ label: item.name, value: item.id.toString() }))
        setCategoryList(result)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{tip}资源</DialogTitle>
                    <DialogDescription>
                        每一次精准的资源{tip}，都有可能助力一个好产品！
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            资源标题
                        </Label>
                        <Input id="name" value={currentTitle} className="col-span-3" onChange={e => setCurrentTitle(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            资源名称
                        </Label>
                        <Input id="name" value={currentName} className="col-span-3" onChange={e => setCurrentName(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            资源分类
                        </Label>
                        <SelectComponent
                            className='col-span-3'
                            placeholder='请选择分类资源'
                            options={categoryList}
                            value={currentCategoryId}
                            onSelect={setCurrentCategoryId}
                        />
                    </div>
                    {
                        type === 2 && <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                是否启用
                            </Label>
                            <Switch id="airplane-mode" checked={currentStatus} onCheckedChange={e => setCurrentStatus(e)} className="col-span-3" />
                        </div>
                    }
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            资源地址
                        </Label>
                        <Input id="name" value={currentUrl} className="col-span-3" onChange={e => setCurrentUrl(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            资源封面
                        </Label>
                        <Uploader className='col-span-1' url={currentCover} uploadSuccess={(val) => setCurrentCover(val)}></Uploader>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            权重
                        </Label>
                        <WidgetSelect className='col-span-3' value={currentWidget.toString()} onSelect={val => setCurrentWidget(val)}></WidgetSelect>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            描述
                        </Label>
                        <Textarea id="airplane-mode" value={currentDesc} className="resize-none col-span-3" onChange={e => seyCurrentDesc(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit" onClick={actions}>{type === 1 ? '新建' : '修改'}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}