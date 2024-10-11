import { create } from 'zustand'
import { Recipe } from '../types'

interface RecipeStore {
	recipes: Recipe[]
	selectedRecipes: Recipe[]
	categories: string[]
	currentPage: number
	searchTerm: string
	selectedCategory: string | null
	setRecipes: (recipes: Recipe[]) => void
	selectRecipe: (recipe: Recipe) => void
	deselectRecipe: (id: string) => void
	setCategories: (categories: string[]) => void
	setCurrentPage: (page: number) => void
	setSearchTerm: (term: string) => void
	setSelectedCategory: (category: string | null) => void
}

export const useRecipeStore = create<RecipeStore>(set => ({
	recipes: [],
	selectedRecipes: [],
	categories: [],
	currentPage: 1,
	searchTerm: '',
	selectedCategory: null,
	setRecipes: recipes => set({ recipes }),
	selectRecipe: recipe =>
		set(state => ({
			selectedRecipes: [...state.selectedRecipes, recipe],
		})),
	deselectRecipe: id =>
		set(state => ({
			selectedRecipes: state.selectedRecipes.filter(
				recipe => recipe.idMeal !== id
			),
		})),
	setCategories: categories => set({ categories }),
	setCurrentPage: page => set({ currentPage: page }),
	setSearchTerm: term => set({ searchTerm: term }),
	setSelectedCategory: category => set({ selectedCategory: category }),
}))
