// Функция для отправки POST-запроса на сервер
export const classifyDocument = async (clientId, organizationId, context) => {
  try {
    const response = await fetch("http://127.0.0.1/api/classify", {
      method: "POST", // наш запрос
      headers: {
        "Content-Type": "application/json", // тип содержимого
      },
      body: JSON.stringify({
        clientId, // тут clientId
        organizationId, // тут organizationId
        context, // тут context
      }),
    });

    // Если сервер вернул успешный ответ
    if (!response.ok) {
      throw new Error("Ошибка при классификации документов");
    }

    // Парсим JSON-ответ
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Ошибка запроса:", error);
    return null; // Возвращаем null в случае ошибки
  }
};
