import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Addproduct(){
    const[name, setName] = useState('');
    const[price, setPrice] = useState('');
    const[category, setCategory] = useState('');
    const[company, setCompany] = useState('');
    const[error, setError] = useState(false);
    const navigate = useNavigate()
     
    const handleProduct = async()=>{
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
        let userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:5000/add-product', {
            method:'post',
            body: JSON.stringify({name, price, category, company, userId}),
            headers:{
                'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        alert("Product has been added to list")
        navigate('/')
    }

    return(
        <div className='container'>
            <h2 className='mt-3'>PRODUCT DETAILS</h2>
          <dl className='m-3'>
              <dt>Product Name<sup style={{color:'red'}}>*</sup></dt>
              <dd>
                  <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='Enter Product' className='form-control w-50' />
              </dd>
                  {error && !name && <span className='TextColor'>Please Enter Name</span>}
              <dt>Product Price<sup style={{color:'red'}}>*</sup></dt>
              <dd>
                  <input value={price} onChange={(e)=>setPrice(e.target.value)} type="text" placeholder='Enter Price' className='form-control w-50' />
              </dd>
              {error && !price && <span className='TextColor'>Please Enter Price</span>}
              <dt>Category<sup style={{color:'red'}}>*</sup></dt>
              <dd>
                  <input value={category} onChange={(e)=>setCategory(e.target.value)} type="text" placeholder='Enter Category' className='form-control w-50'  />
              </dd>
              {error && !category && <span className='TextColor'>Please Enter Category</span>}
              <dt>Company<sup style={{color:'red'}}>*</sup></dt>
              <dd>
                  <input value={company} onChange={(e)=>setCompany(e.target.value)} type="text" placeholder='Enter Company' className='form-control w-50' />
              </dd>
              {error && !company && <span className='TextColor'>Please Enter Company</span>}
              <dd>
                  <button onClick={handleProduct} className='btn btn-outline-primary mt-3'>Add Product</button>
              </dd>
          </dl>
        </div>
    )
}
