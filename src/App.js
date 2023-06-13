import React, { useEffect, useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
const App = () => {
    const [data,updatedata]=useState([])
    const [info,updateinfo]=useState({name:'',price:'',cat:'',cmp:''})
    useEffect(()=>{
        async function show()
        {
            let res=await axios.get("https://ppvj.pythonanywhere.com/product/")
            updatedata(res.data)
        }
        show()
    },[data])

    const change=(e)=>{
        updateinfo({...info,[e.target.name]:e.target.value})
    }

  return (
    <>
    <div className='container-fluid'>
        <h1 align="center" style={{fontWeight:"700",color:'red'}}>CRUD APPLICATION</h1> 
        <div><input type="number" name='id' value={info.id} onChange={change} /> <button className='btn btn-warning'
        onClick={()=>{
            async function search()
            {
           try {
            let search=await axios.get(`https://ppvj.pythonanywhere.com/product/${info.id}/`)
            updateinfo(search.data)
            }catch(error)
            {
                console.log(error)
            }
        }
            search()
        }}
        >SEARCH</button></div>
        <h2>{info.name}</h2>
        <h2>{info.price}</h2>
        <h2>{info.cmp}</h2>
        <br/>
        <br/>
        <table className='table table-bordered bg-info'>
            <thead className='table table-bordered bg-dark text-white text-center'>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>COMAPNY</th>
                    <th colSpan={2}>OPTIONS</th>
                </tr>
            </thead>
            <tbody className='table bg-info table-hover text-center'>
            {data.map((v,i)=>{
               return(<tr key={i}>
                   <td>{v.id}</td>
                   <td>{v.name}</td>
                   <td>{v.price}</td>
                   <td>{v.cat}</td>
                   <td>{v.cmp}</td>
                  <td> <button className='btn bg-danger text-white' 
                   onClick={()=>{
                async function del()
                {
               let del=await axios.delete(`https://ppvj.pythonanywhere.com/product/${v.id}/`)
               if(del.status===204)
               {
                alert("product deleted")
               }
                }
                del()
                   }}
                   >DELETE</button></td>
                   <td><button className='btn bg-success text-white' onClick={()=>{
                    updateinfo(v)
                   }}>UPDATE</button></td>
                </tr>
               )
            })}
            </tbody>
        </table> 
        <h1 align="center" style={{fontWeight:"700"}}>ADD AND UPDATE</h1>
        <form onSubmit={(e)=>{
            e.preventDefault()
            if(info.id==='')
            {
                async function add()
                {
               let add=await axios.post(`https://ppvj.pythonanywhere.com/product/`,info)
               if(add.status===201)
               {
                alert("product added")
                updateinfo({name:'',price:'',cat:'',cmp:''})
               }
                }
                add()
            }
           else{
            async function update()
            {
             let update=await axios.put(`https://ppvj.pythonanywhere.com/product/${info.id}/`,info)
             if(update.status===200)
             {
                alert("product updated")
                updateinfo({name:'',price:'',cat:'',cmp:''})
             }
            }
            update()
           }
        }}>
            NAME:-
            <input type="text" name="name" onChange={change} value={info.name} className='form-control' />
            PRICE:-
            <input type="number" name="price" onChange={change} value={info.price} className='form-control' />
            CATEGORY:-
            <input type="text" name="cat" onChange={change} value={info.cat} className='form-control' />
            COMPANY:-
            <input type="text" name="cmp" onChange={change} value={info.cmp} className='form-control' />
            <br/>
            <button type='submit' className='btn btn-warning form-control'>ADD PRODUCT</button>
            <br/>
        </form><br/>
        <h6 align="center">BASIC CRUD APPLICATION</h6>
    </div>
    </>
  )
}

export default App