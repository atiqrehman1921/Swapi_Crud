import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import TransparentTable from './Pages/TransparentTable';
import Insert from './Pages/Insert';
import SeedData from "./Pages/SeedData";
import UpdateTable from "./Pages/UpdateTable";
import EditStarship from "./Pages/Edit";
import Delete from "./Pages/Delete";
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/table" element={<TransparentTable />} />
        <Route path="/insert" element={<Insert />} />
        <Route path="/get" element={<TransparentTable />} />
        <Route path="/dataseeding" element={<SeedData />} />
        <Route path="/update" element={<UpdateTable />} />
        <Route path="/Delete" element={<Delete />} />
        <Route path="/edit/:id" element={<EditStarship />} />
        <Route path="*" element={<NotFound />} /> {/* <-- 404 page */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
