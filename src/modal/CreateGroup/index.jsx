import { setModal } from '../../store/slices/modalSlice';
import cls from './createGroup.module.scss';
import { useDispatch } from 'react-redux';
import { GrClose } from 'react-icons/gr'

const CreateGroup = () => {
  const dispatch = useDispatch()

  return (
    <div className={cls['group']}>
      <div className={cls['group-head']}>
        <button>Сохранить</button>
        <button onClick={() => dispatch(setModal(false))}><GrClose/></button>
      </div>
      <div className={cls['group-body']}>
        <div>
          <h3>Наименование</h3>
          <input type="text" />
        </div>
        <div>
          <h3>Родитель <span>(Очистить)</span></h3>
          <input type="text" placeholder='Выбрана группа: очки'/>
        </div>
      </div>
    </div>
  )
}

export default CreateGroup