import { setModal, setModalType } from '../../store/slices/modalSlice';
import cls from './createProduct.module.scss';
import { AiOutlineDown } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { GoPlus } from 'react-icons/go';
import { Switch } from 'antd';
import { modalTypes } from '../../constants';

const CreateProduct = () => {
  const dispatch = useDispatch()

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const openAltModal = (type) => {
    dispatch(setModalType(type))
  } 

  return (
    <div className={cls['create-product']}>
      <div className={cls['create-product-header']}>
        <button className={cls['create-product-save']}>Сохранить</button>
        <button onClick={() => dispatch(setModal())} className={cls['create-product-exit']}><GoPlus/></button>
      </div>  
      <div className={cls['create-product-wrapper']}>
        <div className={cls['create-product-body']}>
          <div className={cls['create-product-description']}>
            <button onClick={() => openAltModal(modalTypes.CREATE_PRODUCT_TYPE)}>Основные</button>
            <button onClick={() => openAltModal(modalTypes.CREATE_PRODUCT_ALT_TYPE)}>Дополнительные</button>
          </div>
          <div className={cls['create-product-services']}>
            <div id={cls['active-service']} className={cls['create-product-services__child']}>
              <h3>Товар</h3>
              <span></span>
              <p>Продукт, имеющий остаток, который необходимо восполнять</p>
            </div>
            <div className={cls['create-product-services__child']}>
              <h3>Услуга</h3>
              <span></span>
              <p>Продукт, не имеющий остатка на складе</p>
            </div>
            <div className={cls['create-product-services__child']}>
              <h3>Комплект</h3>
              <span></span>
              <p>Продукт, состоящий из нескольких других</p>
            </div>
          </div>
          <div className={cls['create-product-info']}>
            <h3 className={cls['create-product-info-title']}>Основная информация</h3>
            <div className={cls['create-product-info-full-input']}>
              <p>Наименование</p>
              <input type="text" />
            </div>
            <div className={cls['create-product-info-group']}>
              <div>
                <p>Код товара</p>
                <input placeholder='00005' type="text" />
              </div>
              <div>
                <p>Штрих-код (Сгенерировать)</p>
                <input placeholder='Введите штрих-код' type="text" />
              </div>
              <div>
                <p>Артикул</p>
                <input placeholder='Введите артикул' type="text" />
              </div>
            </div>
            <div className={cls['create-product-info-upload']}>
              <label className={cls['input-file']}>
                <input
                  accept="image/png, image/jpeg"
                  // onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  name="file"
                />
                <span className={cls['input-file-btn']}>
                  <p>Выберите фото для загрузки</p>
                  или перетащите его мышью
                </span>
              </label>
            </div>
            <div className={cls['create-product-info-full-input']}>
              <p>Категории</p>
              <input type="text" placeholder='Выберите из списка или введите новую и нажмите Enter' />
            </div>
            <div className={cls['create-product-info-zip']}>
              <h4>Единица измерения</h4>
              <div className={cls['create-product-info-changer']}>
                <input type="text" />
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
              <textarea></textarea>
            </div>
            <div className={cls['create-product-info-country']}>
              <h3>Страна</h3>
              <label>
                <input placeholder='поиск' type="text" />
                <button>
                  <AiOutlineDown/>
                </button>
              </label>
            </div>  
            <div className={cls['create-product-info-line']}></div>
            <div className={cls['create-product-info-prices']}>
              <h3>Цены</h3>
              <div className={cls['create-product-info-wrapper']}>
                <div>
                  <p>Цена закупки</p>
                  <label>
                    <input type="number" placeholder='0'/>
                    <button>сом</button>
                  </label>
                </div>
                <div>
                  <p>Наценка</p>
                  <label>
                    <input type="number" placeholder='0'/>
                    <button>%</button>
                  </label>
                </div>
                <div>
                  <p>Цена продажи</p>
                  <label>
                    <input type="number" placeholder='0'/>
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
                <input placeholder='0' type="number" />
                <button>
                  %
                </button>
              </label>
            </div>
            <div className={cls['create-product-info-nalog']}>
              <h3>Налоги</h3>

              <div>
                <input type='text'/>
                <Switch onChange={onChange} />
                <p>Не облагается налогом</p>
              </div>
            </div> 
            <div className={cls['create-product-info-nsp']}>
              <h3>НСП</h3>
              <input type="text" />
            </div> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct