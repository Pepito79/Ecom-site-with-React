import { useEffect, useState } from 'react'
import { useFilter } from './FilterContext'
import { Tally3 } from 'lucide-react';
import axios from 'axios';
import BookCard from './BookCard';
import { useLanguage } from './LanguageContext';

const MainContent = () => {
    const { minPrice, maxPrice, selectedCategory, keyword, searchQuery } = useFilter();
    const { langage, setLanguage } = useLanguage();
    const [products, setProducts] = useState<any[]>([]);
    const [dropLanguage, setDropLanguage] = useState(false);
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const itemsPerPage = 12;
    const totalProducts = 100;
    const totalPages = Math.ceil(totalProducts / itemsPerPage)

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    }
    const getFiltredProducts = () => {
        let filtredProducts = products;
        if (selectedCategory) {
            filtredProducts = products.filter(product => product.category === selectedCategory)
        }

        if (minPrice !== undefined) {
            filtredProducts = filtredProducts.filter(product => product.price >= minPrice)
        }

        if (maxPrice !== undefined) {
            filtredProducts = filtredProducts.filter(product => product.price <= maxPrice)
        }
        if (searchQuery) {
            filtredProducts = filtredProducts.filter(product => product.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()))
        }
        switch (filter) {
            case "expensive":
                return filtredProducts.sort((a, b) => b.price - a.price)
            case "cheap":
                return filtredProducts.sort((a, b) => a.price - b.price)
            case "popular":
                return filtredProducts.sort((a, b) => b.rating - a.rating)
            default:
                return filtredProducts
        }

    }

    const filtredProducts = getFiltredProducts()
    console.log(filtredProducts)

    const getPaginationButtons = () => {
        const buttons: number[] = [];
        let startPage = Math.max(1, currentPage - 2)
        let endPage = Math.min(totalPages, currentPage + 2)

        if (currentPage - 2 < 1) {
            endPage = Math.min(totalPages, endPage + (2 - currentPage - 1))
        }
        if (currentPage + 2 > totalPages) {
            startPage = Math.min(1, startPage - (2 - totalPages - currentPage))
        }

        for (let page = startPage; page <= endPage; page++) {
            buttons.push(page);
        }
        return buttons;
    }
    useEffect(() => {
        let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${((currentPage - 1) * itemsPerPage)}`
        if (keyword) {
            url = `https://dummyjson.com/products/search?q=${keyword}`
        }
        axios.get(url).then(response => { setProducts(response.data.products); console.log(response.data.products) }).catch(error => { console.error("Error while fetching data"), error })
    }, [currentPage, keyword])
    return (
        <section className='xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5'>
            <div className="mb-5">
                <div className='flex flex-col sm:flex-row justify-between items-center'>
                    <div className="relative mb-5 mt-5">
                        <button className='border px-4 py-2 rounded-full flex items-center'>
                            <Tally3 className='mr-2' onClick={() => setDropDownOpen(!dropDownOpen)} />
                            {filter === "all" ? 'Filter' : filter.charAt(0).toLowerCase() + filter.slice(1)}
                        </button>
                        {dropDownOpen && (
                            <div className='absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40'>
                                <button onClick={() => setFilter("cheap")} className='block px-4 py-3 w-full text-left hover: bg-gray-200'>Cheap</button>
                                <button onClick={() => setFilter("expensive")} className='block px-4 py-3 w-full text-left hover: bg-gray-200'>Expensive</button>
                                <button onClick={() => setFilter("popular")} className='block px-4 py-3 w-full text-left hover: bg-gray-200'>Popular</button>
                            </div>
                        )}

                    </div>
                    <div className='border rounded-xl p-2'>
                        <button className="" onClick={() => { setDropLanguage(!dropLanguage) }}> Language</button>
                        {dropLanguage && (
                            <div className='flex flex-col absolute bg-fuchsia-50 border-gray-300 my-3 ml-[-8px] border rounded'>
                                <button className='block px-4 py-3 w-full text-left hover: bg-gray-200 border-2 rounded mb-2' onClick={() => setLanguage("fr")}> Français</button>
                                <button className='block px-4 py-3 w-full text-left hover: bg-gray-200 border-2 rounded' onClick={() => setLanguage("en")}>Anglais</button>
                            </div>
                        )}
                    </div>
                </div>
                <div className='grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5'>
                    {filtredProducts.map((product) => (
                        <BookCard key={product.id} id={product.id} title={product.title} image={product.thumbnail} price={product.price} />
                    ))}
                </div>
                <div className='flex flex-col sm:flex-row justify-between items-center mt-5'>
                    <button className='border px-4 py-2 mx-2 rounded-full ' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}> Previous</button>
                    <div className="flex flex-wrap justify-center">{getPaginationButtons().map(page =>
                        <button key={page} onClick={() => handlePageChange(page)} className={`border px-4 py-2 mx-1 rounded-full ${page === currentPage ? 'bg-black text-white' : ""} `}>{page} </button>)}</div>
                    <button className='border px-4 py-2 mx-2 rounded-full ' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}> Next</button>
                </div>
            </div>
        </section>
    )
}

export default MainContent