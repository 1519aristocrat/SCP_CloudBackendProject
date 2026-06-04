import { BrowserRouter as Router, Route, Routes } from "react-router";
import NavMenu from "./NavMenu"
import ItemDetail from "./ItemDetail"
import AdminPanel from "./AdminPanel"

function App() {

  return (
   <Router>
      <NavMenu />

        <Routes>
          <Route path ="/" element={
            <div>
            <h1>SPC</h1>
            <p>Use the links to use this application</p>
            </div>
          } />
          <Route path ="/item/:id" element={<ItemDetail />}/>
          <Route path ="/admin" element={<AdminPanel />}/>
        </Routes>
    </Router>
  )
}

export default App
