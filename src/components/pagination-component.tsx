import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

export default function PaginationComponent({
    total,
    page,
    size,
    onPage
}: {
    total: number
    page: number,
    size: number,
    onPage: (page: number) => void
}) {
    const total_pages = Math.ceil(total / size);
    const maxPageNumbers = 10; // 最大显示页码数

    // 计算起始和结束页码
    let startPage = Math.max(1, page - Math.floor(maxPageNumbers / 2));
    let endPage = Math.min(total_pages, startPage + maxPageNumbers - 1);

    // 调整起始和结束页码，以确保总是显示maxPageNumbers个页码（如果总页数允许）
    if (endPage - startPage + 1 < maxPageNumbers) {
        startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }

    const handlePageClick = (newPage: number) => {
        if (newPage < 1 || newPage > total_pages) {
            return;
        }
        onPage(newPage);
    };

    if (total_pages <= 1) {
        return (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        );
      }


    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={() => handlePageClick(page - 1)} />
                </PaginationItem>

                {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                    <PaginationItem key={index + startPage}>
                        <PaginationLink
                            href="#"
                            isActive={page === index + startPage}
                            onClick={() => handlePageClick(index + startPage)}
                        >
                            {index + startPage}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext href="#" onClick={() => handlePageClick(page + 1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}