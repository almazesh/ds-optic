import { BsChevronDown } from 'react-icons/bs';
import cls from './companyTaxes.module.scss';
import { useState } from 'react';

const CompanyTaxes = () => {
  const [state, setState] = useState({
    isDrop: false,
    dropValue: 'Налог включён в цену товара',
  })

  const dropHandler = (value) => {
    setState((prev) => ({
      ...prev,
      isDrop: false,
      dropValue: value,
    }))
  }

  return (
    <div className={cls['taxes']}>
      <div className={cls['taxes-picker']}>
        <div 
          onClick={() => setState((prev) => ({...prev, isDrop: !state.isDrop}))} 
          className={cls['taxes-picker-button']}
          id={cls[state.isDrop ? 'show' : '']}
        >
          <span>{state.dropValue}</span>
          <BsChevronDown/>
        </div>
        {state.isDrop && <div className={cls['taxes-picker-drop']}>
          <p 
            className={cls[state.dropValue === 'Налог включён в цену товара' ? 'active_item' : '']}
            onClick={() => dropHandler('Налог включён в цену товара')}>Налог включён в цену товара</p>
          <p 
            className={cls[state.dropValue === 'Налог сверх цены товара' ? 'active_item' : '']}
            onClick={() => dropHandler('Налог сверх цены товара')}>Налог сверх цены товара</p>
        </div>}
      </div>
      <div className={cls['taxes-list']}>
        <h3>Список налогов</h3>
      </div>
      <div className={cls['taxes-child']}>
        <div>
          <h3>Наименование <span>*</span></h3>
          <input type="text" />
        </div>
        <div>
          <h3>Ставка налога, % <span>*</span></h3>
          <input className={cls['value']} defaultValue={0} type="number" />
        </div>
        <div>
          <h3>Код налога</h3>
          <input type="text" placeholder='001' />
        </div>
      </div>
      <button className={cls['taxes-adder']}>Добавить еще</button>
      <button className={cls['taxes-saver']}>Сохранить</button>
    </div>
  )
}

export default CompanyTaxes