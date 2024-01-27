import { CheckCircle2, XCircle } from "lucide-react";
import AlertDialogComponent from "./alert-dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { resourceCheck } from "@/actions/process"


export default function ProcessResource({
    list,
    effect
}: {
    list: Array<any>
    effect: () => Promise<void>
}) {
    const openLink = (url: string) => {
        window.open(url, "_blank")
    }
    const onSubmit = async (id: number, status: 3 | 2) => {
        await resourceCheck(id, status)
        effect()
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='text-center'>资源标题</TableHead>
                    <TableHead className='text-center'>资源名称</TableHead>
                    <TableHead className='text-center'>所属分类</TableHead>
                    <TableHead className='text-center'>状态</TableHead>
                    <TableHead className='text-center'>资源地址</TableHead>
                    <TableHead className='text-center'>资源封面</TableHead>
                    <TableHead className='text-center'>分类状态</TableHead>
                    <TableHead className='text-center'>修改用户</TableHead>
                    <TableHead className='text-center'>操作</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {list.map((item: any) => (
                    <TableRow key={item.id}>
                        <TableCell className='text-center'>{item.title}</TableCell>
                        <TableCell className='text-center'>{item.name}</TableCell>
                        <TableCell className='text-center'>
                            <Badge>{item.category_name}</Badge>
                        </TableCell>
                        <TableCell className='text-center'>
                            <Badge variant={item.status === 1 ? 'default' : 'destructive'}>
                                {item.status === 1 ? '正常' : '封禁'}
                            </Badge>
                        </TableCell>
                        <TableCell className='text-center'>
                            <Button variant="link" onClick={() => openLink(item.link)}>{item.url}</Button>
                        </TableCell>
                        <TableCell className='flex justify-center'>
                            <Avatar>
                                <AvatarImage sizes='20' src={item.cover} />
                                <AvatarFallback>{item.title}</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell className='text-center'>
                            <Badge variant={item.category_status === 1 ? 'default' : 'destructive'}>
                                {item.category_status === 1 ? '正常' : '封禁'}
                            </Badge>
                        </TableCell>
                        <TableCell className='flex justify-center'>
                            <Avatar>
                                <AvatarImage sizes='20' src={item.modifier_avatar} />
                                <AvatarFallback>{item.modifier_nickname}</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>
                            <div className='flex justify-center gap-1'>
                                <AlertDialogComponent title='您确定要通过审核吗？' description='通过此审核会展示在对应分类下' onSubmit={() => onSubmit(item.id, 2)}>
                                    <Button variant="default" size="icon">
                                        <CheckCircle2 className='w-4 h-4'></CheckCircle2>
                                    </Button>
                                </AlertDialogComponent>
                                <AlertDialogComponent title='您确定要驳回审核吗？' description='驳回此审核不会展示在对应分类下' onSubmit={() => onSubmit(item.id, 3)}>
                                    <Button variant="destructive" size="icon">
                                        <XCircle className='w-4 h-4'></XCircle>
                                    </Button>
                                </AlertDialogComponent>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}