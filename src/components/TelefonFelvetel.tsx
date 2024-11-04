import { useState } from "react";

export default function TelefonFelvetel() {
    const [brand, setBrand] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [price, setPrice] = useState<number>();
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const newPhone = {
            brand: brand,
            model: model,
            price: price
        }
        try {
            const response = await fetch('http://localhost:3000/phones', {
                method: 'POST',
                headers: {
                     'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPhone)
            })
            if (!response.ok){
                const errorData = await response.json();
                setError(errorData.error)
                throw new Error(`Hiba történt: ${response.status}`)
            }

            setSuccess(true);
            setBrand(''); setModel(''); setPrice('');
        } catch (err: any) {
            setError(err.message)
        } finally {

        }
    }
    return <>
        <h2>Telefon felvétel</h2>
        <a href="/telefonok">telefon lista</a><br />
        <a href="/telefontörlés">telefon törlése</a><br />
        <form onSubmit={handleSubmit}>
            <label>
                <p>Brand:</p>
                <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />
                {brand}
            </label>
            <label>
                <p>Brand:</p>
                <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                />
                {model}
            </label>
            <label>
                <p>Price:</p>
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(parseInt( e.target.value))}
                />
                {price}
            </label>
            <button type="submit">Telefon felvétele</button>
            { error && <p>{ error }</p> }
            { success && <p>Sikeresen megtörtént a telefon felvétele.</p> }
        </form>
    </>
}