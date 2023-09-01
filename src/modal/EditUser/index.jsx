import { setModal } from '../../store/slices/modalSlice'
import { useDispatch } from 'react-redux'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import cls from './editUser.module.scss'
import { GrClose } from 'react-icons/gr'
import { useState } from 'react'

const EditUser = () => {
  const [type, setType] = useState({
    currentType: false,
    newType: false,
  })
  const dispatch = useDispatch()

  return (
    <div className={cls['edit']}>
      <div className={cls['edit-head']}>
        <button 
          className={cls['edit-editBtn']}>Сохранить</button>
        <button onClick={() => dispatch(setModal(false))} className={cls['edit-closer']}><GrClose/></button>
      </div>
      <div className={cls['edit-body']}>
        <h3 className={cls['edit-title']}>Редактирование профиля</h3>
        <div className={cls['edit-input']}>
          <p>Наименование <span>*</span></p>
          <input type="text" />
        </div>
        <div className={cls['edit-upload']}>
          <h3>Фотография</h3>
          <label className={cls['input-file']}>
            <input
              accept="image/png, image/jpeg"
              // onChange={(e) => setFile(e.target.files[0])}
              type="file"
              name="file"
            />
            <span className={cls['input-file-btn']}>
              <p>Выберите фото для загрузки</p>
              или перетащите его мышью
            </span>
          </label>
        </div>
        <div className={cls['edit-input']}>
          <p>Email <span>*</span></p>  
          <input type="email" />
        </div>
        <div className={cls['edit-input']}>
          <p>Телефон</p>
          <input type="text" />
        </div>
        <div className={cls['edit-line']}>
          <span>новый пароль</span>
        </div>
        <div className={cls['edit-input']}>
          <p>Текущий пароль</p>
          <label>
            <input type={type.currentType ? 'password' : 'text'}  />
            <span 
              onClick={() => setType((prev) => ({...prev, currentType: !type.currentType}))}>
              {type.currentType ? <FaRegEye/> : <FaRegEyeSlash/>}</span>
          </label>
        </div>
        <div className={cls['edit-input']}>
          <p>Новый пароль</p>
          <label>
            <input type={type.newType ? 'password' : 'text'}  />
            <span onClick={() => setType((prev) => ({...prev, newType: !type.newType}))}>{type.newType ? <FaRegEye/> : <FaRegEyeSlash/>}</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default EditUser