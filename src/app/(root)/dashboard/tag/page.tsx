"use client"
import { PageWapper, PageContent, PageHeader, PageFooter } from '@/components/page-wapper'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table'
import { Edit, Trash2 } from "lucide-react"
import { categoryList, post, put, del } from "@/actions/category"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from "@/components/ui/badge"

import AlertDialogComponent from '@/components/alert-dialog'
import PaginationComponent from '@/components/pagination-component'
import CategoryDialog from '@/components/categoryDialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
    const { totalCategoryCount, categoriesWithCounts } = await categoryList(page, size, name)
    setTotal(totalCategoryCount)
    setTableData(categoriesWithCounts)
  }
  const queryResource = () => {
    setPage(1)
    setSize(10)
    dataHandler()
  }

  const postEffect = async (name: string, widget: number, description: string) => {
    await post(name, widget, description)
    dataHandler()
  }
  const putEffect = async (name: string,
    status: number,
    widget: number,
    description: string,
    id: string
    ) => {
    await put(name, status, widget,  description, id)
    dataHandler()
  }

  const delEffect = async (id: string) => {
    await del(id)
    dataHandler()
  }

  return (
    <PageWapper>
      <PageHeader>
        <Input type="text" placeholder="分类名称" className='max-w-28' value={name} onChange={e => setName(e.target.value)} />
        <Button onClick={queryResource}>查询</Button>
        <CategoryDialog text='添加'
          name={""}
          onPost={postEffect}
          type={1}
          widget={0}
          description={""}
        >
          <Button>添加</Button>
        </CategoryDialog>
      </PageHeader>
      <PageContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>分类名称</TableHead>
              <TableHead className='text-center'>分类状态</TableHead>
              <TableHead className='text-center'>资源数量</TableHead>
              <TableHead className='text-center'>添加时间</TableHead>
              <TableHead className='text-center'>添加用户</TableHead>
              <TableHead className='text-center'>修改时间</TableHead>
              <TableHead className='text-center'>修改用户</TableHead>
              <TableHead className='text-center'>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className='text-center'>{item.name}</TableCell>
                <TableCell className='text-center'>
                  <Badge variant={item.status === 1 ? 'default': 'destructive'}>
                  {item.status === 1 ? '正常': '封禁'}
                  </Badge>
                </TableCell>
                <TableCell className='text-center'>{item.resourceCount}</TableCell>
                <TableCell className='text-center'>{item.create_time}</TableCell>
                <TableCell className='flex justify-center'>
                  <Avatar>
                    <AvatarImage sizes='20' src={item.founder_avatar} />
                    <AvatarFallback>{item.founder_nickname}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className='text-center'>{item.modify_time}</TableCell>

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
                    <CategoryDialog text='编辑'
                      name={item.name}
                      status={item.status}
                      onPut={putEffect}
                      type={2}
                      id={item.id}
                      widget={item.widget}
                      description={item.description}
                    >
                      <Button variant="outline" size="icon">
                        <Edit className='w-4 h-4'></Edit>
                      </Button>
                    </CategoryDialog>

                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageContent>
      <PageFooter>
        <PaginationComponent page={page} size={size} total={total} onPage={(val)=> setPage(val)}></PaginationComponent>
      </PageFooter>
    </PageWapper>
  )
}
