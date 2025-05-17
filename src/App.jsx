
import './App.css'
import Layout from './component/layout/Layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BulkUpload from './component/bulk-upload/BulkUpload';
import Customer from './component/customer/Customer';
import Dashboard from './component/dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customer-form" element={<Customer />} />
          <Route path="/bulk-upload" element={<BulkUpload />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
