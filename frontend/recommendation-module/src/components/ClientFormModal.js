import React, { useState } from "react";
import { Button, Input, Gap } from "@alfalab/core-components"; // Если используешь компоненты из Alfaland

// Данные для валидации (имитируем твои данные)
const data = {
  deposit: {
    name: "Депозит",
    fields: {
      name: { label: "ФИО клиента", errMsg: "Это обязательное поле" },
      amount: { label: "Сумма депозита", errMsg: "Укажите сумму" },
    },
  },
  account: {
    name: "Открытие счета",
    fields: {
      accountName: {
        label: "Название счета",
        errMsg: "Укажите название счета",
      },
      initialDeposit: {
        label: "Первоначальный взнос",
        errMsg: "Укажите взнос",
      },
    },
  },
  report: {
    name: "Отчетность в ФНС",
    fields: {
      companyName: {
        label: "Название компании",
        errMsg: "Укажите название компании",
      },
      taxAmount: { label: "Сумма налога", errMsg: "Укажите сумму налога" },
    },
  },
};

const getInitialState = (selectedTemplate) => {
  const initialValues = Object.keys(data[selectedTemplate].fields).reduce(
    (result, key) => {
      result[key] = "";
      return result;
    },
    {}
  );

  const initialErrors = Object.keys(data[selectedTemplate].fields).reduce(
    (result, key) => {
      result[key] = "";
      return result;
    },
    {}
  );

  return { values: initialValues, errors: initialErrors };
};

const ClientFormModal = ({ onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null); // Тип документа
  const [form, setForm] = useState(null); // Состояние формы

  // Выбираем шаблон и инициализируем форму
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setForm(getInitialState(template));
  };

  // Валидация формы
  const validateForm = (formData) => {
    const errors = {};
    const fields = data[selectedTemplate].fields;

    Object.keys(fields).forEach((key) => {
      if (!formData.values[key]) {
        errors[key] = fields[key].errMsg;
      }
    });

    return Object.keys(errors).length > 0 ? errors : null;
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(form);
    if (errors) {
      setForm((prevState) => ({ ...prevState, errors }));
      // Прокручиваем страницу к первому полю с ошибкой
      const firstErrorKey = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorKey);
      errorElement && errorElement.scrollIntoView({ behavior: "smooth" });
    } else {
      alert("Форма успешно отправлена!");
    }
  };

  // Обработчик изменения значений в полях формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      values: { ...prevState.values, [name]: value },
      errors: { ...prevState.errors, [name]: "" }, // очищаем ошибку при изменении
    }));
  };

  return (
    <div className="client-form-modal">
      <h3>Выберите шаблон документа</h3>
      <div className="template-buttons">
        <button onClick={() => handleSelectTemplate("deposit")}>Депозит</button>
        <button onClick={() => handleSelectTemplate("account")}>
          Открытие счета
        </button>
        <button onClick={() => handleSelectTemplate("report")}>
          Отчетность в ФНС
        </button>
      </div>

      {selectedTemplate && (
        <form onSubmit={handleSubmit}>
          <h4>Форма для {data[selectedTemplate].name}</h4>
          {Object.keys(data[selectedTemplate].fields).map((key) => (
            <div key={key} className="input-field">
              <Input
                id={key}
                name={key}
                value={form.values[key]}
                error={form.errors[key]}
                onChange={handleChange}
                placeholder={data[selectedTemplate].fields[key].label}
              />
              {form.errors[key] && (
                <div className="error-message">{form.errors[key]}</div>
              )}
              <Gap size="m" />
            </div>
          ))}
          <Button type="submit">Отправить форму</Button>
        </form>
      )}

      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};

export default ClientFormModal;
