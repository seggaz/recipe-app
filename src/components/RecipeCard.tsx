import { Link } from 'react-router-dom'
import { Recipe } from '../types'
import { Card, CardContent, CardMedia, Button, Typography } from '@mui/material'
import { useRecipeStore } from '../store/useRecipeStore'

interface RecipeCardProps {
	recipe: Recipe
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
	const { selectRecipe, deselectRecipe, selectedRecipes } = useRecipeStore()
	const isSelected = selectedRecipes.some(r => r.idMeal === recipe.idMeal)

	const handleSelect = () => {
		if (isSelected) {
			deselectRecipe(recipe.idMeal)
		} else {
			selectRecipe(recipe)
		}
	}

	return (
		<Card
			sx={{
				maxWidth: 345,
				transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
				'&:hover': {
					transform: 'scale(1.05)',
					boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
				},
			}}
		>
			<CardMedia
				component='img'
				height='140'
				image={recipe.strMealThumb}
				alt={recipe.strMeal}
			/>
			<CardContent>
				<Typography gutterBottom variant='h5'>
					{recipe.strMeal}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{recipe.strCategory}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{recipe.strArea}
				</Typography>
				<Button
					component={Link}
					to={`/recipe/${recipe.idMeal}`}
					variant='contained'
					sx={{ mt: 2, mr: 0.5 }}
				>
					More Details
				</Button>
				<Button
					onClick={handleSelect}
					variant={isSelected ? 'contained' : 'outlined'}
					sx={{ mt: 2 }}
				>
					{isSelected ? 'Cancel' : 'Select'}
				</Button>
			</CardContent>
		</Card>
	)
}

export default RecipeCard
