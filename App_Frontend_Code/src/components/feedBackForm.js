
import React from "react";
import axios from "axios";
import { AppContext } from "./context"
function FeedBackForm(props){

    const[firstName , setFirstName] = React.useState("")
    const[middleName , setMiddleName] = React.useState("")
    const[LastName , setLastName] = React.useState("")
    const[email , setEmail] = React.useState("")
    const[height , setHeight] = React.useState("")
    const[religion , setReligion] = React.useState("")
    const[caste , setCaste] = React.useState("")
    const[weight , setWeight] = React.useState("")
    const[mark , setMark] = React.useState("")
    const[feed , setFeed] = React.useState("")


    const{api , setForm , setUserGotData  , setTrail} = React.useContext(AppContext)

    const token = window.localStorage.getItem("token")
    // const userD = jwt.decode(token)
    let paramss = props
    const instance = axios.create({
        baseURL: api , 
        headers:{
            "auth-token" : token
        },
    })

    async function postData(value){
        try{
            const response = await instance.post(api + "/postFormData",{
                email: value.email,
                firstName: firstName,
                middleName : middleName,
                LastName:LastName,
                height: height,
                religion: religion,
                caste: caste,
                weight : weight,
                mark : mark,
                feed:feed
            })
            setTrail(true)
            setForm(false)
            setUserGotData(response.data)  
        }catch(error){

        }
    }

    function handleChange(event){
        switch (event.target.name) {
            case "firstName":
                setFirstName(event.target.value)
                break;
            case "middleName":
                setMiddleName(event.target.value)
                break;
            case "LastName":
                setLastName(event.target.value)
                break;
             case "email":
                setEmail(event.target.value)
                break;
            case "height":
                setHeight(event.target.value)    
                break;
            case "religion":
                setReligion(event.target.value)    
                break;
            case "caste":
                setCaste(event.target.value)
                break;
            case "weight":
                setWeight(event.target.value)      
                break;
            case "mark":
                setMark(event.target.value)      
                break;
            case "feed":
                setFeed(event.target.value)      
                break;
            default:
                break;
        }
    }

    function submit(event){
        event.preventDefault()
        postData(paramss)
        
    }

    return(
        <>
        <div className="feedbackFormDiv">
            <form className="feedbackForm feedback2" onSubmit={submit}>
                <div>
                    <h5>Feedback Form</h5>
                </div>
                <input type="text" className="form-control" name="firstName" value={firstName} onChange={handleChange} placeholder="enter first name"/><br/>
                <input type="text" name="middleName"className="form-control"  value={middleName} onChange={handleChange} placeholder="enter middleName"/><br/>
                <input type="text" name="LastName" className="form-control" value={LastName} onChange={handleChange} placeholder="enter lastName"/><br/>
                <input type="email" name="email"  className="form-control" value={email} onChange={handleChange} placeholder="enter email"/><br/>
                
                <input type="number"className="form-control"  name="height" value={height} onChange={handleChange} placeholder="enter height"/><br/>
                <input type="text" className="form-control" name="religion" value={religion} onChange={handleChange} placeholder="enter relegion"/><br/>
                <input type="text" className="form-control" name="caste" value={caste} onChange={handleChange} placeholder="enter caste"/><br/>
                <input type="number" className="form-control" name="weight" value={weight} onChange={handleChange} placeholder="enter weight"/><br/>
                <input type="text" className="form-control" name="mark" value={mark} onChange={handleChange} placeholder="enter any body mark"/><br/>
                <textarea  type="text" className="form-control" cols="30" rows="5" name="feed" value={feed} onChange={handleChange} placeholder="enter feedback to faculty"></textarea>
                <hr/>  
                <button className="btn btn-success btt1" type="submit">Submit</button>
                <button className="btn btn-danger" onClick={()=>{setForm(false)}}>Cancel</button>
            </form>
        </div>
        </>
    )
}

export default FeedBackForm