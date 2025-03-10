import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Root from './pages/Root.jsx';
import Verb from './pages/Verb.jsx';
import Contact from './pages/Contact.jsx';
import Lookup from './pages/Lookup.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/roots" element={<Root />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verbs" element={<Verb />} />
          <Route path="/lookups" element={<Lookup />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

