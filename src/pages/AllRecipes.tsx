import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Recipe } from '../types'
import RecipeCard from '../components/RecipeCard'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'
import Filter from '../components/Filter'
import { useRecipeStore } from '../store/useRecipeStore'
import { Box } from '@mui/material'

const AllRecipes: React.FC = () => {
	const { recipes, setRecipes, searchTerm, currentPage, setCurrentPage } =
		useRecipeStore()
	const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([])

	const itemsPerPage = 8

	useEffect(() => {
		setCurrentPage(1)
		axios
			.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
			.then(res => {
				setRecipes(res.data.meals || [])
			})
	}, [searchTerm, setRecipes, setCurrentPage])

	useEffect(() => {
		const startIndex = (currentPage - 1) * itemsPerPage
		const paginatedRecipes = recipes.slice(
			startIndex,
			startIndex + itemsPerPage
		)
		setDisplayedRecipes(paginatedRecipes)
	}, [recipes, currentPage])

	const totalPages = Math.ceil(recipes.length / itemsPerPage)

	return (
		<Box sx={{ padding: 2 }}>
			<SearchBar />
			<Filter />
			<Box
				display='grid'
				gridTemplateColumns='repeat(auto-fill, minmax(250px, 1fr))'
				gap={2}
			>
				{displayedRecipes.map(recipe => (
					<RecipeCard key={recipe.idMeal} recipe={recipe} />
				))}
			</Box>
			{totalPages > 1 && <Pagination totalPages={totalPages} />}
		</Box>
	)
}

export default AllRecipes
