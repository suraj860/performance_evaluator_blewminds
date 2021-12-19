
import React from "react"
import axios from "axios"
import { AppContext } from "./context"

function AddFaculty(){
    const[userName , setUserName] = React.useState("")
    const[password , setPassword] = React.useState("")
    const[email , setEmail] = React.useState("")
    const[lastName , setLastName] = React.useState("")
    const[number , setNumber] = React.useState("")
    const{api , setBlock , setFacultyList} = React.useContext(AppContext)

    const token = window.localStorage.getItem("token")
    const instance = axios.create({
        baseURL: api , 
        headers:{
            "auth-token" : token
        },
    })

   
    
    async function getFacultyList(){
        try{
            const response = await instance.get(api + "/faculty")
            setFacultyList(response.data)
           
        }catch(error){
            console.log(error)
        }
    }

    async function insertFaculty(){
        try{
            await instance.post(api + "/newFaculty",{
                userName:userName,
                password : password,
                email: email,
                last:lastName,
                number:number
            })
          
            getFacultyList()
            setBlock(false)
           
        }catch(error){
            console.log(error)
        }
    }



    function handleChange(event){
        switch (event.target.name) {
            case "userName":
                setUserName(event.target.value)
                break;
            case "password":
                setPassword(event.target.value)
                break;
            case "email":
                setEmail(event.target.value)
                 break;
            case "lastName":
                setLastName(event.target.value)
                 break;
            case "number":
                setNumber(event.target.value)
                break;
            default:
                break;
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        insertFaculty()
    }

    return(
        <>
        <div className="blockParent">
            <div className="blockChild">
                <form onSubmit={handleSubmit}>
                    <input type="text" className="form-control" name="userName" value={userName} required
                     onChange={handleChange} placeholder="enter name"/><br/>

                    <input type="email" className="form-control"required  name="email" value={email} 
                    onChange={handleChange} placeholder="enter email"/><br/>

                    <input type="text"  className="form-control" name="password" required value={password} 
                    onChange={handleChange} placeholder="create password to faculty "/><br/>

                    <input type="text" className="form-control" name="lastName" required  value={lastName} 
                    onChange={handleChange} placeholder="lastname"/><br/>

                    <input type="text" className="form-control" name="number" value={number} 
                    onChange={handleChange} required  placeholder="number"/><br/>

                    <button className="btn btn-success btt1" type="submit">Create</button>
                    <button className="btn btn-danger" onClick={()=>{setBlock(false)}}>Cancel</button>

                </form>
            </div>
        </div>
        </>
    )
}

export default AddFaculty;