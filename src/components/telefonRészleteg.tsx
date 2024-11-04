import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Phone {
    id: number;
    brand: string;
    model: string;
    price: number;
}

export default function TelefonRészletek(){

    const [phones, setPhones] = useState<Phone>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorServer,setErrorServer] = useState("")
    const{telefonId}=useParams <{telefonId:string}>()
    useEffect(() => {

        fetch(`http://localhost:3000/phones/${telefonId}`)
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
            <a href="/telefontörlés">telefon törlése</a><br />
            <p>{phones?.brand},{phones?.model},{phones?.price}</p>
        </div>
    </>
}