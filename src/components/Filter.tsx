import React, { useEffect } from 'react'
import axios from 'axios'
import { useRecipeStore } from '../store/useRecipeStore'
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	SelectChangeEvent,
} from '@mui/material'

const Filter: React.FC = () => {
	const {
		categories,
		setCategories,
		setRecipes,
		selectedCategory,
		setSelectedCategory,
	} = useRecipeStore()

	useEffect(() => {
		axios
			.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
			.then(res => {
				const categoryNames = res.data.meals.map(
					(meal: any) => meal.strCategory
				)
				setCategories(categoryNames)
			})
	}, [setCategories])

	useEffect(() => {
		// Fetch all recipes when the selected category changes
		if (selectedCategory) {
			axios
				.get(
					`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
				)
				.then(res => {
					setRecipes(res.data.meals)
				})
		} else {
			// Fetch all recipes if no category is selected
			axios
				.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
				.then(res => {
					setRecipes(res.data.meals)
				})
		}
	}, [selectedCategory, setRecipes])

	const handleFilter = (category: string) => {
		setSelectedCategory(category === 'All' ? '' : category) // Set selected category
	}

	return (
		<FormControl fullWidth variant='outlined' sx={{ mb: 2 }}>
			{/* <InputLabel id='category-select-label'>Select category</InputLabel> */}
			<Select
				labelId='category-select-label'
				value={selectedCategory || 'All'}
				onChange={(e: SelectChangeEvent<string>) =>
					handleFilter(e.target.value)
				}
			>
				<MenuItem value='All'>All Сategories</MenuItem>
				{categories.map((category: string) => (
					<MenuItem key={category} value={category}>
						{category}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default Filter
