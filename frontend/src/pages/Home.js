import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import MainNavbar from '../components/MainNavbar';
import Carousel from '../components/Carousel'; 
import Cards from '../components/Cards';
import ProductSection from "../components/ProductSection";
import CardCarousel from '../components/CardCarousel';
import CardCarousel1 from '../components/CardCarousel1';
import CardCarousel2 from '../components/CardCarousel2';
import CardCarousel3 from '../components/CardCarousel3';
import CardCarousel4 from '../components/CardCarousel4';
import CardCarousel5 from '../components/CardCarousel5';
import CardCarousel6 from '../components/CardCarousel6';
import Footer1 from '../pages/Footer1';
import Footer2 from '../pages/Footer2'






function Home() {
  const [users, setUsers] = useState([]); 
  const [message, setMessage] = useState(''); 
  const [product, setProduct] = useState([]);   // <<-- must be []
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  


console.log(product,'productproductproduct')
useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get('http://3.7.145.181:4500/auth/product');
        
        setProduct(res?.data);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Failed to fetch products');
      }
    }
    fetchProduct();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get('http://3.7.145.181:4500/auth/user');
        setUsers(res.data.users);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Failed to fetch users');
      }
    }
    fetchUsers();
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    filterProducts(query, selectedBrand, selectedCategory);   // pass ALL
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    filterProducts(searchQuery, brand, selectedCategory);    // pass ALL
  };

  const handleCategorySelect = (category) => {

    setSelectedCategory(category);
    filterProducts(searchQuery, selectedBrand, category);    // pass ALL
  };

  const filterProducts = (query, brand, category) => {
            console.log(query,"queryquery",brand,"brandbrand",category,"categorycategory")

    const filtered = product?.filter((product) => {
      const matchesSearch =
        product?.name?.toLowerCase()?.includes(query.toLowerCase()) ||
        product.category.toLowerCase()?.includes(query.toLowerCase()) ||
        product?.brand?.toLowerCase()?.includes(query.toLowerCase());

      const matchesBrand = brand ? product?.brand?.toLowerCase() === brand?.toLowerCase() : true;
      const matchesCategory = category ? product?.category?.toLowerCase() === category?.toLowerCase() : true;
     
      return matchesSearch && matchesBrand && matchesCategory;
    });
    setFilteredProducts(filtered);
    console.log(filtered,"www")
  };
  console.log(filteredProducts,"qqqqq")
  useEffect(() => {
    setFilteredProducts(product);
  }, [product]);

  return (
    <div>
      <div className="container-fluid p-0" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 999 }}>
      <MainNavbar  
        onSearchChange={handleSearchChange} 
        searchQuery={searchQuery} 
        onBrandSelect={handleBrandSelect} 
        selectedBrand={selectedBrand} 
        onCategorySelect={handleCategorySelect}
      />
      </div>
      <div style={{marginTop:"120px"}}>
      {(searchQuery.trim() === '' && selectedBrand.trim() === '' && selectedCategory.trim() === '') && <Carousel />}
      {(searchQuery.trim() === '' && selectedBrand.trim() === '' && selectedCategory.trim() === '') && <Cards         onBrandSelect={handleBrandSelect}         onCategorySelect={handleCategorySelect}

/>}
      {(searchQuery.trim() === '' && selectedBrand.trim() === '' && selectedCategory.trim() === '') && < CardCarousel/>}
      {(searchQuery.trim() === '' && selectedBrand.trim() === '' && selectedCategory.trim() === '') && < CardCarousel1/>}
      {(searchQuery.trim() === '' && selectedBrand.trim() === '' && selectedCategory.trim() === '') && < CardCarousel2/>}
    {(searchQuery.trim() === '' && selectedBrand.trim() === '' && selectedCategory.trim() === '') && < CardCarousel3/>}
      {(searchQuery.trim() === '' && selectedBrand.trim() === '' && selectedCategory.trim() === '') && < CardCarousel4/>}
      {(searchQuery.trim() === '' && selectedBrand.trim() === '' && selectedCategory.trim() === '') && < CardCarousel5/>}
     {(searchQuery.trim() === '' && selectedBrand.trim() === '' && selectedCategory.trim() === '') && < CardCarousel6/>}
     {(searchQuery.trim() === '' && selectedBrand.trim() === '' && selectedCategory.trim() === '') && < Footer1/>}
     {(searchQuery.trim() === '' && selectedBrand.trim() === '' && selectedCategory.trim() === '') && < Footer2/>}
    {(searchQuery.trim() !== '' || selectedBrand.trim() !== '' ||selectedCategory.trim() !== '') &&  <ProductSection Product={filteredProducts}/>}
{/* <ProductSection Product={filteredProducts}/> */}
     
   </div>
  
    </div>
  );
}

