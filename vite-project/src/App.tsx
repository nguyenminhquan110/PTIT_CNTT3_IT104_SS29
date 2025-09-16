import './App.css'
import Students from "./Page/Parent.tsx"
import {Route, Routes, Navigate} from "react-router-dom";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/Student" replace />} />
                <Route path="/Student" element={<Students />} />
            </Routes>
        </>
    )
}

export default App;