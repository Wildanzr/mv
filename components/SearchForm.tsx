'use client'

import { useState } from 'react'
import { Input, Select } from 'antd'

const { Search } = Input

const SearchForm = ({
  search,
  setSearch,
  setPost,
  setTotal,
  setPage,
}: SearchFormProps) => {
  const [mode, setMode] = useState<string>('caption')
  const onSearch = (value: string) => {
    console.log(mode, value)
  }

  const handleChange = (value: string) => {
    setMode(value)
  }
  return (
    <div className="flex flex-row space-x-3 w-full h-full">
      <Select
        defaultValue="caption"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: 'caption', label: 'Caption' },
          { value: 'tags', label: 'Tags' },
        ]}
      />
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
    </div>
  )
}

export default SearchForm
