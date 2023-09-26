import { setModal } from '../../store/slices/modalSlice';
import cls from './createCategory.module.scss';
import { useDispatch } from 'react-redux';
import { GrClose } from 'react-icons/gr'
import React, { useState } from 'react';
import { axiosInstance } from '../../axios';
import { useForm } from 'react-hook-form';

const CreateCategory = () => {
  const dispatch = useDispatch()
  const [getGroup, setGetGroup] = React.useState([])
  

  const [store, setStore] = useState({
    storeValue: 'Группы',
    storeObject: {},
    isStore: false,
  })

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onSubmit',
  })

  React.useEffect(() => {
    axiosInstance.get('/products/groups/')
      .then(res => setGetGroup(res.data))
  }, [])  

  const handleStore = (val) => {
    setStore((prev) => ({...prev, storeValue: val?.name, storeObject: val , isStore: !store.isStore}))
  }

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      group: store?.storeObject?.id,
    }
    try {
      await axiosInstance.post('/products/categories/', newData)
      dispatch(setModal(false))
      reset()
      window.location.reload()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={cls['group']}>
      <div className={cls['group-head']}>
        <button onClick={handleSubmit(onSubmit)}>Сохранить</button>
        <button onClick={() => dispatch(setModal(false))}><GrClose/></button>
      </div>
      <div className={cls['group-body']}>
        <div>
          <h3>Наименование категории</h3>
          <input type="text" {...register('name')}/>
        </div>
        <div className={cls['stores']}>
          <p>Группы <button>?</button></p>
          <div>
            <span onClick={() => setStore((prev) => ({...prev, isStore: !store.isStore}))}>
              {store.storeValue}
            </span>
            {store.isStore &&  <ul className={cls['drop']}>
              {
                getGroup?.results?.map((item, i) => 
                  <p key={i} onClick={() => handleStore(item)}>{item.name}</p>)
              }
            </ul>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateCategory