import React, { useState } from "react";

const NewModalForm = ({ onClose, position, classification }) => {
  const [form, setForm] = useState({
    fio: "",
    deposit: "",
    accountOpening: "",
    taxReport: "",
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fio || !form.deposit) {
      setErrors({
        fio: "Поле ФИО обязательно",
        deposit: "Поле для депозита обязательно",
      });
    } else {
      alert("Форма отправлена!");
      onClose();
    }
  };

  return (
    <div
      className={`modal ${position}`}
      style={{
        position: "absolute",
        top: "10%",
        left: position === "left" ? "10%" : "auto",
        right: position === "right" ? "10%" : "auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        maxWidth: "400px", // Ограничиваем ширину модального окна
        width: "100%",
      }}
    >
      {/* Отображаем результат классификации, если он есть */}
      {classification && (
        <div
          className="classification-result"
          style={{
            marginBottom: "20px", // Отступ снизу
            fontSize: "24px", // Увеличиваем размер текста
            fontWeight: "bold",
            color: "#333", // Цвет текста
            textAlign: "center", // Выравнивание по центру
          }}
        >
          <h3>Результат классификации:</h3>
          <p>{classification}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h2>Форма для отправки документа</h2>
        <div>
          <label>ФИО</label>
          <input
            type="text"
            name="fio"
            value={form.fio}
            onChange={handleChange}
            placeholder="Введите ФИО"
          />
          {errors.fio && <span>{errors.fio}</span>}
        </div>
        <div>
          <label>Депозит</label>
          <input
            type="text"
            name="deposit"
            value={form.deposit}
            onChange={handleChange}
            placeholder="Введите депозит"
          />
          {errors.deposit && <span>{errors.deposit}</span>}
        </div>

        <button type="submit">Отправить</button>
      </form>

      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};

export default NewModalForm;
