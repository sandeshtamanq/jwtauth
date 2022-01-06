import React,{useState, useEffect} from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
    const [quote, setQuote] = useState('');
    const [tempQuote, setTempQuote] = useState('');
    const navigate = useNavigate();
    const populateQuote =async () => {
        try{

            const res = await fetch('http://localhost:3001/api/quotes',{
                headers:{
                    'x-access-token':localStorage.getItem('token'),
                },
            })
            const data =await res.json();
            setQuote(data.quote)
        }catch(err){
            console.log(err)
        }

    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            const user = jwt.decode(token);
            if(!user){
                localStorage.removeItem()
                navigate('/login')
            }else{
                populateQuote();
            }
        }
    },[])
    const updateQuote =async (e) => {
        e.preventDefault();
        const response =await fetch('http://localhost:3001/api/quotes',{
            method:"POST",
            headers:{
                'content-type':"application/json",
                'x-access-token':localStorage.getItem('token')
            },
            body: JSON.stringify({
                quote:tempQuote
            })
        })
        const data = await response.json()
        if(data.status == 'Ok'){
            setQuote(tempQuote);
            setTempQuote('')
        }else{
            alert(data.error)
        }
    }
    return (
        <div>
            <h1>Hello {quote || 'no quote found'}</h1>
            <form action="" onSubmit={updateQuote}>
                <input type="text" value={tempQuote} onChange={(e) => setTempQuote(e.target.value)} />
                <input type="submit" value="Submit quote"/>
            </form>
        </div>
    )
}

export default Dashboard
