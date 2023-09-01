import { setModal, setModalType } from '../../../store/slices/modalSlice';
import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import { modalTypes } from '../../../constants';
import cls from './workersList.module.scss';
import { useDispatch } from 'react-redux';

const WorkersList = () => {
  const dispatch = useDispatch()

  const modalHandler = (type) => {
    dispatch(setModal(true))
    dispatch(setModalType(type))
  }

  return (
    <div className={cls['work']}>
      <div className={cls['work-wrapper']}>
        <div className={cls['work-info']}>
          <h3>Всего 1 сотрудник</h3>
          <span>
            <p>Владельцев: 1</p>
            <p>Управляющих: 0</p>
            <p>Кассиры: 0</p>
            <p>Кладовщиков: 0</p>
          </span>
        </div>
        <div className={cls['work-list']}>
          <div onClick={() => modalHandler(modalTypes.CREATE_ADMIN_TYPE)} className={cls['work-list-create']}>
            <span>Создать</span>
          </div>
          <div className={cls['work-list-child']}>
            <div onClick={() => modalHandler(modalTypes.USER_HISTORY_TYPE)} className={cls['work-list-head']}>
              <span></span>
              <div>
                <p>Asad Halmatov</p>
                <span>Владелец</span>
              </div>
            </div>
            <div className={cls['work-list-body']}>
              <span>
                <AiFillPhone/> 
                <p>+996700101010</p>
              </span>
              <span>
                <AiOutlineMail/> 
                <p>buckaroonanzai@gmail.com</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkersList