import React, { useState } from "react";
import ReactDOM from "react-dom";
import RecommendationModal from "./RecommendationModal"; // Импортируем первое модальное окно
import ComparisonModal from "./ComparisonModal"; // Импортируем второе модальное окно
import { classifyDocument } from "../api/api"; // Импортируем функцию для классификации
import { AScoresCircleMIcon } from "@alfalab/icons-glyph/AScoresCircleMIcon"; // Иконка Альфа-Банк
import "../styles.css"; // Подключаем стили

const PaymentPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  const handleNavigate = (page) => {
    console.log(`Навигация на страницу: ${page}`);
  };

  const handleShowComparison = () => {
    setShowComparisonModal(true);
  };

  return (
    <div className="payment-page">
      <div className="sidebar">
        <AScoresCircleMIcon className="bank-icon" />
        <span className="bank-name">Альфа-Банк</span>
      </div>

      <div className="content">
        <h1 className="page-title">Способы подписания</h1>

        <div className="recommendation-box" onClick={() => setShowModal(true)}>
          <h2>Оптимальный способ для вас</h2>
          <p>
            Нажмите, чтобы узнать, какой способ подписания наиболее подходит для
            вас.
          </p>
        </div>

        {showModal && (
          <RecommendationModal
            onClose={() => setShowModal(false)}
            onNavigate={handleNavigate}
            onClassify={classifyDocument} // Передаем функцию для вызова API
            onShowComparison={handleShowComparison} // Передаем функцию для сравнения
          />
        )}

        {showComparisonModal && (
          <ComparisonModal onClose={() => setShowComparisonModal(false)} />
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<PaymentPage />, document.getElementById("root"));

export default PaymentPage;
