import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList(){
    const[product, setProduct] = useState([])

    useEffect(()=>{
      getProducts()
    },[])

    const getProducts = async ()=>{
      let result = await fetch('http://localhost:5000/products',{
          headers:{
              authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
      })
      result = await result.json()
      setProduct(result);   
    }

    const deleteproduct = async(id)=>{
        let data = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'Delete',
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        data = await data.json()
        if(data){
            alert("Product is Deleted");
            getProducts()
        }
    }
    const handleSearch = async(e)=>{
        let key = e.target.value
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json()
            if(result){
                setProduct(result)
            }
        }else{
            getProducts()
        }
        
    }
    return (
        <div className="container-fluid sty">
            <h1>Products List</h1>
            <input type="text" placeholder="SearchProduct" onChange={handleSearch} className="form-control mb-3 w-50 mt-5" />
            <ul className="bld">
               <li>Sr.No</li>
               <li>Title</li>
               <li>Price</li>
               <li>Category</li>
               <li>Company</li>
               <li>Remove</li>
            </ul>
            {
                product.length>0 ? product.map((item, index) =>
                    <ul key={index} className="effect">
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button className="btn btn-warning btn-sm" onClick={()=>deleteproduct(item._id)}>Delete</button>
                            <Link to={"/update/"+item._id}>Edit</Link>
                        </li>
                    </ul>
                ):
                <h2>No Record Found</h2>
            }
        </div>
    )
}
