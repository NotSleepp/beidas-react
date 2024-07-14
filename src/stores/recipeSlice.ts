import { StateCreator } from "zustand"
import { getCategories, getRecipieById, getRecipies } from "../services/RecipeService"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"

export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    selectedRecipe: Recipe
    modal: boolean
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilter: SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: { drinks: [] },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async (filters) => {
        const drinks = await getRecipies(filters)
        set({
            drinks
        })
    },
    selectRecipe: async (id) => {
       const selectedRecipe =  await getRecipieById(id)
       set({
        selectedRecipe,
        modal: true
    })
    },
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as Recipe
        })
    }
})