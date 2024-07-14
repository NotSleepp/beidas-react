import { ChangeEvent, FormEvent, useEffect, useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppStore } from '../stores/useAppstore'
import { useState } from 'react'

export default function Header() {
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })

    const { pathname } = useLocation()

    const isHome = useMemo(() => pathname === '/', [pathname])

    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    const showNotification = useAppStore((state) => state.showNotification)


    useEffect(() => {
        fetchCategories()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name] : e.target.value
        })
    }

    const handleSumit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // TODO validar
        if(Object.values(searchFilters).includes('')){
            showNotification({text:'todos los campos son obligatorios', error: true})
            console.log()
            return
        }
        // Consultar Recetas
        searchRecipes(searchFilters)
    }

    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src='/logo.svg' alt="logo" />
                    </div>

                    <nav className='flex gap-4'>
                        <NavLink
                            to='/'
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }>
                            Inicio</NavLink>
                        <NavLink
                            to='/favoritos'
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>
                            Favoritos</NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form className='md:w-1/2 2xl:w-1/3 bg-orange-500 my-32 p-10 rounded-lg shadow space-y-6' onSubmit={handleSumit}>
                        <div className='space-y-4'>
                            <label
                                htmlFor="ingredient"
                                className='block text-white uppercase font-extrabold text-lg'
                            >Nombre o Ingredientes</label>
                            <input
                                type="text"
                                id='ingredient'
                                name='ingredient'
                                className='p-3 w-full rounded-lg focus:outline-none'
                                placeholder='Nomre o Ingrediente. Ej. Vodka, Tequila, Café'
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                            />
                        </div>
                        <div className='space-y-4'>
                            <label
                                htmlFor="category"
                                className='block text-white uppercase font-extrabold text-lg'
                            >Categoria</label>
                            <select
                                id='category'
                                name='category'
                                className='p-3 w-full rounded-lg focus:outline-none'
                                onChange={handleChange}
                                value={searchFilters.category}
                            >
                                <option value="">-- Seleeccione --</option>
                                {categories.drinks.map(category => (
                                    <option
                                        key={category.strCategory}
                                        value={category.strCategory}>
                                        {category.strCategory}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input
                            type="submit"
                            value='Buscar Recetas'
                            className='cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase'
                        />
                    </form>
                )}

            </div>
        </header>
    )
}