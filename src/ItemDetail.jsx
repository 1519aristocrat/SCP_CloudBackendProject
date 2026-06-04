import { useState, useEffect } from "react"
import { useParams } from "react-router";
import {supabase} from './supabase'

export default function ItemDetail()
{
    const {id} = useParams();
    const [itemDetail, setItemDetail] = useState(null)
    useEffect(
        () => {
            const fetchItemDetails = async () =>
            {
                const {data, error} = await supabase.from('spc').select('*').eq('id', id).single()
                if (error)
                {
                    console.error(error)
                }
                else
                {
                    setItemDetail(data)
                }
            }
            fetchItemDetails()
        }, [id]
    )

    return(
            <div className="scp-div">
                {
                    itemDetail ? (<>
                    
                    <h1>{itemDetail.item}</h1>
                    <h2 className="scp-class">{itemDetail.class}</h2>
                    <p className="scp-description">{itemDetail.description}</p>
                    <p className="scp-containment">{itemDetail.containment}</p>
                    <p><img src={itemDetail.image} alt={itemDetail.item} className="scp-img"/></p>

                    </>) :(<p>Loading...</p>)
                }
            </div>
    )
}