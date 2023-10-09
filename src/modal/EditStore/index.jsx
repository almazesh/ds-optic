import { setModal } from '../../store/slices/modalSlice';
import cls from './editStore.module.scss';
import { useDispatch } from 'react-redux';
import { GoPlus } from 'react-icons/go'
import { Switch } from 'antd';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useGetStoresQuery } from '../../store/query/storesQuery';
import { axiosInstance } from '../../axios';
import React, { useState } from 'react';

const schema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string(),
  description: yup.string(),
});

const EditStore = () => {
  const dispatch = useDispatch()

  const [taxes, setTaxes] = useState({
    taxesValue: 'Налоги',
    taxesObject: {},
    isTaxes: false,
  })
  const [getTaxes, setGetTaxes] = useState({})

  React.useEffect(() => {
    axiosInstance.get('/settings/taxes').then(res => setGetTaxes(res.data))
  }, [])


  const modalCloser = () => {
    dispatch(setModal())
  }

  const id = +localStorage.getItem('storeId')

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


  const { data, refetch } = useGetStoresQuery({
    token: localStorage.getItem('accessToken'),
  })

  const createStoreHandler = async (e) => {

    const base = {
      ...e,
      taxes: Number(taxes?.taxesObject?.id),
    }

    try {
      await axiosInstance.put(`/branches/branches/${id}/`, base)
      modalCloser()
      refetch()
      window.location.reload()
    } catch (e) {
      console.log(e)
    }

  } 


  const handleTaxes = (val) => {
    setTaxes((prev) => ({...prev, taxesObject: val , taxesValue: val?.taxes, isTaxes: !taxes.isTaxes}))
  }


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
            <div>
              <span onClick={() => setTaxes((prev) => ({...prev, isTaxes: !taxes.isTaxes}))}>{taxes.taxesValue}</span>
              {taxes.isTaxes &&  <ul className={cls['drop']}>
                {
                  getTaxes?.results?.map((item, i) => 
                    <p key={i} onClick={() => handleTaxes(item)}>{item.taxes}</p>)
                }
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

export default EditStore