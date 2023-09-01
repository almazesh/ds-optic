import { setModal } from '../../store/slices/modalSlice';
import cls from './editStore.module.scss';
import { useDispatch } from 'react-redux';
import { GoPlus } from 'react-icons/go'
import { Switch } from 'antd';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useGetStoresQuery } from '../../store/query/storesQuery';

const schema = yup.object().shape({
  name: yup.string().required(),
  taxes: yup.string().required(),
  address: yup.string().required(),
  description: yup.string().required(),
});

const EditStore = () => {
  const dispatch = useDispatch()

  const modalCloser = () => {
    dispatch(setModal())
  }

  const {
    handleSubmit,
    formState: { errors, isValid },
    register,
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const createStoreHandler = (e) => {
    console.log(e);
  } 

  const { data } = useGetStoresQuery({
    token: localStorage.getItem('accessToken'),
  })

  return (
    <div className={cls['store']}>
      <div className={cls['store-head']}>
        <button   
          type='submit' 
          className={cls[isValid ? 'active_btn' : '']} 
          onClick={handleSubmit(createStoreHandler)}
        >Сохранить</button>
        <button onClick={modalCloser}><GoPlus/></button>
      </div>

      <div className={cls['store-body']}>
        <h3 className={cls['store-title']}>Редактирование магазина</h3>

        <form>
          <div className={cls['store-full-input']}>
            <h3>Наименование <span>*</span></h3>
            <input type="text" {...register('name')} />
          </div>
          <div className={cls['store-half-input']}>
            <h3>Налоги</h3>
            <input type="text" {...register('taxes')} />
          </div>
          <div className={cls['store-textarea']}>
            <h3>Адрес</h3>
            <textarea {...register('address')}></textarea>
          </div>
          <div className={cls['store-textarea']}>
            <h3>Описание</h3>
            <textarea {...register('description')}></textarea>
          </div>
          <div className={cls['store-toggle']}>
            <label>
              <Switch />
              <span>По умолчанию</span>
            </label>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditStore