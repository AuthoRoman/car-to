import { TextField } from '@mui/material'
import React, { memo } from 'react'

interface SearchInputProps{
    textLabel: string, 
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
}

const SearchInput:React.FC<SearchInputProps> = memo(({onChange, textLabel}) => {
  return (
    <TextField
                size="small"
                onChange={onChange}
                id="outlined-search"
                label={textLabel}
                type="search"
              />
  )
})

export default SearchInput
