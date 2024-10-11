import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AllRecipes from './pages/AllRecipes'
import SingleRecipe from './pages/SingleRecipe'
import SelectedRecipes from './pages/SelectedRecipes'
import Header from './components/Header'
import {
	Container,
	CssBaseline,
	ThemeProvider,
	createTheme,
} from '@mui/material'

const theme = createTheme()

const App: React.FC = () => (
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<Router>
			<Header />
			<Container>
				<Routes>
					<Route path='/' element={<AllRecipes />} />
					<Route path='/recipe/:id' element={<SingleRecipe />} />
					<Route path='/selected' element={<SelectedRecipes />} />
				</Routes>
			</Container>
		</Router>
	</ThemeProvider>
)

export default App
