import { useEffect, useState } from "react"
import { useFilter } from "./FilterContext";


interface Product {
    category: string,
}

interface FetchResponse {
    products: Product[]
}

const Sidebar = () => {
    const { searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyWord } = useFilter();

    const handleReset = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setKeyWord("");
    }
    const handleKeywordClick = (keyword: string) => {
        setKeyWord(keyword);
    }
    const handleMinPriceChange = (e) => {
        const value = e.target.value;
        setMinPrice(value ? parseFloat(value) : undefined)
    }

    const handleMaxPriceChange = (e) => {
        const value = e.target.value;
        setMaxPrice(value ? parseFloat(value) : undefined)
    }

    const handleChangeCategory = (category: string) => {
        setSelectedCategory(category);
    }
    const [categories, setCategories] = useState<string[]>([]);
    const [keywords] = useState<string[]>([
        "apple",
        "watch",
        "Fasion",
        "trend",
        "shoes",
        "shirt",
    ])

    useEffect(
        () => {
            const fetchCategories = async () => {
                try {
                    const response = await fetch('https://dummyjson.com/products')
                    const data: FetchResponse = await response.json()
                    const uniqueCategories = Array.from(new Set(data.products.map(product => product.category)))
                    setCategories(uniqueCategories)
                } catch (error) {
                    console.error('Error fetching product', error)

                }
            };
            fetchCategories()
        }, [])

    return (
        <div className="w-64 p-5 h-screen">
            <h1 className="text-2xl font-bold mb-10 mt-4">TheBuilder212 Store</h1>
            <section>
                <input type="text" className="border-2 rounded px-2  sm:mb-0" placeholder="Search product" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                <div className="flex justify-center items-center">
                    <input type="text" className="border-2 rounded mr-2 px-5 py-3 mb-3 w-full mt-3  " placeholder="Min" value={minPrice ?? ''} onChange={handleMinPriceChange} />
                    <input type="text" className="border-2 rounded mr-2 px-5 py-3 mb-3 w-full mt-3 " placeholder="Max" value={maxPrice ?? ''} onChange={handleMaxPriceChange} />
                </div>
                <div className="mb-5">
                    <h2 className="text-2xl font-semibold mb-3 ">Categories</h2>
                </div>
                <section>
                    {categories.map((cat, id) =>
                        <label key={id} className="block mb-2">
                            <input type="radio" key={id} name="category" value={cat} onChange={() => handleChangeCategory(cat)} checked={selectedCategory === cat} className="mr-2 w-[16px] h-[16px]" />
                            {cat.toUpperCase()}
                        </label>
                    )}
                </section>
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-4">Keywords</h2>
                </div>
                <div>
                    {keywords.map((kword, index) =>
                        <button key={index} className="block mb-2 px-4 py-2 w-full border rounded text-left hover:bg-gray-200" onClick={() => handleKeywordClick(kword)}> {kword}</button>)}
                </div>
                <button className="border mb-[4rem] w-full py-2 bg-black text-white rounded mt-5 font-semibold hover: cursor-pointer" onClick={handleReset}> Reset filters</button>
            </section>
        </div >
    )
}

export default Sidebar 