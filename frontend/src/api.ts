import type {Card,CardUpdate,CardCreate} from "./types"

const API_URL = "http://localhost:8000/api/cards"

export async function getCards(category?: string): Promise<Card[]> {
    const url = category ? `${API_URL}/?category=${encodeURIComponent(category)}` : `${API_URL}/`;
    const res =await fetch(url);
    if(!res.ok) throw new Error("failed to fetch cards")
    return res.json();
}

export async function createCard(data:CardCreate):Promise<Card>{
    const res = await fetch(`${API_URL}/`, {
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error("Failed to add cards")
    return res.json()
}

export async function updateCard(id:string, data:CardUpdate):Promise<Card>{
    const res = await fetch(`${API_URL}/${id}`,{
        method : "PATCH",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    if(!res.ok) throw new Error("Failed to update card")
    return res.json()
}

export async function deleteCard(id:string):Promise<void>{
    const res = await fetch(`${API_URL}/${id}`,{
        method:"DELETE",
    });
    if(!res.ok) throw new Error("Failed to delete card")

}