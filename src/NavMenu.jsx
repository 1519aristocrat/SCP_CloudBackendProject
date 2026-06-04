import { useEffect, useState } from "react";
import {Link} from "react-router";
import {supabase} from "./supabase"

export default function NavMenu()
{
    const [item, setItem] = useState([])

    useEffect(
        ()=> {
            const fetchItems = async () => {
                const {data, error} = await supabase.from('spc').select('id, item')
                if(error)
                {
                    console.error(error)
                }
                else
                {
                    setItem(data)
                }
            };
            fetchItems();
        }, []
    )

    return(
        <nav style={{
            backgroundColor: '#0f172a',
            height :"70px",
            display: "flex",
            alignItems: "center",
            padding: "0 30px"
        }}>
            <ul style={{
                display: "flex",
                gap: "30px",
                listStyle: "none",
                margin: 0,
                padding: 0
            }}>
                {
                    item.map(
                        (items) => (
                            <li key={items.id}>
                                <Link to={`/item/${items.id}`}className='nav-link' style={{
                            textDecoration: "none",
                            color: "#cbd5f5",
                            fontFamily: "Inter, system-ui, sans-serif",
                            fontSize: "16px",
                            padding: "8px 12px",
                            borderRadius: "6px"
                        }}>{items.item}</Link>
                            </li>
                        )
                    )
                }
                <li>
                    <Link to="/admin" style={{
                            textDecoration: "none",
                            color: "#cbd5f5",
                            fontFamily: "Inter, system-ui, sans-serif",
                            fontSize: "16px",
                            padding: "8px 12px",
                            borderRadius: "6px"
                        }}>Admin Panel</Link>
                </li>
            </ul>
        </nav>
    )
}