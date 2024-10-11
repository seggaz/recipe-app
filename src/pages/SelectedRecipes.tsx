import React from 'react'
import { useRecipeStore } from '../store/useRecipeStore'
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Typography,
	List,
	ListItem,
} from '@mui/material'
import MoodBadIcon from '@mui/icons-material/MoodBad'

const SelectedRecipes: React.FC = () => {
	const { selectedRecipes } = useRecipeStore()

	if (!selectedRecipes || selectedRecipes.length === 0) {
		return (
			<Box sx={{ textAlign: 'center', mt: 4 }}>
				<Typography variant='h4'>No selected recipes</Typography>
				<Box sx={{ mt: 2 }}>
					<MoodBadIcon fontSize='large' sx={{ fontSize: '48px' }} />
				</Box>
			</Box>
		)
	}
	const combinedIngredients: { [key: string]: string[] } = {}

	selectedRecipes.forEach(recipe => {
		for (let i = 1; i <= 20; i++) {
			const ingredient = recipe[`strIngredient${i}`]
			const measure = recipe[`strMeasure${i}`]
			if (ingredient && ingredient.trim() !== '') {
				if (combinedIngredients[ingredient]) {
					combinedIngredients[ingredient].push(measure)
				} else {
					combinedIngredients[ingredient] = [measure]
				}
			}
		}
	})

	return (
		<Box>
			<Typography variant='h4' sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
				Selected Recipes
			</Typography>
			<Box display='flex' flexWrap='wrap' gap={2}>
				{selectedRecipes.map(recipe => (
					<Card key={recipe.idMeal} sx={{ maxWidth: 345 }}>
						<CardMedia
							component='img'
							height='200'
							image={recipe.strMealThumb}
							alt={recipe.strMeal}
						/>
						<CardContent>
							<Typography variant='h5'>{recipe.strMeal}</Typography>
							<Typography>
								{recipe.strInstructions
									? recipe.strInstructions.substring(0, 100) + '...'
									: 'No instructions available for this recipe.'}
							</Typography>
						</CardContent>
					</Card>
				))}
			</Box>

			<Typography variant='h4' sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
				Combined Ingredient List
			</Typography>
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				sx={{ mt: 4 }}
			>
				<List
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: 2,
						justifyContent: 'center',
					}}
				>
					{Object.entries(combinedIngredients).map(
						([ingredient, measures], index) => (
							<ListItem key={index} sx={{ width: 'auto', padding: 0 }}>
								<Card sx={{ minWidth: 200 }}>
									<CardContent>
										<Typography variant='h6'>{ingredient}</Typography>
										<Typography variant='body2'>
											{measures.join(' + ')}
										</Typography>
									</CardContent>
								</Card>
							</ListItem>
						)
					)}
				</List>
			</Box>
		</Box>
	)
}

export default SelectedRecipes
