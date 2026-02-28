import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ViewJobs from "./pages/ViewJobs";
import PostJob from "./pages/PostJob";
import MyApplications from "./pages/MyApplications";
import RecruiterJobs from "./pages/RecruiterJobs";
import ViewApplicants from "./pages/ViewApplicants";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ Default page = Login */}
        <Route path="/" element={<Login />} />

        {/* ✅ Register Page */}
        <Route path="/register" element={<Register />} />

        {/* ✅ Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Other Protected Pages */}
        <Route
          path="/view-jobs"
          element={
            <ProtectedRoute>
              <ViewJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post-job"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-jobs"
          element={
            <ProtectedRoute>
              <RecruiterJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view-applicants/:jobId"
          element={
            <ProtectedRoute>
              <ViewApplicants />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
