import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Updateproduct(){
    const[name, setName] = useState('');
    const[price, setPrice] = useState('');
    const[category, setCategory] = useState('');
    const[company, setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();
     
    useEffect(()=>{
       getProduct()
    },[])

    const getProduct = async ()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company)
    }
    const UpdateProduct = async()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'put',
            body:JSON.stringify({name, price, category, company}),
            headers:{
                'Content-Type':'application/json',
                 authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        })
        result = await result.json()
        navigate('/')
    }

    return(
        <div className='container'>
            <h2 className='mt-3'>UPDATE DETAILS</h2>
          <dl className='m-3'>
              <dt>Product Name<sup style={{color:'red'}}>*</sup></dt>
              <dd>
                  <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='Enter Product' className='form-control w-50' />
              </dd>
                  
              <dt>Product Price<sup style={{color:'red'}}>*</sup></dt>
              <dd>
                  <input value={price} onChange={(e)=>setPrice(e.target.value)} type="text" placeholder='Enter Price' className='form-control w-50' />
              </dd>
              
              <dt>Category<sup style={{color:'red'}}>*</sup></dt>
              <dd>
                  <input value={category} onChange={(e)=>setCategory(e.target.value)} type="text" placeholder='Enter Category' className='form-control w-50'  />
              </dd>
             
              <dt>Company<sup style={{color:'red'}}>*</sup></dt>
              <dd>
                  <input value={company} onChange={(e)=>setCompany(e.target.value)} type="text" placeholder='Enter Company' className='form-control w-50' />
              </dd>
               <dd>
                  <button onClick={UpdateProduct} className='btn btn-outline-success mt-3'>Updata Product</button>
              </dd>
          </dl>
        </div>
    )
}
