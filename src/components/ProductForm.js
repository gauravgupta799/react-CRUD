import React,{useState} from 'react'
import "./productForm.css";

const url = "http://localhost:3004/products";

function ProductForm(props){
  // console.log(props)
  const [errorMsg, setErrorMsg] = useState("");
  
  const handleSubmit =(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product  = Object.fromEntries(formData.entries());
    const {name, brand, category, price} = product;
    if(!name || !brand || !category || !price){
      setErrorMsg("Please fill all the fields!")
      return;
    }
    if(props.product.id){
      // update the product
      fetch(`${url}/${props.product.id}`, {
        method: "PATCH",
        headers:{
          "content-type": "application/json"
        },
        body: JSON.stringify(product)
      })
      .then((response) => {
        if(!response.ok){
          throw new Error("Network response was not Ok");
        }
        return response.json();
      })
      .then((data) => props.showList())
      .catch((error) => console.log("Error", error))

    }else{
      // create a new product 
      product.createdAt = new Date().toISOString().slice(0, 10);
      fetch(url, {
        method: "POST",
        headers:{
          "content-type": "application/json"
        },
        body: JSON.stringify(product)
      })
      .then((response) => {
        if(!response.ok){
          throw new Error("Network response was not Ok");
        }
        return response.json();
      })
      .then((data) => props.showList())
      .catch((error) => console.log("Error", error))
    }
  }
  return(
    <div className="productForm__container">
      <div className="productForm">
        <h2 className="text-center mb-3">
        { props.product.id ? "Edit" : "Create New "} Product
        </h2>
        <button className="btn btn-danger rounded btn-sm me-2 close-btn" 
        onClick = {()=> props.showList()} >
          X
        </button>
        <div className="row">
          <div className="col-lg-6 mx-auto">
            { errorMsg && 
              <div class="alert alert-warning alert-dismissible fade show" role="alert">
                  {errorMsg}
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }
            <form onSubmit={handleSubmit}>
            { props.product.id &&
              <div className="row mb-3">
                <label htmlFor="id" className="col-sm-4 col-form-label">
                  Id
                </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control-plaintext"
                    name='id'
                    readOnly
                    defaultValue={props.product.id}
                    />
                </div>
              </div>
            }
              <div className="row mb-3">
                <label htmlFor="name" className="col-sm-4 col-form-label">
                  Name
                </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control"
                    name='name'
                    defaultValue={props.product.name}
                    />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="brand" className="col-sm-4 col-form-label">
                  Brand
                  </label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control"
                      name='brand'
                      defaultValue={props.product.brand}
                    />
                  </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="category" className="col-sm-4 col-form-label">
                  Category
                  </label>
                  <div className="col-sm-8">
                    <select className="form-select"
                      name='category'
                      defaultValue={props.product.category}
                    >
                    <option value="Other">Other</option>
                    <option value="Phones">Phones</option>
                    <option value="Computers">Computers</option>
                    <option value="Accessories">Accessories</option>
                    <option value="GPS">GPS</option>
                    <option value="Camers">Camers</option>
                    </select>
                  </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="price" className="col-sm-4 col-form-label">
                  Price
                  </label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control"
                      name='price'
                      defaultValue={props.product.price}
                    />
                  </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="description" className="col-sm-4 col-form-label">
                  Description
                  </label>
                  <div className="col-sm-8">
                    <textarea className="form-control"
                      name='description'
                      defaultValue={props.product.description}
                    />
                  </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 d-flex align-items-center justify-content-center">
                    <button type="submit"
                      className='btn btn-primary me-5'
                    >
                      Save
                    </button>
                    <button className="btn btn-secondary me-2" 
                      onClick = {()=> props.showList()} >
                        Cancel
                    </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductForm
