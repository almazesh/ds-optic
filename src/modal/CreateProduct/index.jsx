import { setModal, setModalType } from '../../store/slices/modalSlice';
import cls from './createProduct.module.scss';
import { AiOutlineDown } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { GoPlus } from 'react-icons/go';
import { Switch } from 'antd';
import { modalTypes } from '../../constants';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { useCreateProductMutation } from '../../store/query/productQuery';
import { useGetStoresQuery } from '../../store/query/storesQuery';
import { axiosInstance } from '../../axios';
import moment from 'moment';

const CreateProduct = () => {
  const { handleSubmit, register , reset } = useForm()
  const dispatch = useDispatch()
  const [type, setType] = useState('product')
  const [getTaxes, setGetTaxes] = useState({})
  const [getCategories, setGetCategories] = React.useState([])
  const [getGroup, setGetGroups] = React.useState([])
  const [render, setRender] = React.useState('text')
  const [getCountries, setGetCountries] = useState({})
  const [file, setFile] = React.useState({})
  const [store, setStore] = useState({
    storeValue: 'Магазины',
    storeObject: {},
    isStore: false,
  })

  const [category, setCategory] = useState({
    categoryValue: 'Категории',
    categorybject: {},
    isCategory: false,
  })

  const [group, setGroup] = useState({
    groupValue: 'Группы',
    groupObject: {},
    isGroup: false,
  })

  const [taxes, setTaxes] = useState({
    taxesValue: 'Налоги',
    taxObject: {},
    isTaxes: false,
  })

  const [ctry, setCtry] = useState({
    countryValue: 'Страна',
    countryObject: {},
    isCountry: false,
  })
  const [createProduct] = useCreateProductMutation()
  const { data, isLoading, refetch } = useGetStoresQuery({token: localStorage.getItem('accessToken')})

  React.useEffect(() => {
    axiosInstance.get('/settings/taxes').then(res => setGetTaxes(res.data))
    axiosInstance.get('/settings/countries/').then(res => setGetCountries(res.data))
  }, [])

  React.useEffect(() => {
    axiosInstance.get('/products/categories/')
      .then(res => setGetCategories(res.data))

    axiosInstance.get('/products/groups/')
      .then(res => setGetGroups(res.data))
  }, [render]) 

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const openAltModal = (type) => {
    dispatch(setModalType(type))
  } 

  const date = new Date()

  const handleCreate = async data => {

    const form = new FormData()

    form.append('name', data.name)
    form.append('articul', data.articul)
    form.append('category', +category?.categorybject?.id)
    form.append('code_of_good', data.code_of_good)
    form.append('country', +ctry?.countryObject?.id)
    form.append('description', data.description)
    form.append('discount', data.discount)
    form.append('expire', moment(date).format('YYYY-MM-DD'))
    form.append('image', file)
    form.append('markup', data.markup)
    form.append('material', 'blood')
    form.append('nsp', data.nsp)
    form.append('price', data.price)
    form.append('purchase_price', data.purchase_price)
    form.append('size', '12312312321')
    form.append('tax', taxes?.taxObject?.id)
    form.append('type', type)
    form.append('unit', data.unit)
    
    try {
      await createProduct({
        data: form,
        token: localStorage.getItem('accessToken'),
      })
    } catch (e) {
      console.log(e)
    }
    
  }

  const typeList = [
    {
      id:1,
      name:'Товар',
      key: 'product',
      description: 'Продукт, имеющий остаток, который необходимо восполнять',
    },
    {
      id:2,
      name:'Услуга',
      key: 'service',
      description: 'Продукт, не имеющий остатка на складе',
    },
    {
      id:3,
      name:'Комплект',
      key: 'complect',
      description: 'Продукт, состоящий из нескольких других',
    },
  ]

  const handleStore = (val) => {
    setStore((prev) => ({...prev, storeValue: val?.name, storeObject: val , isStore: !store.isStore}))
  }

  const handleCategory = (val) => {
    setCategory((prev) => ({...prev, categoryValue: val?.name, categorybject: val , isCategory: !category.isCategory}))
  }

  const handleGroup = (val) => {
    setGroup((prev) => ({...prev, groupValue: val?.name, groupObject: val , isGroup: !group.isGroup}))
  }

  const handleTaxes = (val) => {
    setTaxes((prev) => ({...prev, taxesValue: val?.taxes, taxObject:val, isTaxes: !taxes.isTaxes}))
  }

  const handleCountry = (val) => {
    setCtry((prev) => ({...prev, countryValue: val?.country, countryObject:val, isCountry: !ctry.isCountry}))
  }

  return (
    <div className={cls['create-product']}>
      <div className={cls['create-product-header']}>
        <button className={cls['create-product-save']} onClick={handleSubmit(handleCreate)}>Сохранить</button>
        <button onClick={() => dispatch(setModal())} className={cls['create-product-exit']}><GoPlus/></button>
      </div>  
      <div className={cls['create-product-wrapper']}>
        <div className={cls['create-product-body']}>
          <div className={cls['create-product-description']}>
            <button onClick={() => openAltModal(modalTypes.CREATE_PRODUCT_TYPE)}>Основные</button>
            <button onClick={() => openAltModal(modalTypes.CREATE_PRODUCT_ALT_TYPE)}>Дополнительные</button>
          </div>
          <div className={cls['create-product-services']}>
            {
              typeList.map(i => (
                <div 
                  key={i.id} 
                  onClick={() => setType(i.key)} 
                  id={i.key === type ? cls['active-service'] : null} 
                  className={cls['create-product-services__child']}
                >
                  <h3>{i.name}</h3>
                  <span></span>
                  <p>{i.description}</p>
                </div>
              ))
            }
          </div>
          <div className={cls['create-product-info']}>
            <h3 className={cls['create-product-info-title']}>Основная информация</h3>
            <div className={cls['create-product-info-full-input']}>
              <p>Наименование</p>
              <input type="text" {...register('name')}/>
            </div>
            <div className={cls['create-product-info-group']}>
              <div>
                <p>Код товара</p>
                <input placeholder='00005' type="text" {...register('code_of_good')}/>
              </div>
              <div>
                <p>Штрих-код (Сгенерировать)</p>
                <input placeholder='Введите штрих-код' type="text" {...register('barcode')}/>
              </div>
              <div>
                <p>Артикул</p>
                <input placeholder='Введите артикул' type="text" {...register('articul')}/>
              </div>
            </div>
            <div className={cls['create-product-info-upload']}>
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
            <div className={cls['stores']}>
              <p>Магазины <button>?</button></p>
              <div>
                <span onClick={() => setStore((prev) => ({...prev, isStore: !store.isStore}))}>{store.storeValue}</span>
                {store.isStore &&  <ul className={cls['drop']}>
                  {
                    data?.results?.map((item, i) => 
                      <p key={i} onClick={() => handleStore(item)}>{item.name}</p>)
                  }
                </ul>}
              </div>
            </div>
            <div className={cls['stores']}>
              <p>Группы <button>?</button></p>
              <div>
                <span onClick={() => setGroup((prev) => ({...prev, isGroup: !group.isGroup}))}>{group.groupValue}</span>
                {group.isGroup &&  <ul className={cls['drop']}>
                  {
                    getGroup?.results?.map((item, i) => 
                      <p key={i} onClick={() => handleGroup(item)}>{item.name}</p>)
                  }
                </ul>}
              </div>
            </div>
            <div className={cls['stores']}>
              <p>Категории <button>?</button></p>
              <div>
                <span onClick={() => setCategory((prev) => ({...prev, isCategory: !category.isCategory}))}>{category.categoryValue}</span>
                {category.isCategory &&  <ul className={cls['drop']}>
                  {
                    getCategories?.results?.map((item, i) => 
                      <p key={i} onClick={() => handleCategory(item)}>{item.name}</p>)
                  }
                </ul>}
              </div>
            </div>
            <div className={cls['create-product-info-zip']}>
              <h4>Единица измерения</h4>
              <div className={cls['create-product-info-changer']}>
                <input type="text" {...register('unit')} />
                <div>
                  <Switch onChange={onChange} />
                  <span>Весовой товар</span>
                </div>
              </div>
            </div>
            <div className={cls['create-product-info-pack']}>
              <button>Добавить упаковку</button>
            </div>
            <div className={cls['create-product-info-desc']}>
              <h3>Описание</h3>
              <textarea {...register('description')}></textarea>
            </div>
            <div className={cls['create-product-info-nalog']}>
              <h3>Страна</h3>
              <div>
                <span onClick={() => setCtry((prev) => ({...prev, isCountry: !ctry.isCountry}))}>
                  {
                    ctry.countryObject?.flag && (
                      <img 
                        src={`https://flagcdn.com/${ctry?.countryObject?.flag.toLowerCase()}.svg`}
                      />
                    )
                  }
                  {ctry.countryValue}
                </span>
                {ctry.isCountry &&  <ul className={cls['drop']}>
                  {
                    getCountries?.results?.map((item, i) => 
                      <p key={i} onClick={() => handleCountry(item)}>
                        {item.country}
                      </p>)
                  }
                </ul>}
              </div>
            </div>
            <div className={cls['create-product-info-line']}></div>
            <div className={cls['create-product-info-prices']}>
              <h3>Цены</h3>
              <div className={cls['create-product-info-wrapper']}>
                <div>
                  <p>Цена закупки</p>
                  <label>
                    <input {...register('purchase_price')} type="number" placeholder='0'/>
                    <button>сом</button>
                  </label>
                </div>
                <div>
                  <p>Наценка</p>
                  <label>
                    <input {...register('markup')} type="number" placeholder='0'/>
                    <button>%</button>
                  </label>
                </div>
                <div>
                  <p>Цена продажи</p>
                  <label>
                    <input {...register('price')} type="number" placeholder='0'/>
                    <button>сом</button>
                  </label>
                </div>
              </div>
            </div>
            <div className={cls['create-product-info-elem']}>
              <div>
                <Switch onChange={onChange} />
                <span>
                  <p>Товар по свободной цене</p>
                  <h3>Кассир при продаже может редактировать цену</h3>
                </span>
              </div>
              <div>
                <Switch onChange={onChange} />
                <span>
                  <p>Установить разные цены продажи в магазинах</p>
                  <h3>На кассах товар будет продаваться по цене магазина</h3>
                </span>
              </div>
            </div>
            <div className={cls['create-product-info-discount']}>
              <h3>Скидка</h3>
              <label>
                <input {...register('discount')} placeholder='0' type="number" />
                <button>
                  %
                </button>
              </label>
            </div>
            
            <div className={cls['create-product-info-nalog']}>
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
            <div className={cls['create-product-info-nsp']}>
              <h3>НСП</h3>
              <input {...register('nsp')} type="text" />
            </div> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct