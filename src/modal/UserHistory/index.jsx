import { setModal, setModalType } from '../../store/slices/modalSlice';
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { BsChevronDown } from 'react-icons/bs'
import { HiOutlineMail } from 'react-icons/hi'
import { modalTypes } from '../../constants';
import cls from './userHistory.module.scss';
import { useDispatch } from 'react-redux';
import { GrClose } from 'react-icons/gr'
import { useState } from 'react';

const UserHistory = () => {
  const [drop, setDrop] = useState({
    firstDrop: false,
    secondDrop: false,
  })

  const dispatch = useDispatch()

  return (
    <div className={cls['history']}>
      <div className={cls['history-head']}>
        <button 
          onClick={() => dispatch(setModalType(modalTypes.USER_EDIT_TYPE))} 
          className={cls['history-editBtn']}>Редактировать</button>
        <button onClick={() => dispatch(setModal(false))} className={cls['history-closer']}><GrClose/></button>
      </div>
      <div className={cls['history-body']}>
        <div className={cls['history-user']}>
          <div className={cls['history-info']}>
            <h3>Asad Halmatov</h3>
            <span>Владелец</span>
          </div>
          <p>Создан 14 января</p>
          <div className={cls['history-links']}>
            <label>
              <HiOutlineMail/>
              <span>buckaroonanzai@gmail.com</span>
            </label>
          </div>
        </div>
        <div className={cls['history-line']}>
          <span>последние операции</span>
        </div>
        <h1 className={cls['history-title']}>15 января</h1>
        <div className={cls['history-drop']}>
          <div className={cls['history-drop-head']}>
            <div className={cls['history-drop-handler']}>
              <div>
                <span></span>
                <p>Продажа #1</p>
              </div>
              <h3>200.00 сом</h3>
            </div>
            <div className={cls['history-drop-info']}>
              <p>Магазин <span>ДОмашний</span></p>
              <b><span>Asad Halmatov</span>15 января 23:06</b>
            </div>
          </div>
          <div id={cls[drop.firstDrop ? 'active_drop' : '']} className={cls['history-drop-body']}>
            <div onClick={() => setDrop((prev) => ({...prev, firstDrop: !drop.firstDrop}))} className={cls['history-drop-body-handler']}>
              <span><AiOutlineCheckCircle/> Документ оплачен</span>
              <button><BsChevronDown/></button>
            </div>
            {drop.firstDrop && (
              <div className={cls['history-drop-body-list']}>
                <div className={cls['history-drop-body-list-child']}>
                  <div>
                    #
                  </div>
                  <div>
                  Счёт
                  </div>
                  <div>
                  Контрагент
                  </div>
                  <div>
                  Дата
                  </div>
                  <div>
                  Сумма
                  </div>
                </div>  
                <div className={cls['history-drop-body-list-child']}>
                  <div className={cls['baller']}>
                    1
                  </div>
                  <div>
                    <span>№1</span>
                  </div>
                  <div>
                    <span>asad</span>
                  </div>
                  <div>
                  Дата
                  </div>
                  <div>
                  Сумма
                  </div>
                </div>  
              </div>
            )}
          </div>
          <div id={cls[drop.secondDrop ? 'active_drop' : '']} className={cls['history-drop-footer']}>
            <div onClick={() => setDrop((prev) => ({...prev, secondDrop: !drop.secondDrop}))} className={cls['history-drop-footer-handler']}>
              <span>1 позиция</span>
              <button><BsChevronDown/></button>
            </div>
            {drop.secondDrop && (
              <div className={cls['history-drop-footer-list']}>
                <div className={cls['history-drop-footer-list-child']}>
                  <div>
                    Наименование
                  </div>
                  <div>
                    Кол-во
                  </div>
                  <div>
                    Цена
                  </div>
                  <div>
                    Итог
                  </div>
                </div>
                <div className={cls['history-drop-footer-list-child']}>
                  <div>
                    <span>Очки</span>
                  </div>
                  <div>
                    1
                  </div>
                  <div>
                    200.00
                  </div>
                  <div>
                    200.00
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserHistory