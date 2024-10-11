import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Recipe } from '../types'
import {
	Box,
	Typography,
	List,
	ListItem,
	ListItemText,
	Card,
	CardContent,
	CardMedia,
	Paper,
	Divider,
	CircularProgress,
} from '@mui/material'

const SingleRecipe: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const [recipe, setRecipe] = useState<Recipe | null>(null)

	useEffect(() => {
		axios
			.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
			.then(res => {
				setRecipe(res.data.meals[0])
			})
	}, [id])

	if (!recipe)
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<CircularProgress />
				<Typography variant='h5' style={{ marginLeft: '16px' }}>
					Loading...
				</Typography>
			</div>
		)

	const ingredients = []
	for (let i = 1; i <= 20; i++) {
		const ingredient = recipe[`strIngredient${i}`]
		const measure = recipe[`strMeasure${i}`]
		if (ingredient && ingredient.trim() !== '') {
			ingredients.push(`${ingredient} - ${measure}`)
		}
	}

	return (
		<Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
			<Card sx={{ marginBottom: 4 }}>
				<CardMedia
					component='img'
					src={recipe.strMealThumb}
					alt={recipe.strMeal}
					sx={{ maxHeight: 500 }}
				/>
				<CardContent>
					<Typography variant='h3' gutterBottom>
						{recipe.strMeal}
					</Typography>
					<Typography variant='subtitle1' color='textSecondary'>
						Category: {recipe.strCategory} | Country: {recipe.strArea}
					</Typography>
				</CardContent>
			</Card>

			<Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
				<Typography variant='h5' gutterBottom>
					Ingredients
				</Typography>
				<Divider sx={{ marginBottom: 2 }} />
				<List>
					{ingredients.map((ingredient, index) => (
						<ListItem key={index}>
							<ListItemText primary={ingredient} />
						</ListItem>
					))}
				</List>
			</Paper>

			<Paper elevation={3} sx={{ padding: 3 }}>
				<Typography variant='h5' gutterBottom>
					Instructions
				</Typography>
				<Divider sx={{ marginBottom: 2 }} />
				<Typography variant='body1'>{recipe.strInstructions}</Typography>
			</Paper>
		</Box>
	)
}

export default SingleRecipe
