import { setModal } from '../../store/slices/modalSlice'
import { useDispatch } from 'react-redux'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import cls from './editUser.module.scss'
import { GrClose } from 'react-icons/gr'
import { useState } from 'react'
import { axiosInstance } from '../../axios'
import { useForm } from 'react-hook-form'

const EditUser = () => {
  const [type, setType] = useState({
    currentType: false,
    newType: false,
  })
  const dispatch = useDispatch()

  const { handleSubmit, register } = useForm({
    mode: 'onSubmit',
  })

  const [file, setFile] = useState({})

  const modalCloser = () => {
    dispatch(setModal())
  }

  const id = +localStorage.getItem('userId')

  const editUserFunc = async (e) => {

    try {

      const formData = new FormData()

      formData.append('fullname', e.fullname)
      formData.append('email', e.email)
      formData.append('phone_number', e.phone_number)
      formData.append('password', e.password)
      formData.append('user_avatar', file)
      
      await axiosInstance.put(`/accounts/users/${id}/`, formData)

      modalCloser()
    } catch (e) {
      console.log(e)
    }

  } 

  return (
    <div className={cls['edit']}>
      <div className={cls['edit-head']}>
        <button 
          className={cls['edit-editBtn']} onClick={handleSubmit(editUserFunc)}>Сохранить</button>
        <button onClick={() => dispatch(setModal(false))} className={cls['edit-closer']}><GrClose/></button>
      </div>
      <div className={cls['edit-body']}>
        <h3 className={cls['edit-title']}  >Редактирование профиля</h3>
        <div className={cls['edit-input']}>
          <p>Наименование <span>*</span></p>
          <input type="text" {...register('fullname')}/>
        </div>
        <div className={cls['edit-upload']}>
          <h3>Фотография</h3>
          <label className={cls['input-file']}>
            <input
              accept="image/png, image/jpeg"
              onChange={(e) => setFile(e.target.files[0])}
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
          <input type="email" {...register('email')}/>
        </div>
        <div className={cls['edit-input']}>
          <p>Телефон</p>
          <input type="text" {...register('phone_number')}/>
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
            <input type={type.newType ? 'password' : 'text'}  {...register('password')}/>
            <span onClick={() => setType((prev) => ({...prev, newType: !type.newType}))}>{type.newType ? <FaRegEye/> : <FaRegEyeSlash/>}</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default EditUser