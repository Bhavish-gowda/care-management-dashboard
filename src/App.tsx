import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import PageContainer from './components/layout/PageContainer';
import UsersPage from './pages/UsersPage';
import CareFormsPage from './pages/CareFormsPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 bg-[radial-gradient(circle_at_top,_#1e293b_0,_#020617_60%)] text-slate-100">
      <Navbar />
      <PageContainer>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/forms" element={<CareFormsPage />} />
        </Routes>
      </PageContainer>
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'text-sm',
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: 'white'
            }
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: 'white'
            }
          }
        }}
      />
    </div>
  );
}

export default App;
