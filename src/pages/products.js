import React,{useState} from 'react'
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

export default function Products(){
  const [content, setContent] = useState(true);
  const [productContent, setProductContent] = useState();

  const showList =() => {
    setContent(true)
  }

  const showForm = (product)=>{
    setProductContent(product);
    setContent(false);
  }

  return (
    <div className="container my-5">
     {content ?  
      <ProductList showForm={showForm} /> : 
      <ProductForm  product={productContent} showList={showList} />
     }
    </div>
  )
}
