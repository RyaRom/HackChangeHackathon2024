import React, { useState, useEffect } from "react";
import NewModalForm from "./NewModalForm"; // Импортируем правильный компонент
import { classifyDocument } from "../api/api"; // Убедись, что функция работает правильно

const DocumentPage = () => {
  const [showLeftForm, setShowLeftForm] = useState(false); // Состояние для левого окна
  const [showRightForm, setShowRightForm] = useState(false); // Состояние для правого окна
  const [classification, setClassification] = useState(null); // Состояние для результата классификации

  // Функция для переключения левой формы
  const toggleLeftForm = () => {
    setShowLeftForm(!showLeftForm);
  };

  // Функция для переключения правой формы
  const toggleRightForm = () => {
    setShowRightForm(!showRightForm);
  };

  // Функция для получения классификации
  const handleClassify = async () => {
    const clientId = "some-id"; // Здесь должен быть актуальный id клиента
    const organizationId = "org-id"; // Здесь должен быть актуальный id организации
    const context = "some-context"; // Укажи актуальный контекст для запроса

    try {
      // Вызов функции классификации
      const result = await classifyDocument(clientId, organizationId, context);
      setClassification(result); // Сохраняем результат классификации
    } catch (error) {
      console.error("Ошибка при классификации:", error);
    }
  };

  // Вызов функции классификации при монтировании компонента
  useEffect(() => {
    handleClassify();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <h1>Страница документов</h1>
        <p>Здесь вы можете выбрать тип документа и заполнить форму.</p>

        <button onClick={toggleLeftForm}>
          {showLeftForm ? "Скрыть левую форму" : "Показать левую форму"}
        </button>
        {showLeftForm && (
          <NewModalForm
            onClose={toggleLeftForm} // Закрыть только левую форму
            position="left" // Указываем, что это левое окно
            classification={classification} // Передаем результат классификации
          />
        )}
      </div>

      <div style={{ flex: 1 }}>
        <button onClick={toggleRightForm}>
          {showRightForm ? "Скрыть правую форму" : "Показать правую форму"}
        </button>
        {showRightForm && (
          <NewModalForm
            onClose={toggleRightForm} // Закрыть только правую форму
            position="right" // Указываем, что это правое окно
            classification={classification} // Передаем результат классификации
          />
        )}
      </div>
    </div>
  );
};

export default DocumentPage;
