import React, { ChangeEvent } from 'react'
import { useRecipeStore } from '../store/useRecipeStore'
import debounce from 'lodash.debounce'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const SearchBar: React.FC = () => {
	const { setSearchTerm } = useRecipeStore()

	const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}, 500)

	return (
		<TextField
			label='Search for recipes...'
			variant='outlined'
			onChange={handleSearch}
			fullWidth
			sx={{ marginBottom: 2 }}
			InputProps={{
				endAdornment: (
					<InputAdornment position='end'>
						<SearchIcon />
					</InputAdornment>
				),
			}}
		/>
	)
}

export default SearchBar
