import { useEffect, useState } from "react";

interface Phone {
    Id: number;
    Brand: string;
    Model: string;
    Price: number;
}

export default function Telefontörlés(){

    const [phones, setPhones] = useState<Phone[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorServer,setErrorServer] = useState("")
    const handledeletephone= async(phoneId:number)=>{
        let answer=confirm('biztosan akarod törölni' )
        if(answer){
            try{
                const response=await fetch('http://localhost:3000/phones/'+phoneId,{
                  method: 'DELETE'
                })
                if(!response.ok) {
                      setErrorServer("hiba történt a törlés közbe")
                }
                setPhones(phones.filter(phone=>phone.Id !== phoneId))
                
              }catch(err){
                  alert('error')
              }
        }
   
    }
    useEffect(() => {

        fetch('http://localhost:3000/phones')
            .then((response) => {
                if (response.status === 404) {
                    setErrorServer("Resource not found")
                   // throw new Error('Resource not found (404)');
                }
                if (!response.ok) {
                    setErrorServer("Server responded with status" + response.status)
                
                }
                return response.json();
            })
            .then((data) => {
                setPhones(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);
    if(errorServer){
        return <p>Hiba történt a szerver oldalon,keresd a rendszergazdát</p>
    }
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }


    return <>
        <div>
            <h2>Telefonok</h2>
            <a href="/telefonfelvetel">új telefon felvétel</a><br />
            <a href="/telefonok">telok</a><br />
            <ul>
                {phones.map((phone) => (
                    <li key={phone.Id}>
                        {phone.Brand} - {phone.Model} - {phone.Price} Ft
                        <span
                            style={{marginLeft:'10xp',cursor:'pointer'}}
                            onClick={()=> handledeletephone(phone.Id)}
                            
                        >törlés</span>
                    </li>
                ))}
            </ul>
        </div>
    </>
}