export const data = {
  pushkin: {
    patronymic: "сергеевич",
    desc: "Отчество Александра Пушкина",
    errMsg: "Александр Сергеевич – наше всё",
  },
  fet: {
    patronymic: "афанасьевич",
    desc: "Отчество Афанасия Фета",
    errMsg: "Отца Афанасия тоже звали Афанасием",
  },
};

export const dataKeys = Object.keys(data);

export const validateForm = (form, documentType) => {
  let errors = {};

  dataKeys.forEach((key) => {
    if (data[key].patronymic !== form.values[key].toLowerCase()) {
      errors[key] = data[key].errMsg;
    }
  });

  return Object.keys(errors).length > 0 ? errors : null;
};

export const getInitialState = () => {
  const initialValues = dataKeys.reduce((result, key) => {
    result[key] = "";
    return result;
  }, {});

  return { values: initialValues, errors: initialValues };
};
