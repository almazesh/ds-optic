import { setModal } from '../../store/slices/modalSlice';
import cls from './createStore.module.scss';
import { useDispatch } from 'react-redux';
import { GoPlus } from 'react-icons/go'
import { Switch } from 'antd';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useCreateStoreMutation } from '../../store/query/storesQuery';
import { useState } from 'react';

const schema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  description: yup.string().required(),
});

const CreateStore = () => {
  const dispatch = useDispatch()
  const [taxes, setTaxes] = useState({
    taxesValue: 'налоги',
    isTaxes: false,
  })

  const modalCloser = () => {
    dispatch(setModal())
  }

  const {
    handleSubmit,
    formState: { isValid },
    register,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const [createStore, { data }] = useCreateStoreMutation()

  console.log(data);  

  const createStoreHandler = async (e) => {
    try {
      await createStore({
        token: localStorage.getItem('accessToken'),
        data: {...e, taxes: { taxes: taxes.taxesValue }},
      })

      reset()
      setTaxes('')
    } catch (error) {
      console.log(error);
    }
  } 

  const handleTaxes = (val) => {
    setTaxes((prev) => ({...prev, taxesValue: val, isTaxes: !taxes.isTaxes}))
  }

  return (
    <div className={cls['store']}>
      <div className={cls['store-head']}>
        <button   
          type='submit' 
          className={cls[isValid && taxes.taxesValue ? 'active_btn' : '']} 
          onClick={handleSubmit(createStoreHandler)}
        >Сохранить</button>
        <button onClick={modalCloser}><GoPlus/></button>
      </div>

      <div className={cls['store-body']}>
        <h3 className={cls['store-title']}>Создание магазина</h3>

        <form>
          <div className={cls['store-full-input']}>
            <h3>Наименование <span>*</span></h3>
            <input type="text" {...register('name')} />
          </div>
          <div className={cls['store-half-input']}>
            <h3>Налоги</h3>
            <div>
              <span onClick={() => setTaxes((prev) => ({...prev, isTaxes: !taxes.isTaxes}))}>{taxes.taxesValue}</span>
              {taxes.isTaxes &&  <ul className={cls['drop']}>
                <p onClick={() => handleTaxes('test 1')}>test 1</p>
                <p onClick={() => handleTaxes('test 2')}>test 2</p>
              </ul>}
            </div>
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

export default CreateStore