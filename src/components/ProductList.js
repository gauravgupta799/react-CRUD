import React,{useState, useEffect} from 'react'

const url = "http://localhost:3004/products";

function ProductList(props){
  const [products , setProducts] = useState([]);

  const fetchProducts = () =>{
    fetch(url)
    .then((response) => {
      if(!response.ok){
        throw new Error("Unexpected Server Response")
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      setProducts(data);
    })
    .catch((error) => console.log(error.message));
  }

  useEffect(() => fetchProducts(),[]);

  const deleteProduct =(id)=>{
    fetch(`${url}/${id}`, {
      method:"DELETE"
    })
    .then((response) => response.json())
    .then((data) => fetchProducts())
  }

  return(
    <div className="producList-container">
      <h2 className="text-center mb-3">List Of Products</h2>
      <button type="button" 
      className="btn btn-primary me-2"
        onClick = {()=> props.showForm({})} 
      >
        Create
      </button>
      <button type="button" 
      className="btn btn-outline-primary btn-sm me-2"
      onClick={()=> fetchProducts()}                 
      >
        Refresh
      </button>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {
          products.map((product, i) => {
            const {id, name, brand, category, price,createdAt } = product;
            return (
              <tr key={i}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{brand}</td>
                  <td>{category}</td>
                  <td>${price}</td>
                  <td>{createdAt}</td>
                  <td style={{width:"10px", whiteSpace: "nowrap"}}>
                      <button type="button" className="btn btn-primary btn-sm me-2"
                        onClick={()=> props.showForm(product)}
                      >
                        Edit
                      </button>
                      <button type="button" className="btn btn-danger btn-sm me-2"
                      onClick={()=> deleteProduct(id)}
                      >
                        Delete
                      </button>
                  </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  )
}

export default ProductList
