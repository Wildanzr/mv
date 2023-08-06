'use client'

import { useState } from 'react'
import { Input, Select } from 'antd'
import debounce from 'debounce-promise'

const { Search } = Input

const SearchForm = ({ setSearch, setFetcher, setMode }: SearchFormProps) => {
  const [localMode, setLocalMode] = useState<string>('caption')
  const onSearch = debounce((value: string) => {
    setSearch(value)
    setMode(localMode)
    setFetcher(true)
  }, 300)

  const handleChange = (value: string) => {
    setLocalMode(value)
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
      <Search placeholder="Search posts" onChange={(e) => onSearch(e.target.value)} />
    </div>
  )
}

export default SearchForm
