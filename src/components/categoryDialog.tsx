"use client"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { Textarea } from './ui/textarea'
import { useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
const widgetList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
export default function CategoryDialog({
    text,
    name,
    onPost,
    type,
    widget,
    description,
    children,
    status,
    onPut,
    id
}: {
    text: string
    name: string
    status?: boolean
    onPost?: (name: string, widget: number, description: string) => any
    onPut?: (name: string,
        status: number,
        widget: number,
        description: string,
        id: string) => any
    type: number
    widget: number
    description: string
    id?: string
    children: React.ReactNode
}) {
    const [currentName, setCurrentName] = useState(name)
    const [checked, setChecked] = useState(status)
    const [currentWidget, seyCurrentWidget] = useState(widget)
    const [currentDesc, seyCurrentDesc] = useState(description)

    const actions = () => {
        if (type === 1) {
            onPost?.(currentName, currentWidget, currentDesc)
        } else {
            onPut?.(
                currentName,
                Number(checked),
                currentWidget,
                currentDesc,
                id as string
            )
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{text}资源分类</DialogTitle>
                    <DialogDescription>
                        每一次精准的分类{text}，都有可能助力一个好产品！
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            分类名称
                        </Label>
                        <Input id="name" value={currentName} className="col-span-3" onChange={e => setCurrentName(e.target.value)} />
                    </div>
                    {
                        type === 2 && <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                是否启用
                            </Label>
                            <Switch id="airplane-mode" checked={checked} onCheckedChange={e => setChecked(e)} className="col-span-3" />
                        </div>
                    }
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            权重
                        </Label>
                        <div className="col-span-3">
                            <Select onValueChange={e => seyCurrentWidget(Number(e))} defaultValue={currentWidget.toString()}>
                                <SelectTrigger >
                                    <SelectValue placeholder="Select a fruit" defaultValue={currentWidget.toString()}/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {widgetList.map((item) => {
                                            return (
                                                <SelectItem value={item.toString()} key={item}>{item}</SelectItem>
                                            )
                                        })}

                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
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