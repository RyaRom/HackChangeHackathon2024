import React, { useState } from "react";
import RecommendationModal from "./RecommendationModal";
import ComparisonModal from "./ComparisonModal";
import { AScoresCircleMIcon } from "@alfalab/icons-glyph/AScoresCircleMIcon";
import "../styles.css"; // Подключаем стили
import { classifyDocument } from "../api/api"; // Импортируем функцию классификации

const PaymentPage = () => {
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [classification, setClassification] = useState(null); // Состояние для хранения результата классификации

  const [form, setForm] = useState({
    deposit: "",
    accountOpening: "",
    taxReport: "",
    fio: "",
    documentType: "", // Добавляем документ для выбора типа
  });

  const [errors, setErrors] = useState({});
  const [focusField, setFocusField] = useState(null);
  const [successMessage, setSuccessMessage] = useState("ееее"); // Сообщение об успехе
  const [showNotification, setShowNotification] = useState(false); // Показываем уведомление

  // Функция для получения классификации
  const handleClassify = async () => {
    const clientId = "some-id"; // Передать актуальный id клиента
    const organizationId = "org-id"; // Передать актуальный id организации
    const context = "some-context"; // Укажи актуальный контекст для запроса

    try {
      // Вызов функции классификации
      const result = await classifyDocument(clientId, organizationId, context);
      setClassification(result); // Сохраняем результат классификации
    } catch (error) {
      console.error("Ошибка при классификации:", error);
    }
  };

  // Открытие/закрытие модальных окон
  const openRecommendationModal = () => setShowRecommendationModal(true);
  const closeRecommendationModal = () => setShowRecommendationModal(false);

  const openComparisonModal = () => setShowComparisonModal(true);
  const closeComparisonModal = () => setShowComparisonModal(false);

  const openNewModal = async () => {
    setShowNewModal(true);
    await handleClassify(); // Вызываем функцию классификации при открытии нового модального окна
  };
  const closeNewModal = () => setShowNewModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccessMessage("Форма отправилась успешно!");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        setForm({
          deposit: "",
          accountOpening: "",
          taxReport: "",
          fio: "",
          documentType: "", // Сбрасываем тип документа
        });
        setErrors({});
        setFocusField(null);
        closeNewModal();
      }, 3000);
    } else {
      setFocusField(Object.keys(errors)[0]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeNewModal();
    }
  };

  // Функция для валидации формы
  const validateForm = () => {
    const newErrors = {};

    // Пример простых проверок для каждого поля
    if (!form.deposit && form.documentType === "deposit") {
      newErrors.deposit = "Это поле обязательно";
    }
    if (!form.accountOpening && form.documentType === "accountOpening") {
      newErrors.accountOpening = "Это поле обязательно";
    }
    if (!form.taxReport && form.documentType === "taxReport") {
      newErrors.taxReport = "Это поле обязательно";
    }
    if (!form.fio) {
      newErrors.fio = "Это поле обязательно";
    }

    // Если есть ошибки, возвращаем их
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true; // Если ошибок нет, форма валидна
  };

  return (
    <div className="payment-page">
      <div className="sidebar">
        <AScoresCircleMIcon className="bank-icon" />
        <span className="bank-name">Альфа-Банк</span>
      </div>

      <div className="content">
        <h1 className="page-title">Способы подписания</h1>

        <div className="button-container">
          <button className="method-btn" onClick={openRecommendationModal}>
            Узнать оптимальный способ
          </button>
          <button className="method-btn" onClick={openComparisonModal}>
            Сравнение способов подписания
          </button>
          <button className="method-btn" onClick={openNewModal}>
            Подать документы
          </button>
        </div>

        {showRecommendationModal && (
          <div className="modal-overlay" onClick={closeRecommendationModal}>
            <RecommendationModal onClose={closeRecommendationModal} />
          </div>
        )}

        {showComparisonModal && (
          <div className="modal-overlay" onClick={closeComparisonModal}>
            <ComparisonModal onClose={closeComparisonModal} />
          </div>
        )}

        {showNewModal && (
          <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal">
              <div className="modal-content">
                <h2>
                  Отправка любого документа, подразумевающего движение денежных
                  средств
                </h2>
                <p>Пожалуйста, выберите тип документа:</p>
                <div className="document-options">
                  <button
                    onClick={() =>
                      setForm({ ...form, documentType: "deposit" })
                    }
                  >
                    Размещение депозита
                  </button>
                  <button
                    onClick={() =>
                      setForm({ ...form, documentType: "accountOpening" })
                    }
                  >
                    Открытие счетов
                  </button>
                  <button
                    onClick={() =>
                      setForm({ ...form, documentType: "taxReport" })
                    }
                  >
                    Сдача отчетности в ФНС
                  </button>
                </div>

                {/* Отображение результата классификации */}
                {classification && (
                  <div className="classification-result">
                    <h3>Результат классификации:</h3>
                    <p>{classification}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {form.documentType === "deposit" && (
                    <div>
                      <label>Размещение депозита</label>
                      <input
                        type="text"
                        name="deposit"
                        value={form.deposit}
                        onChange={handleChange}
                        className={errors.deposit ? "error" : ""}
                        placeholder="Введите данные о депозите"
                        autoFocus={focusField === "deposit"}
                      />
                      {errors.deposit && (
                        <span className="error">{errors.deposit}</span>
                      )}
                    </div>
                  )}

                  {form.documentType === "accountOpening" && (
                    <div>
                      <label>Открытие счета</label>
                      <input
                        type="text"
                        name="accountOpening"
                        value={form.accountOpening}
                        onChange={handleChange}
                        className={errors.accountOpening ? "error" : ""}
                        placeholder="Введите данные для открытия счета"
                        autoFocus={focusField === "accountOpening"}
                      />
                      {errors.accountOpening && (
                        <span className="error">{errors.accountOpening}</span>
                      )}
                    </div>
                  )}

                  {form.documentType === "taxReport" && (
                    <div>
                      <label>Отчетность в ФНС</label>
                      <input
                        type="text"
                        name="taxReport"
                        value={form.taxReport}
                        onChange={handleChange}
                        className={errors.taxReport ? "error" : ""}
                        placeholder="Введите данные для отчетности"
                        autoFocus={focusField === "taxReport"}
                      />
                      {errors.taxReport && (
                        <span className="error">{errors.taxReport}</span>
                      )}
                    </div>
                  )}

                  <div>
                    <label>ФИО</label>
                    <input
                      type="text"
                      name="fio"
                      value={form.fio}
                      onChange={handleChange}
                      className={errors.fio ? "error" : ""}
                      placeholder="Введите ФИО"
                      autoFocus={focusField === "fio"}
                    />
                    {errors.fio && <span className="error">{errors.fio}</span>}
                  </div>

                  <button type="submit">Отправить</button>
                </form>

                <button className="close-btn" onClick={closeNewModal}>
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        )}

        {showNotification && (
          <div className="notification">
            <p>{successMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
