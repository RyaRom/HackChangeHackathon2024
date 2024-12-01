import React, { useState, useEffect } from "react";
import { ArrowRightSIcon } from "@alfalab/icons-glyph/ArrowRightSIcon"; // Иконка стрелки
import { classifyDocument } from "../api/api";
import MethodDetailsModal from "./MethodDetails"; // Новый компонент для модального окна
import "../styles.css"; // Подключаем стили

const RecommendationModal = ({ onClose, onShowComparison }) => {
  const [method, setMethod] = useState("SMS");
  const availableMethods = ["SMS", "KEP", "PayControl", "YKEP"];
  const [classification, setClassification] = useState(null);
  const [showMethodDetails, setShowMethodDetails] = useState(false); // Состояние для отображения модального окна с деталями

  // Функция для вызова классификации
  const handleClassify = async () => {
    const clientId = "client_123"; // передать актуальный id клиента
    const organizationId = "organization_123"; // передать актуальный id организации
    const context = "some-context"; // контекст для запроса

    console.log("Отправка запроса...");
    const result = await classifyDocument(clientId, organizationId, context);
    console.log("Результат запроса:", result);
    setClassification(result);
  };

  useEffect(() => {
    // Вызов функции классификации при загрузке компонента
    handleClassify();
  }, []);

  // Функция для показа модального окна с подробностями о выбранном методе
  const handleShowMethodDetails = (method) => {
    setMethod(method); // Устанавливаем выбранный метод
    setShowMethodDetails(true); // Показываем модальное окно
  };

  return (
    <div className="recommendation-modal">
      <div className="modal-content">
        <div className="close-btn" onClick={onClose}>
          <ArrowRightSIcon className="close-icon" />
        </div>
        <h2>Оптимальный способ для вас</h2>

        {classification ? (
          <p>
            Мы рекомендуем использовать <strong>{classification ||"Неизвестно"}</strong>{" "}
            для подписания документов. Это наиболее подходящий способ для вашего
            профиля.
          </p>
        ) : (
          <p>Здесь будет информация о классификации.</p>
        )}

        <div className="method-title">
          <p>Выберите оптимальный для вас способ</p>
        </div>

        <div className="method-buttons">
          {availableMethods.map((method) => (
            <button
              key={method}
              className="method-btn"
              onClick={() => setMethod(method)}
            >
              {method}
            </button>
          ))}
        </div>

        <div className="buttons-container">
          <button
            className="action-btn"
            onClick={() => handleShowMethodDetails(method)}
          >
            Подробнее о {method}
          </button>
        </div>
      </div>

      {showMethodDetails && (
        <MethodDetailsModal
          method={method}
          onClose={() => setShowMethodDetails(false)} // Закрытие модального окна
        />
      )}
    </div>
  );
};

export default RecommendationModal;
