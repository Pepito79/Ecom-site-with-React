import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    images: string[]
}
const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    useEffect(() => {
        if (id) {
            axios.get<Product>(`https://dummyjson.com/products/${id}`).then(response => {
                setProduct(response.data)
            }).catch(() => {
                console.error("Error in fetching data ")
            })
        }
    }, [id])

    if (!product) {
        return <h1>Loading ...</h1>
    }
    return (
        <div className='p-5 w-[60%]'>
            <button onClick={() => navigate(-1)} className='bg-black text-white p-2 mx-4 px-5 border rounded-[8px]'> Back</button>
            <img src={product.images[0]} alt={product.title} className='w-[50%] h-auto mb-5' />
            <h1 className='text-2xl mb-4 font-bold'>{product.title}</h1>
            <p className='mb-5 w-[70%]'>{product.description} </p>
            <div className='flex '>
                <p>Price: ${product.price}</p>
                <p className='ml-40'>Rating : {product.rating}</p>
            </div>
        </div>
    )
}

export default ProductPage