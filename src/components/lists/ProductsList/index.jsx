import { setModal, setModalType } from '../../../store/slices/modalSlice';
import { useGetProductsQuery } from '../../../store/query/productQuery';
import { useGetStoresQuery } from '../../../store/query/storesQuery';
import { useDispatch, useSelector } from 'react-redux';
import { modalTypes, userStatus } from '../../../constants';
import { AiOutlineFolder } from 'react-icons/ai'
import cls from './productList.module.scss';
import React from 'react';
import { axiosInstance } from '../../../axios';

const ProductsList = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const dispatch = useDispatch()
  const { status } = useSelector(state => state.user)
  const [getGroup, setGetGroup] = React.useState([])
  const [getCategories, setGetCategories] = React.useState([])
  const [render, setRender] = React.useState('text')
  const [showGroups, setShowGroups] = React.useState(null)
  const [showCategories, setShowCategories] = React.useState(null)
  const [showProducts, setShowProducts] = React.useState(null)

  const modalHandler = () => {
    dispatch(setModal(true))
    dispatch(setModalType(modalTypes.EDIT_PRODUCT_TYPE))
  }

  const { data: productData } = useGetProductsQuery({
    token: localStorage.getItem('accessToken'),
  })

  const { data: storeData } = useGetStoresQuery({
    token: localStorage.getItem('accessToken'),
  })

  React.useEffect(() => {
    axiosInstance.get('/products/groups/')
      .then(res => setGetGroup(res.data))
  }, [render])  

  React.useEffect(() => {
    axiosInstance.get('/products/categories/')
      .then(res => setGetCategories(res.data))
  }, [render]) 

  const handleShowGroups = (storeId) => {
    if(!storeId) return;
    setCurrentIndex(1)
    const filtered = getGroup?.results?.filter(i => i?.branch === +storeId)
    setShowGroups(filtered)
  }

  const handleShowCategories = (groupId) => {
    if(!groupId) return;
    setCurrentIndex(2)
    const filtered =
       getCategories?.results?.filter(i => i?.group === +groupId)
    setShowCategories(filtered)
  }

  const handleShowGoods = (categoryId) => {
    if(!categoryId) return;
    setCurrentIndex(3)
    const filtered =
       productData?.results?.filter(i => i?.category === +categoryId)
    setShowProducts(filtered)

  }


  console.log(productData)

  return (
    <div className={cls['table']}>
      {status === userStatus.OWNER ? 
        <>
          {
            currentIndex === 0 && (
              <React.Fragment>
                <div className={cls['table-head']}>
                  <div className={cls['table-head-checkbox']}>
                    <span></span>
                  </div>
                  <div id={cls['no-hover']} className={cls['table-naming']}>
                    <span>Наименование магазина</span>
                  </div>
                  <div className={cls['table-code']}>
                    <span>код</span>
                  </div>
                  <div className={cls['table-article']}>
                    <span>Артикул</span>
                  </div>
                  <div className={cls['table-changer']}>
                    <span>Ед. изм.</span>
                  </div>
                  <div className={cls['table-price']}>
                    <span>Цена продажи</span>
                  </div>
                  <div className={cls['table-discount']}>
                    <span>Скидка, %</span>
                  </div>
                  <div className={cls['table-rest']}>
                    <span>Остатки</span>
                  </div>
                </div>
                {storeData?.results?.map(item => (
                  <div onClick={() => handleShowGroups(item?.id)} key={item.id} className={cls['table-item']}>
                    <div className={cls['table-head-checkbox']}>
                      <span></span>
                    </div>
                    <div id={cls['item-naming']} className={cls['table-naming']}>
                      <p><AiOutlineFolder/> {item.name}</p>
                    </div>
                    <div className={cls['table-code']}>
                      {item.code_of_good}
                    </div>
                    <div className={cls['table-article']}>
                    </div>
                    <div className={cls['table-changer']}>
                    </div>
                    <div className={cls['table-price']}>
                    </div>
                    <div className={cls['table-discount']}>
                    </div>
                    <div className={cls['table-store']}>
                    </div>
                    <div className={cls['table-rest']}>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            )
          }

          {
            currentIndex === 1 && (
              <React.Fragment>
                <div className={cls['table-head']}>
                  <div className={cls['table-head-checkbox']}>
                    <span></span>
                  </div>
                  <div id={cls['no-hover']} className={cls['table-naming']}>
                    <span>Наименование групп</span>
                  </div>
                  <div className={cls['table-code']}>
                    <span>код</span>
                  </div>
                  <div className={cls['table-article']}>
                    <span>Артикул</span>
                  </div>
                  <div className={cls['table-changer']}>
                    <span>Ед. изм.</span>
                  </div>
                  <div className={cls['table-price']}>
                    <span>Цена продажи</span>
                  </div>
                  <div className={cls['table-discount']}>
                    <span>Скидка, %</span>
                  </div>
                  <div className={cls['table-rest']}>
                    <span>Остатки</span>
                  </div>
                </div>

                {
                  showGroups && showGroups?.map((item) => (
                    <div onClick={() => handleShowCategories(item?.id)} key={item.id} className={cls['table-item']}>
                      <div className={cls['table-head-checkbox']}>
                        <span></span>
                      </div>
                      <div id={cls['item-naming']} className={cls['table-naming']}>
                        <p><AiOutlineFolder/> {item.name}</p>
                      </div>
                      <div className={cls['table-code']}>
                        {item.code_of_good}
                      </div>
                      <div className={cls['table-article']}>
                      </div>
                      <div className={cls['table-changer']}>
                      </div>
                      <div className={cls['table-price']}>
                      </div>
                      <div className={cls['table-discount']}>
                      </div>
                      <div className={cls['table-store']}>
                      </div>
                      <div className={cls['table-rest']}>
                      </div>
                    </div>
                  ))
                }

              </React.Fragment>
            )
          }

          {
            currentIndex === 2 && (
              <React.Fragment>
                <div className={cls['table-head']}>
                  <div className={cls['table-head-checkbox']}>
                    <span></span>
                  </div>
                  <div id={cls['no-hover']} className={cls['table-naming']}>
                    <span>Наименование категории</span>
                  </div>
                  <div className={cls['table-code']}>
                    <span>код</span>
                  </div>
                  <div className={cls['table-article']}>
                    <span>Артикул</span>
                  </div>
                  <div className={cls['table-changer']}>
                    <span>Ед. изм.</span>
                  </div>
                  <div className={cls['table-price']}>
                    <span>Цена продажи</span>
                  </div>
                  <div className={cls['table-discount']}>
                    <span>Скидка, %</span>
                  </div>
                  <div className={cls['table-rest']}>
                    <span>Остатки</span>
                  </div>
                </div>

                {
                  showCategories && showCategories?.map((item) => (
                    <div onClick={() => handleShowGoods(item?.id)} key={item.id} className={cls['table-item']}>
                      <div className={cls['table-head-checkbox']}>
                        <span></span>
                      </div>
                      <div id={cls['item-naming']} className={cls['table-naming']}>
                        <p><AiOutlineFolder/> {item.name}</p>
                      </div>
                      <div className={cls['table-code']}>
                        {item.code_of_good}
                      </div>
                      <div className={cls['table-article']}>
                      </div>
                      <div className={cls['table-changer']}>
                      </div>
                      <div className={cls['table-price']}>
                      </div>
                      <div className={cls['table-discount']}>
                      </div>
                      <div className={cls['table-store']}>
                      </div>
                      <div className={cls['table-rest']}>
                      </div>
                    </div>
                  ))
                }
              </React.Fragment>
            )
          }

          {
            currentIndex === 3 && (
              <React.Fragment>
                <div className={cls['table-head']}>
                  <div className={cls['table-head-checkbox']}>
                    <span></span>
                  </div>
                  <div id={cls['no-hover']} className={cls['table-naming']}>
                    <span>Наименование товара</span>
                  </div>
                  <div className={cls['table-code']}>
                    <span>код</span>
                  </div>
                  <div className={cls['table-article']}>
                    <span>Артикул</span>
                  </div>
                  <div className={cls['table-changer']}>
                    <span>Ед. изм.</span>
                  </div>
                  <div className={cls['table-price']}>
                    <span>Цена продажи</span>
                  </div>
                  <div className={cls['table-discount']}>
                    <span>Скидка, %</span>
                  </div>
                  <div className={cls['table-rest']}>
                    <span>Остатки</span>
                  </div>
                </div>

                {
                  showProducts && showProducts?.map((item) => (
                    <div  key={item.id} className={cls['table-item']}>
                      <div className={cls['table-head-checkbox']}>
                        <span></span>
                      </div>
                      <div id={cls['item-naming']} className={cls['table-naming']}>
                        <p>
                          <img src={item?.image} alt=''/>
                          {item?.name}
                        </p>
                      </div>
                      <div className={cls['table-code']}>
                        {item?.code_of_good}
                      </div>
                      <div className={cls['table-article']}>
                        {item?.articul}
                      </div>
                      <div className={cls['table-changer']}>
                        {item?.unit}
                      </div>
                      <div className={cls['table-price']}>
                        {item?.purchase_price}
                      </div>
                      <div className={cls['table-discount']}>
                        {item?.discount}
                      </div>
                      <div className={cls['table-store']}>
                        
                      </div>
                      <div className={cls['table-rest']}>
                      </div>
                    </div>
                  ))
                }
              </React.Fragment>
            )
          }
        </> : <>
          <div className={cls['table-head']}>
            <div className={cls['table-head-checkbox']}>
              <span></span>
            </div>
            <div id={cls['no-hover']} className={cls['table-naming']}>
              <span>Наименование</span>
            </div>
            <div className={cls['table-code']}>
              <span>код</span>
            </div>
            <div className={cls['table-article']}>
              <span>Артикул</span>
            </div>
            <div className={cls['table-changer']}>
              <span>Ед. изм.</span>
            </div>
            <div className={cls['table-price']}>
              <span>Цена продажи</span>
            </div>
            <div className={cls['table-discount']}>
              <span>Скидка, %</span>
            </div>
            <div className={cls['table-store']}>
              <span>Beta 2</span>
            </div>
            <div className={cls['table-rest']}>
              <span>Остатки</span>
            </div>
          </div>
          {productData?.results.map(item => (
            <div key={item.id} className={cls['table-item']}>
              <div className={cls['table-head-checkbox']}>
                <span></span>
              </div>
              <div onClick={modalHandler} id={cls['item-naming']} className={cls['table-naming']}>
                <p><AiOutlineFolder/> {item.name}</p>
              </div>
              <div className={cls['table-code']}>
                {item.code_of_good}
              </div>
              <div className={cls['table-article']}>
              </div>
              <div className={cls['table-changer']}>
              </div>
              <div className={cls['table-price']}>
              </div>
              <div className={cls['table-discount']}>
              </div>
              <div className={cls['table-store']}>
              </div>
              <div className={cls['table-rest']}>
              </div>
            </div>
          ))}
          {/* <div id={cls['item-active']} className={cls['table-item']}>
            <div className={cls['table-head-checkbox']}>
              <span></span>
            </div>
            <div id={cls['item-naming']} className={cls['table-naming']}>
              <p><AiOutlineFolder/> Lorem ipsum dolor sit amet.</p>
            </div>
            <div className={cls['table-code']}>
            </div>
            <div className={cls['table-article']}>
            </div>
            <div className={cls['table-changer']}>
            </div>
            <div className={cls['table-price']}>
            </div>
            <div className={cls['table-discount']}>
            </div>
            <div className={cls['table-store']}>
            </div>
            <div className={cls['table-rest']}>
            </div>
          </div>
          <div id={cls['item-active']} className={cls['table-item']}>
            <div className={cls['table-head-checkbox']}>
              <span></span>
            </div>
            <div id={cls['item-naming']} className={cls['table-naming']}>
              <p><AiOutlineFolder/> Lorem ipsum dolor sit amet.</p>
            </div>
            <div className={cls['table-code']}>
            </div>
            <div className={cls['table-article']}>
            </div>
            <div className={cls['table-changer']}>
            </div>
            <div className={cls['table-price']}>
            </div>
            <div className={cls['table-discount']}>
            </div>
            <div className={cls['table-store']}>
            </div>
            <div className={cls['table-rest']}>
            </div>
          </div> */}
        </>
      }
    </div>
  )
}

export default ProductsList