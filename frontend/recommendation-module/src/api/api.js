// Функция для отправки POST-запроса на сервер
export const classifyDocument = async (clientId, organizationId, context) => {
  try {
    const response = await fetch("http://127.0.0.1:8080/api/classify", {
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
  const responseUserAdd = await fetch("http://127.0.0.1:8080/api/users/user/add", {
    method: "POST", // метод запроса
    headers: {
      "Content-Type": "application/json", // тип содержимого
    },
    body: JSON.stringify({
          "clientId": "client_123",
          "organizationId": "organization_123",
          "segment": "Малый бизнес",
          "role": "ЕИО",
          "organizations": 0,
          "currentMethod": "SMS",
          "mobileApp": true,
          "signatures": {
            "common": {
              "id": 0,
              "mobile": 0,
              "web": 0
            },
            "special": {
              "id": 0,
              "mobile": 0,
              "web": 0
            }
          },
          "availableMethods": [
            "SMS"
          ],
          "claims": 0,
          "target": "КЭП на токене"
        }
    ),
  });

  //  сервер вернул неуспешный ответ на второй запрос
  if (!responseUserAdd.ok) {
    throw new Error("Ошибка при добавлении пользователя");
  }

  //  результат добавления пользователя
  const userAddResult = await responseUserAdd.json();

};
