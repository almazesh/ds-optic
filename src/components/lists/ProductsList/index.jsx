import { setModal, setModalType } from '../../../store/slices/modalSlice';
import { useGetProductsQuery } from '../../../store/query/productQuery';
import { useGetStoresQuery } from '../../../store/query/storesQuery';
import { useDispatch, useSelector } from 'react-redux';
import { modalTypes, userStatus } from '../../../constants';
import { AiOutlineFolder } from 'react-icons/ai'
import cls from './productList.module.scss';

const ProductsList = () => {
  const dispatch = useDispatch()
  const { status } = useSelector(state => state.user)

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

  console.log(storeData)

  return (
    <div className={cls['table']}>
      {status === userStatus.OWNER ? 
        <>
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
            
            <div className={cls['table-rest']}>
              <span>Остатки</span>
            </div>
          </div>
          {storeData?.results?.map(item => (
            <div key={item.id} className={cls['table-item']}>
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