import React, { useState } from "react";

const data = {
  deposit: {
    clientName: {
      desc: "ФИО клиента",
      errMsg: "Имя клиента не может быть пустым",
    },
    depositAmount: {
      desc: "Сумма депозита",
      errMsg: "Сумма депозита должна быть больше 0",
    },
  },
  accountOpening: {
    clientName: {
      desc: "ФИО клиента",
      errMsg: "Имя клиента не может быть пустым",
    },
    accountType: { desc: "Тип счета", errMsg: "Тип счета должен быть выбран" },
  },
  taxReport: {
    clientName: {
      desc: "ФИО клиента",
      errMsg: "Имя клиента не может быть пустым",
    },
    taxYear: {
      desc: "Год отчетности",
      errMsg: "Год отчетности должен быть указан",
    },
  },
};

const dataKeys = Object.keys(data);

const validateForm = (form, documentType) => {
  let errors = {};

  Object.keys(data[documentType]).forEach((key) => {
    if (!form.values[key] || form.values[key].trim() === "") {
      errors[key] = data[documentType][key].errMsg;
    }
  });

  return Object.keys(errors).length > 0 ? errors : null;
};

const getInitialState = (documentType) => {
  const initialValues = Object.keys(data[documentType]).reduce(
    (result, key) => {
      result[key] = "";
      return result;
    },
    {}
  );

  return { values: initialValues, errors: initialValues };
};

const DocumentForm = ({ onClose }) => {
  const [documentType, setDocumentType] = useState("deposit");
  const [form, setForm] = useState(getInitialState("deposit"));

  const handleDocumentChange = (e) => {
    const newDocumentType = e.target.value;
    setDocumentType(newDocumentType);
    setForm(getInitialState(newDocumentType)); // Обновляем форму для нового типа документа
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(form, documentType);

    if (errors) {
      setForm((prevState) => ({
        ...prevState,
        errors: { ...prevState.errors, ...errors },
      }));
      // Прокручиваем страницу к первому полю с ошибкой
      const firstErrorField = Object.keys(errors)[0];
      document
        .getElementById(firstErrorField)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      values: { ...prevState.values, [name]: value },
      errors: { ...prevState.errors, [name]: "" }, // Сбрасываем ошибку для этого поля
    }));
  };

  return (
    <div
      className="document-form-container"
      style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}
    >
      <h2>Отправка любого документа</h2>

      <div>
        <label>Выберите тип документа:</label>
        <select
          onChange={handleDocumentChange}
          value={documentType}
          style={{ width: "100%", padding: "8px" }}
        >
          <option value="deposit">Размещение депозита</option>
          <option value="accountOpening">Открытие счета</option>
          <option value="taxReport">Сдача отчетности в ФНС</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        {Object.keys(data[documentType]).map((key) => (
          <div key={key} style={{ marginBottom: "15px" }}>
            <label
              htmlFor={key}
              style={{ display: "block", marginBottom: "5px" }}
            >
              {data[documentType][key].desc}
            </label>
            <input
              id={key}
              name={key}
              type="text"
              value={form.values[key]}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: form.errors[key] ? "2px solid red" : "1px solid #ccc",
              }}
            />
            {form.errors[key] && (
              <div style={{ color: "red", marginTop: "5px" }}>
                {form.errors[key]}
              </div>
            )}
          </div>
        ))}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Отправить форму
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default DocumentForm;