export default Home;



// let getproducts = () => {
//   fetch('https://fakestoreapi.com/products')
//   .then(response => response.json())
//   .then(data => setProducts(data))
//  }

//  useEffect(getproducts,[])


// useEffect(() => {
//   async function fetchUsers() {
//     try {
//       const res = await axios.get('http://localhost:4500/auth/user');
//       setUsers(res.data.users);
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Failed to fetch users');
//     }
//   }
//   fetchUsers();
// }, []); 













// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import MainNavbar from '../components/MainNavbar';
// import Carousel from '../components/Carousel';
// import Cards from '../components/Cards';
// import CardCarousel from '../components/CardCarousel';
// import CardCarousel1 from '../components/CardCarousel1';
// import CardCarousel2 from '../components/CardCarousel2';
// import ProductSection from "../components/ProductSection";
// import AdminProductList from '../components/AdminProductList';
// import AdminCartView from '../components/AdminCartView';

// function Home() {
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedBrand, setSelectedBrand] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');

//   // ✅ Fetch products
//   const getProducts = () => {
//     fetch('https://fakestoreapi.com/products')
//       .then(response => response.json())
//       .then(data => {
//         console.log("Fetched products:", data);
//         setProducts(data);
//       })
//       .catch(err => console.error("Error fetching products:", err));
//   };

//   useEffect(() => {
//     getProducts();
//   }, []);

//   // ✅ Filter products
//   const filterProducts = (query, brand, category) => {
//     const filtered = products.filter((product) => {
//       const matchesSearch =
//         product.title.toLowerCase().includes(query.toLowerCase()) ||
//         product.category.toLowerCase().includes(query.toLowerCase());

//       const matchesBrand = brand ? product.category.toLowerCase() === brand.toLowerCase() : true;
//       const matchesCategory = category ? product.category.toLowerCase() === category.toLowerCase() : true;

//       return matchesSearch && matchesBrand && matchesCategory;
//     });

//     setFilteredProducts(filtered);
//   };

//   const handleSearchChange = (query) => {
//     setSearchQuery(query);
//     filterProducts(query, selectedBrand, selectedCategory);
//   };

//   const handleBrandSelect = (brand) => {
//     setSelectedBrand(brand);
//     filterProducts(searchQuery, brand, selectedCategory);
//   };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     filterProducts(searchQuery, selectedBrand, category);
//   };

//   useEffect(() => {
//     setFilteredProducts(products);
//   }, [products]);

//   const showCarousels = !searchQuery && !selectedBrand && !selectedCategory;

//   return (
//     <div>
//       <MainNavbar  
//         onSearchChange={handleSearchChange} 
//         searchQuery={searchQuery} 
//         onBrandSelect={handleBrandSelect} 
//         selectedBrand={selectedBrand} 
//         onCategorySelect={handleCategorySelect} 
//       />

//       {showCarousels && <Carousel />}
//       {showCarousels && <Cards />}
//       {showCarousels && <CardCarousel />}
//       {showCarousels && <CardCarousel1 />}
//       {showCarousels && <CardCarousel2 />}
//       <AdminProductList />
//       <hr />
//       <AdminCartView />

//       <ProductSection products={filteredProducts} />
//     </div>
//   );
// }

// export default Home;

