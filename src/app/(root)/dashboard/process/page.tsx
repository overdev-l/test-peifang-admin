"use client"
import { PageWapper, PageContent, PageHeader, PageFooter } from '@/components/page-wapper'
import { get } from '@/actions/process';
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

import ProcessResource from '@/components/process-resource';
import SelectComponent from '@/components/select-component'
import PaginationComponent from '@/components/pagination-component'
export default function PageTag() {
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [type, setType] = useState<"resource" | "article">("resource")
  const [total, setTotal] = useState(0)
  const [tableData, setTableData] = useState<any>([])
  useEffect(() => {
    dataHandler()
  }, [])
  const dataHandler = async () => {
    const { total, list } = await get(page, size, type)
    setTotal(total)
    setTableData(list)
  }
  const queryResource = () => {
    setPage(1)
    setSize(10)
    dataHandler()
  }
  const options = [
    {
      label: "文章",
      value: "article"
    },
    {
      label: "资源",
      value: "resource"
    },
  ]
  return (
    <PageWapper>
      <PageHeader>
        <SelectComponent value={type} options={options} onSelect={(val) => setType(val as "resource" | "article")} className='w-28' placeholder='请选择类型' />
        <Button onClick={queryResource}>查询</Button>
      </PageHeader>
      <PageContent>
        {
          type === "resource" ? <ProcessResource list={tableData} effect={dataHandler} /> : <div></div>
        }
      </PageContent>
      <PageFooter>
        <PaginationComponent page={page} size={size} total={total} onPage={(val) => setPage(val)}></PaginationComponent>
      </PageFooter>
    </PageWapper>
  )
}
