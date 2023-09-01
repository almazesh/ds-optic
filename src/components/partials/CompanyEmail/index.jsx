import cls from './companyEmail.module.scss';
import { useState } from 'react';
import { Switch } from 'antd';

const CompanyEmail = () => {
  const [state, setState] = useState({
    isDrop: false,
  })
    
  return (
    <div className={cls['email']}>
      <h3 className={cls['email-head']}>Ежедневный отчет на электронную почту по продажам и складу.</h3>
      <label className={cls['email-link']}>
        <Switch/>
        <p>Рассылка включена</p>
      </label>
      <div className={cls['email-hour']}>
        <h3>Часовой пояс</h3>

        <div className={cls['email-drop']}>
          <div onClick={() => setState((prev) => ({...prev, isDrop: !state.isDrop}))} className={cls['email-drop-head']}>
            <span>Выберите</span>
          </div>
          {
            state.isDrop && <div className={cls['email-drop-list']}>
              <span>Часовой пояс</span>
              <p>(GMT-12:00) International Date Line West</p>
              <p>(GMT-12:00) International Date Line West</p>
            </div>
          }
        </div>
      </div>
      <button className={cls['email-saver']}>Сохранить</button>
    </div>
  )
}

export default CompanyEmail