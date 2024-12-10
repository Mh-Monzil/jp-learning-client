import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Lessons from './pages/Lessons'
import Tutorials from './pages/Tutorials'
import AdminDashboard from './pages/admin/Dashboard'
import AdminLessons from './pages/admin/Lessons'
import AdminAddLesson from './pages/admin/AddLesson'
import AdminAddVocabulary from './pages/admin/AddVocabulary'
import AdminManageUsers from './pages/admin/ManageUsers'
import AdminLessonManagement from './pages/admin/LessonManagement'
import AdminVocabularyManagement from './pages/admin/VocabularyManagement'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/lessons" replace />} />
          <Route path="/lessons" element={<ProtectedRoute><Lessons /></ProtectedRoute>} />
          <Route path="/tutorials" element={<ProtectedRoute><Tutorials /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/lessons" element={<ProtectedRoute adminOnly><AdminLessons /></ProtectedRoute>} />
          <Route path="/admin/add-lesson" element={<ProtectedRoute adminOnly><AdminAddLesson /></ProtectedRoute>} />
          <Route path="/admin/add-vocabulary" element={<ProtectedRoute adminOnly><AdminAddVocabulary /></ProtectedRoute>} />
          <Route path="/admin/manage-users" element={<ProtectedRoute adminOnly><AdminManageUsers /></ProtectedRoute>} />
          <Route path="/admin/lesson-management" element={<ProtectedRoute adminOnly><AdminLessonManagement /></ProtectedRoute>} />
          <Route path="/admin/vocabulary-management" element={<ProtectedRoute adminOnly><AdminVocabularyManagement /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  )
}

export default App

