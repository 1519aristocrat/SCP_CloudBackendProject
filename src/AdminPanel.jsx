import {useState, useEffect} from "react"
import {supabase} from './supabase'
import './App.css'

export default function AdminPanel()
{
    // component 
    const [items, setItems] = useState([])
    const [newRecord, setNewRecord] = useState(
        {
            item: '',
            class: '',
            description: '',
            containment: '',
            image: ''
        }
    )
    const [editRecord, setEditRecord] = useState(null)

    // fetch all records from the database table
    useEffect(
        () => {
            const fetchItems = async () => {
                const{data, error} = await supabase.from('spc').select('*')
                if(error)
                {
                    console.error(error)
                }
                else{
                    setItems(data)
                }
            }
            fetchItems()
        }, []
    )

    // crud function section

    // add a new record
    const AddRecord = async () => {
        await supabase.from('spc').insert([newRecord])
        setNewRecord(
            {
            item: '',
            class: '',
            description: '',
            containment: '',
            image: ''
            }
        )
         // refresh display after adding record
    }

    // Delete Record
    const deleteRecord = async (id) => {
        await supabase.from('spc').delete().eq('id', id)
        
    }


    // setting state variable for record editing
    const startEditing = (item) => {
        setEditRecord(item)
    }

    //save edited record
    const saveEdit = async (id) =>
    {
        await supabase.from('spc').update(editRecord).eq('id', id)
        setEditRecord(null) // clear the state after saving
        
    }

return(
    <div className="admin-panel">
        <h1>Admin Panel</h1>
        <ul>
            {
                items.map(
                    (item) => (
                        <li key ={item.id}>
                            {
                                editRecord && editRecord.id ==item.id ? (
                                    <div>
                                        <input value={editRecord.item} onChange={(e)=> setEditRecord({...editRecord, item: e.target.value})} />
                                        <input value={editRecord.class} onChange={(e)=> setEditRecord({...editRecord, class: e.target.value})} />
                                        <input value={editRecord.description} onChange={(e)=> setEditRecord({...editRecord, description: e.target.value})} />
                                        <input value={editRecord.containment} onChange={(e)=> setEditRecord({...editRecord, containment: e.target.value})} />
                                        <input value={editRecord.image} onChange={(e)=> setEditRecord({...editRecord, image: e.target.value})} />
                                        <button onClick={()=>saveEdit(item.id)}>Save</button>
                                        <button onClick={()=>setEditRecord(null)}>Cancel</button>
                                    </div>

                                ) : (

                                    <div>
                                        <p>{item.item}</p>
                                        <button onClick={() =>startEditing(item)}>Edit</button>
                                        <button onClick={()=>deleteRecord(item.id)}>delete</button>
                                    </div>
                                )
                            }
                        </li>
                    )
                )
            }
        </ul>
        <h2>Add A New Record</h2>
        <input value = {newRecord.item} onChange={(e)=>setNewRecord({...newRecord, item: e.target.value})} placeholder="Item..."/>
        <input value = {newRecord.class} onChange={(e)=>setNewRecord({...newRecord, class: e.target.value})} placeholder="Class..."/>
        <input value = {newRecord.description} onChange={(e)=>setNewRecord({...newRecord, description: e.target.value})} placeholder="Description..."/>
        <input value = {newRecord.containment} onChange={(e)=>setNewRecord({...newRecord, containment: e.target.value})} placeholder="Containment..."/>
        <input value = {newRecord.image} onChange={(e)=>setNewRecord({...newRecord, image: e.target.value})} placeholder="Image Link..."/>
        <button onClick={AddRecord}>Add Record</button>
    </div>
)
}

