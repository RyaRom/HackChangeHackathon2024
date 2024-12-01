import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Импортируем React Router
import RecommendationModal from "./components/RecommendationModal";
import ComparisonModal from "./components/ComparisonModal";
import PaymentPage from "./components/PaymentPage";
import MethodDetails from "./components/MethodDetails";
import DocumentSendingForm from "./components/DocumentSendingForm"; // Подключаем форму для отправки документов

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PaymentPage />,
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
          path: "document-sending", // Новый роут для формы отправки документов
          element: <DocumentSendingForm />, // Компонент формы отправки документов
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router}>
      {/* Основная страница будет загружаться в роуте "/" */}
      <div>
        <PaymentPage />
      </div>
    </RouterProvider>
  );
}

export default App;
