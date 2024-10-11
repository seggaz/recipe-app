import { useNavigate, Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@mui/material'
import LunchDiningIcon from '@mui/icons-material/LunchDining'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useRecipeStore } from '../store/useRecipeStore'

const Header = () => {
	const navigate = useNavigate()
	const { setSearchTerm, setSelectedCategory } = useRecipeStore() // Access state management

	const handleAllRecipesClick = () => {
		setSearchTerm('') // Clear the search term
		setSelectedCategory(null)
		navigate('/') // Redirect to All Recipes
	}

	return (
		<AppBar position='static'>
			<Toolbar>
				<Button
					color='inherit'
					onClick={handleAllRecipesClick}
					endIcon={<LunchDiningIcon />}
					sx={{ mr: 2 }}
				>
					All Recipes
				</Button>
				<Button
					color='inherit'
					component={Link}
					to='/selected'
					endIcon={<ShoppingCartIcon />}
				>
					Selected Recipes
				</Button>
			</Toolbar>
		</AppBar>
	)
}

export default Header
