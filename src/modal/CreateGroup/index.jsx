import { setModal } from '../../store/slices/modalSlice';
import cls from './createGroup.module.scss';
import { useDispatch } from 'react-redux';
import { GrClose } from 'react-icons/gr'
import { useState } from 'react';
import { useGetStoresQuery } from '../../store/query/storesQuery';
import { axiosInstance } from '../../axios';
import { useForm } from 'react-hook-form';

const CreateGroup = () => {
  const dispatch = useDispatch()
  const [store, setStore] = useState({
    storeValue: 'Магазины',
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

  const { data: StoreData, isLoading, refetch } = useGetStoresQuery({token: localStorage.getItem('accessToken')})

  const handleStore = (val) => {
    setStore((prev) => ({...prev, storeValue: val?.name, storeObject: val , isStore: !store.isStore}))
  }

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      branch: store?.storeObject?.id,
    }
    try {
      await axiosInstance.post('/products/groups/', newData)
      dispatch(setModal(false))
      reset()
      refetch()
      window.location.reload()
    } catch (e) {
      console.log(e)
    }
    refetch()
  }

  return (
    <div className={cls['group']}>
      <div className={cls['group-head']}>
        <button onClick={handleSubmit(onSubmit)}>Сохранить</button>
        <button onClick={() => dispatch(setModal(false))}><GrClose/></button>
      </div>
      <div className={cls['group-body']}>
        <div>
          <h3>Наименование группы</h3>
          <input type="text" {...register('name')}/>
        </div>
        <div className={cls['stores']}>
          <p>Магазины <button>?</button></p>
          <div>
            <span onClick={() => setStore((prev) => ({...prev, isStore: !store.isStore}))}>
              {store.storeValue}
            </span>
            {store.isStore &&  <ul className={cls['drop']}>
              {
                StoreData?.results?.map((item, i) => 
                  <p key={i} onClick={() => handleStore(item)}>{item.name}</p>)
              }
            </ul>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateGroup