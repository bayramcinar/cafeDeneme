import React, { useState,useEffect  } from 'react';
import Navbar from './navbar';
import Product from './product';
import "../style/liste.css";
import ProductModal from './productModal';
import BottomBar from './bottomNavigation';
import axios from 'axios';
import BestsCoursel from './bestsCoursel';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Liste({categoryID}) {
    const [modalShow, setModalShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [slideProducts, setSlideProducts] = useState([]);
    const productsPerPage = 2;
    const totalRows = Math.ceil(products.length / productsPerPage);
    const [title,setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true);

        const fetchData = async () => {
            try {
                const productsResponse = await axios.get(`https://serverdeneme-p4tc.onrender.com/getProducts/${categoryID}`);
                const categoryResponse = await axios.get(`https://serverdeneme-p4tc.onrender.com/getCategoryName/${categoryID}`);
                const imagesResponse = await axios.get(`https://serverdeneme-p4tc.onrender.com/getProductsImg/${categoryID}`);

                const fetchedProducts = productsResponse.data;
                const fetchedTitle = categoryResponse.data[0].kategoriName;
                const fetchedSlideProducts = imagesResponse.data.filter(product => product.image !== null);

                const fetchImagePromises = fetchedProducts.map(product => findImg(product.id));
                const imageResults = await Promise.all(fetchImagePromises);
                const updatedProducts = fetchedProducts.map((product, index) => ({
                    ...product,
                    image: imageResults[index]
                }));

                setProducts(updatedProducts);
                setTitle(fetchedTitle);
                setSlideProducts(fetchedSlideProducts);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false); // Set isLoading to false after 1.5 seconds
                }, 1500);
            }
        };

        fetchData();
    }, [categoryID]);
    


    const handleProductClick = async (productInfo) => {
        const productStock = await findStock(productInfo.id);
        if (productStock > 0) {
            setSelectedProduct(productInfo);
            setModalShow(true);
        }
    }

    const findStock = async (id) => {
        try {
            const response = await axios.get(`https://serverdeneme-p4tc.onrender.com/getStock/${id}`);
            if (response.data && response.data.length > 0) {
                return response.data[0].stok;
            } else {
                return "0";
            }
        } catch (err) {
            console.log("API Error:", err.message);
            return "";
        }
    }

    const findImg = async (id) => {
        try {
            const response = await axios.get(`https://serverdeneme-p4tc.onrender.com/getImage/${id}`);
            if (response.data && response.data.length > 0) {
                return response.data[0].image;
            } else if (response.data[0].Message === "Image not found.") {
                return "resim yok";
            }
        } catch (err) {
            console.log(err);
            return "resim yüklenirken hata oluştu"; 
        }
    };
    
    const [tenSec, setTenSec] = useState(true);


    const handleScrollToTop = () => {
        const generalList = document.querySelector('.generalList');
        if (generalList) {
            generalList.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    

    return (
        <div>
            <Navbar />
            <div className='generalList'>
                <div className='productListTitle'>
                    <h3 className='ListTitle'>{title}</h3>
                </div>
                <BestsCoursel images={slideProducts} isLoading={isLoading}/>
                {Array.from({ length: totalRows }, (_, rowIndex) => (
                    <div className='list row' key={rowIndex}>
                    {products.slice(rowIndex * productsPerPage, (rowIndex + 1) * productsPerPage).map((product, index) => (
                        <div className={`col-6 colItems ${index % 2 === 0 ? 'leftProduct' : 'rightProduct'}`} key={index}>
                            <Product
                                productID={product.id}
                                productImage={product.image === "resim yok" ? null : product.image}
                                productTitle={product.isim}
                                productPrice={product.fiyat}
                                productStok={() => findStock(product.id)}
                                onClick={() => handleProductClick(product)}
                                isLoading={isLoading}
                                position={index+1 % 2 === 0 ? 'right' : 'left'}
                            />
                        </div>
                    ))}
                    </div>
                ))}
                <div className='up' onClick={handleScrollToTop}>
                    <KeyboardArrowUpIcon fontSize='large' className='upButton'/>
                </div>
            </div>
            
            <ProductModal
                product={selectedProduct}
                show={modalShow}
                handleClose={() => setModalShow(false)}
            />


            <BottomBar/>
        </div>
    );
}

export default Liste;
