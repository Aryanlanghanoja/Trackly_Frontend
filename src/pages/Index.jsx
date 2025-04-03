
import { Navigate } from "react-router-dom";

// This page is no longer needed as we're redirecting from "/" to "/dashboard" in App.tsx
const Index = () => {
  return <Navigate to="/dashboard" replace />;
};

export default Index;
