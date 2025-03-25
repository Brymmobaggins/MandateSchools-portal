/** @format */

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./Layout/MainLayout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      
      <Route index element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} /> 
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
