'use client'

import type { PaginationProps } from 'antd'
import { Pagination } from 'antd'

const PostPagination = ({
  total,
  setLimit,
  setPage,
  setFetcher,
}: PostPaginatinoProps) => {
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setLimit(pageSize)
    setPage(current)
    setFetcher(true)
  }
  return (
    <div className="flex w-full items-center justify-center">
      <Pagination
        showSizeChanger
        onChange={onShowSizeChange}
        defaultCurrent={1}
        total={total}
      />
    </div>
  )
}

export default PostPagination
