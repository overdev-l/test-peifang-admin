"use client"
import { PageWapper, PageContent, PageHeader, PageFooter } from '@/components/page-wapper'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table'
import { Edit, Trash2 } from "lucide-react"
import { del, get, post, put } from "@/actions/reources"
import { postSchema } from "@/schemas/resources";
import { Input } from "@/components/ui/input"
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from "@/components/ui/badge"

import AlertDialogComponent from '@/components/alert-dialog'
import PaginationComponent from '@/components/pagination-component'
import ResourceDialog from '@/components/resource-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { z } from 'zod'
import { Resource_Status } from '@/lib/enum'
export default function PageTag() {
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [name, setName] = useState("")
  const [total, setTotal] = useState(0)
  const [tableData, setTableData] = useState<any>([])
  useEffect(() => {
    dataHandler()
  }, [])
  const dataHandler = async () => {
    const { total, list } = await get(page, size, "")
    setTotal(total)
    setTableData(list)
  }
  const queryResource = () => {
    setPage(1)
    setSize(10)
    dataHandler()
  }

  const postEffect = async (body: z.infer<typeof postSchema>) => {
    await post(body)
    dataHandler()
  }
  const putEffect = async (body: z.infer<typeof postSchema> & { id: number, status: number }) => {
    await put(body)
    dataHandler()
  }

  const delEffect = async (id: string) => {
    await del(Number(id))
    dataHandler()
  }

  const openLink = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <PageWapper>
      <PageHeader>
        <Input type="text" placeholder="资源名称" className='max-w-28' value={name} onChange={e => setName(e.target.value)} />

        <Button onClick={queryResource}>查询</Button>
        <ResourceDialog
          tip='添加'
          title=''
          name={""}
          cover=''
          url=''
          categoryId=''
          type={1}
          widget={0}
          description={""}
          onPost={postEffect}
        >
          <Button>添加</Button>
        </ResourceDialog>
      </PageHeader>
      <PageContent>
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
            {tableData.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className='text-center'>{item.title}</TableCell>
                <TableCell className='text-center'>{item.name}</TableCell>
                <TableCell className='text-center'>
                  <Badge>{item.category_name}</Badge>
                </TableCell>
                <TableCell className='text-center'>
                  <Badge variant={item.status === 3 ? 'destructive' : 'default'}>
                    {item.status === 1 ? '待审核' : item.status === 2 ? "正常" : '封禁'}
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
                    <AlertDialogComponent title='您确定要删除此分类吗？' description='删除此分类会导致此分类下所有资源不可见' onSubmit={() => delEffect(item.id)}>
                      <Button variant="destructive" size="icon">
                        <Trash2 className='w-4 h-4'></Trash2>
                      </Button>
                    </AlertDialogComponent>
                    <ResourceDialog
                      tip='编辑'
                      title={item.title}
                      name={item.name}
                      cover={item.cover}
                      status={item.status === 2}
                      url={item.url}
                      categoryId={item.category_id.toString()}
                      type={2}
                      widget={item.widget}
                      id={item.id}
                      description={item.description}
                      onPut={putEffect}
                    >
                      <Button variant="outline" size="icon">
                        <Edit className='w-4 h-4'></Edit>
                      </Button>
                    </ResourceDialog>

                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageContent>
      <PageFooter>
        <PaginationComponent page={page} size={size} total={total} onPage={(val) => setPage(val)}></PaginationComponent>
      </PageFooter>
    </PageWapper>
  )
}
