import React from "react";
import { CheckmarkMIcon } from "@alfalab/icons-glyph/CheckmarkMIcon"; // Иконка галочки
import { CrossMWhiteIcon } from "@alfalab/icons-glyph/CrossMWhiteIcon"; // Иконка крестика
import "../styles.css"; // Подключаем стили

const ComparisonModal = ({ onClose }) => {
  return (
    <div className="comparison-modal">
      <div className="modal-content">
        <h3>Сравнение способов подписания</h3>
        <table className="comparison-table">
          <thead>
            <tr>
              <th></th>
              <th>КЭП в приложении</th>
              <th>КЭП на токене</th>
              <th>СМС-код</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Удобство</td>
              <td>
                <CheckmarkMIcon className="icon-check" />
              </td>
              <td>
                <CrossMWhiteIcon className="icon-cross" />
              </td>
              <td>
                <CheckmarkMIcon className="icon-check" />
              </td>
            </tr>
            <tr>
              <td>Безопасность</td>
              <td>
                <CheckmarkMIcon className="icon-check" />
              </td>
              <td>
                <CheckmarkMIcon className="icon-check" />
              </td>
              <td>
                <CrossMWhiteIcon className="icon-cross" />
              </td>
            </tr>
            <tr>
              <td>Стоимость</td>
              <td>
                <CrossMWhiteIcon className="icon-cross" />
              </td>
              <td>
                <CheckmarkMIcon className="icon-check" />
              </td>
              <td>
                <CheckmarkMIcon className="icon-check" />
              </td>
            </tr>
          </tbody>
        </table>
        <button className="close-btn" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default ComparisonModal;
