import React from 'react';
import '../styles/EventProgram.css'

export default () => {
  return (
    <div className="event-program">
      <div className="event-program-block">
        <div className="event-program-subtitle">Презентация достижений</div>
        <ul className="event-program-list">
          <li className="event-program-item">16:30 Welcome фуршет (кухня)</li>
          <li className="event-program-item">17:00 Презентация (митинговая)</li>
        </ul>
      </div>
      <div className="event-program-block">
        <div className="event-program-subtitle">Игра по станциям</div>
        <ul className="event-program-list">
          <li className="event-program-item">
            18:30 Разбиение по командам (митинговая)
          </li>
          <li className="event-program-item">18:40 начало игры</li>
          <li className="event-program-item">
            19:50 окончание игры (митинговая)
          </li>
          <li className="event-program-item">20:00 Подведение результатов</li>
        </ul>
      </div>
      <div className="event-program-block">
        <div className="event-program-subtitle">Прочие развлечения</div>
        <ul className="event-program-list">
          <li className="event-program-item">20:10 Лучший костюм</li>
          <li className="event-program-item">20:20 Тайный санта</li>
          <li className="event-program-item">20:25 Обналичка опционов</li>
          <li className="event-program-item">
            20:30 Еда закуски торт + начинают работать все остальные развлечения
            (бар и тп) + свободное перемещение
          </li>
          <li className="event-program-item">21:30 Аукцион на баллы</li>
          <li className="event-program-item">22:00 Окончание, афтерпати</li>
        </ul>
      </div>
    </div>
  );
};
