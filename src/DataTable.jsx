import React, { useEffect, useState ,useRef} from 'react'

const DataTable = () => {
    const [formData,setFormData] = useState({name:"",gender:"",age:""});
    const [data,setData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const outside = useRef(false);
    
    useEffect(()=>{
        if(!editMode) return;
        let selectedItem = document.querySelectorAll(`[id='${editMode}']`);
        selectedItem[0].focus();
    },[editMode]);

    useEffect(()=>{
        document.addEventListener('click',handleClickOutside);
        return ()=>{
            document.removeEventListener('click',handleClickOutside);
        }
    },[])

    const handleClickOutside = (e) =>{
     if(outside.current && !outside.current.contains(e.target)){
        setEditMode(false);
     }
    }

    const handleChange = (e) =>{
        setFormData(prev => ({...prev,[e.target.name]:e.target.value}));
    }
    const handleAdd = () =>{
        if(formData.name && formData.age && formData.gender){
            let newItem = {id:Date.now(),...formData};
            setData(prev => [...prev,newItem]);
            setFormData({name:'',gender:'',age:''});
        }
    };
    const handleDelete = (id)=>{
     setData(prev => prev.filter(item => item.id !== id));
    }
    const handleEdit = (e,id,updatedObj) =>{
        const newData = data.map((item) => {
            if(item.id === id){
                return {...item,...updatedObj};
            }
            else {
                return {...item};
            }
        });
        setData(newData);
    }
    console.log(data);
    
    

  return (
    <div className='container'>
        <div className="add-container">
            <div className="info-container">
                <input type='text' name='name' placeholder='Name' value={formData.name} onChange={handleChange}/>
                <input type='text' name='gender' placeholder='Gender' value={formData.gender} onChange={handleChange}/>
                <input type='text' name='age' placeholder='Age' value={formData.age} onChange={handleChange}/>
            </div>
            <button className='add' onClick={handleAdd}>ADD</button>
            
        </div>
        <div className="search-container">
            <input type="text" className='search-input' placeholder='Search' name='search' />
            <table ref={outside}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    data.map((item) => {
                        return(
                        <tr key={item.id}>
                        <td id={item.id} name='name' contentEditable={editMode === item.id} onBlur={(e)=>handleEdit(e,item.id,{name:e.target.innerText})}>{item.name}</td>
                        <td id={item.id} name='gender' contentEditable={editMode === item.id} onBlur={(e)=>handleEdit(e,item.id,{gender:e.target.innerText})}>{item.gender}</td>
                        <td id={item.id} name='age' contentEditable={editMode === item.id} onBlur={(e)=>handleEdit(e,item.id,{age:e.target.innerText})}>{item.age}</td>
                        <td id={item.id}>
                            <div className="actions">
                            <button className='edit' onClick={()=>setEditMode(item.id)}>Edit</button>
                            <button className='delete' onClick={()=>handleDelete(item.id)}>Delete</button>
                            </div>
                            
                        </td>
                    </tr>
                        )
                    })
                    
                    /* <tr>
                        <td>John</td>
                        <td>Male</td>
                        <td>25</td>
                        <td>
                            <div className="actions">
                            <button className='edit'>Edit</button>
                            <button className='delete'>Delete</button>
                            </div>
                            
                        </td>
                    </tr> */}
                </tbody>
            </table>
            <div className="pagination"></div>
                
        </div>

    </div>
  )
}

export default DataTable