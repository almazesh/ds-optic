import { FaChevronDown } from 'react-icons/fa'
import box from '../../../assets/box.svg'
import cls from './info.module.scss'
import { useState } from 'react'

const ProductInfo = () => {
  const [page, setPage] = useState(false)
  let content = ''

  if(!page){
    content = <>
      <div className={cls['info-drop']}>
        <div className={cls['info-drop-head']}>
          <p>Товар по свободной цене</p>
          <span><FaChevronDown/></span>
        </div>
        <div className={cls['info-drop-body']}>
          <p>Код товара <span>0001</span></p>
          <p>Штрих-код <span>0001</span></p>
          <p>Артикул <span>0001</span></p>
        </div>
      </div>
      <div className={cls['info-drop']}>
        <div id={cls['active']} className={cls['info-drop-head']}>
          <p>Группа товара</p>
          <span><FaChevronDown/></span>
        </div>
      </div>
      <div className={cls['info-drop']}>
        <div className={cls['info-drop-head']}>
          <p className={cls['info-drop-head-child']}>Цена <span>0,00 сом</span></p>
          <span><FaChevronDown/></span>
        </div>
        <div className={cls['info-drop-body']}>
          <p>Закупочная цена <span>0001</span></p>
          <p>Себестоимость <span>0001</span></p>
          <p>Наценка <span>0001</span></p>
          <p>Маржа <span>0001</span></p>
        </div>
      </div>
      <div className={cls['info-drop']}>
        <div id={cls['active']} className={cls['info-drop-head']}>
          <p>Цены по магазинам</p>
          <span><FaChevronDown/></span>
        </div>
      </div>
      <div className={cls['info-drop']}>
        <div id={cls['active']} className={cls['info-drop-head']}>
          <p>Единица измерения</p>
          <span><FaChevronDown/></span>
        </div>
        <div className={cls['info-drop-image']}>
          <span>Сделать фото или выбрать фото</span>
        </div>
      </div>
      <div className={cls['info-drop']}>
        <div id={cls['active']} className={cls['info-drop-head']}>
          <p>Скидка</p>
          <span><FaChevronDown/></span>
        </div>
      </div>
      <div className={cls['info-drop']}>
        <div id={cls['active']} className={cls['info-drop-head']}>
          <p>Срок годности</p>
          <span><FaChevronDown/></span>
        </div>
      </div>
      <div className={cls['info-drop']}>
        <div id={cls['active']} className={cls['info-drop-head']}>
          <p>Минимальный остаток</p>
          <span><FaChevronDown/></span>
        </div>
      </div>
      <div className={cls['info-drop']}>
        <div id={cls['active']} className={cls['info-drop-head']}>
          <p>Выбор поставщика</p>
          <span><FaChevronDown/></span>
        </div>
      </div>  
      <div className={cls['info-drop']}>
        <div className={cls['info-drop-head']}>
          <p>Остатки по магазинам</p>
          <span><FaChevronDown/></span>
        </div>
        <div className={cls['info-drop-body']}>
          <b>Всего<span>0</span></b>
          <p>По себестоимости <span>0001</span></p>
          <p>По цене продажи <span>0001</span></p>
          <b>Магазин<span>0</span></b>
        </div>
      </div>
      <div className={cls['info-drop']}>
        <div id={cls['active']} className={cls['info-drop-head']}>
          <p>Категории</p>
          <span><FaChevronDown/></span>
        </div>
      </div>  
      <div className={cls['info-drop']}>
        <div id={cls['active']} className={cls['info-drop-head']}>
          <p>Выбор страны/региона</p>
          <span><FaChevronDown/></span>
        </div>
      </div>  
      <div className={cls['info-drop']}>
        <div id={cls['active']} className={cls['info-drop-head']}>
          <p>Описание</p>
          <span><FaChevronDown/></span>
        </div>
      </div>  
    </>

  }else{
    content = <div className={cls['info-history']}>
      <p>Последние операции</p>
    </div>
  }

  return (
    <div className={cls['info']}>
      <div className={cls['info-head']}>
        <img src={box} alt="box" />
        <h3>Товар по свободной цене</h3>
      </div>
      <div className={cls['info-changer']}>
        <button onClick={() => setPage(false)} className={cls[!page ? 'active' : '']}>
          Детали
        </button>
        <button onClick={() => setPage(true)} className={cls[page ? 'active' : '']}>
          История
        </button>
      </div>
      {content}
    </div>
  )
}

export default ProductInfo