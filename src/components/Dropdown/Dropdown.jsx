import React,{ useState} from 'react'
import { categoryDropdown } from '../../assets/assets'
import { Link } from 'react-router-dom'
import "./Dropdown.css"

const Dropdown = () => {
    const [dropdown , setDropdown]= useState(false)
  return (
    <div>
        <ul className={dropdown ? "sub-category clicked":"sub-category"} onClick={()=>setDropdown(!dropdown)}>
            {
                categoryDropdown.map(item=>{
                    return(
                        <li key={item.id}>
                            <Link to={item.path} className={item.cName} onClick={()=>setDropdown(false)}>{item.title}</Link>

                        </li>
                    )
                })
            }

        </ul>
      
    </div>
  )
}

export default Dropdown
