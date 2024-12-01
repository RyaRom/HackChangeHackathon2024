import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Импортируем React Router
import RecommendationModal from "./components/RecommendationModal";
import ComparisonModal from "./components/ComparisonModal";
import PaymentPage from "./components/PaymentPage";
import MethodDetails from "./components/MethodDetails";
import DocumentPage from "./components/DocumentPage"; // Импортируем новый компонент

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PaymentPage />, // Это главный компонент
      children: [
        {
          path: "recommendation-modal", // Роут для RecommendationModal
          element: <RecommendationModal />,
        },
        {
          path: "comparison-modal", // Роут для ComparisonModal
          element: <ComparisonModal />,
        },
        {
          path: "method-details/:method", // Роут для MethodDetails
          element: <MethodDetails />,
        },
        {
          path: "document-page", // Роут для DocumentPage
          element: <DocumentPage />, // Отображение страницы с формой
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
