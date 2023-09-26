import { setModal } from '../../store/slices/modalSlice';
import cls from './createStore.module.scss';
import { useDispatch } from 'react-redux';
import { GoPlus } from 'react-icons/go'
import { Switch } from 'antd';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useCreateStoreMutation } from '../../store/query/storesQuery';
import React, { useState } from 'react';
import { axiosInstance } from '../../axios';

const schema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  description: yup.string().required(),
});



const CreateStore = () => {
  const [file, setFile] = React.useState({})

  const dispatch = useDispatch()
  const [taxes, setTaxes] = useState({
    taxesValue: 'Налоги',
    isTaxes: false,
  })
  const [getTaxes, setGetTaxes] = useState({})

  const modalCloser = () => {
    dispatch(setModal())
  }

  React.useEffect(() => {
    axiosInstance.get('/settings/taxes').then(res => setGetTaxes(res.data))
  }, [])

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

  const createStoreHandler = async (e) => {
    try {
      const formData = new FormData()

      formData.append('name', e.name)
      formData.append('taxes', +taxes.taxesValue)
      formData.append('address', e.address)
      formData.append('description', e.description)
      formData.append('image', file)



      await createStore({
        token: localStorage.getItem('accessToken'),
        data: formData,
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
                {
                  getTaxes?.results?.map((item, i) => 
                    <p key={i} onClick={() => handleTaxes(item?.id)}>{item.taxes}</p>)
                }
              </ul>}
            </div>
          </div>
          <div className={cls['store-body-upload']}>
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