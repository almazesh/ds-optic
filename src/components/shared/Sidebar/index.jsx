import { useLocation, useNavigate } from 'react-router-dom'
import { appRoutesPath } from '../../../constants'
import CustomLink from '../../elements/CustomLink'
import { BsChevronDown } from 'react-icons/bs'
import cls from './sidebar.module.scss'

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className={cls['sidebar']}>
      <div className={cls['sidebar-buttons']}>
        <button>Создать документ</button>
      </div>
      <div className={cls['sidebar-list']}>
        <CustomLink to={appRoutesPath.MAIN}>Главная</CustomLink>
        <CustomLink to={appRoutesPath.PRODUCTS}>Товары и услуги</CustomLink>
        <ul className={cls[
          location.pathname === `/${appRoutesPath.SERVICES}` || 
          location.pathname === `/${appRoutesPath.CASH_STORE}` ? 'active_list' : '']}>
          <span onClick={() => navigate(`/${appRoutesPath.SERVICES}`)}>Кассы и смены <BsChevronDown/></span>
          <li 
            className={cls[location.pathname === `/${appRoutesPath.SERVICES}` ? 'active_link' : '']}
            onClick={() => navigate(`/${appRoutesPath.SERVICES}`)}
          >
              Смена</li>
          <li
            className={cls[location.pathname === `/${appRoutesPath.CASH_STORE}` ? 'active_link' : '']}
            onClick={() => navigate(`/${appRoutesPath.CASH_STORE}`)}
          >Касса</li>
        </ul>
        <ul className={cls[
          location.pathname === `/${appRoutesPath.COMPANY_SETTINGS}` || 
          location.pathname === `/${appRoutesPath.COMPANY_STORES}` || 
          location.pathname === `/${appRoutesPath.COMPANY_SETTINGS_PROPS}` || 
          location.pathname === `/${appRoutesPath.COMPANY_SETTINGS_DISCOUNTS}` || 
          location.pathname === `/${appRoutesPath.COMPANY_SETTINGS_TAXES}` || 
          location.pathname === `/${appRoutesPath.COMPANY_SETTINGS_EMAILS}` || 
          location.pathname === `/${appRoutesPath.COMPANY_SETTINGS_DATA}` || 
          location.pathname === `/${appRoutesPath.COMPANY_WORKERS}` ? 'active_list' : '']}>
          <span onClick={() => navigate(`/${appRoutesPath.COMPANY_SETTINGS}`)}>Компания <BsChevronDown/></span>
          <li
            className={cls[location.pathname === `/${appRoutesPath.COMPANY_SETTINGS}`
            || location.pathname === `/${appRoutesPath.COMPANY_SETTINGS_PROPS}` 
            || location.pathname === `/${appRoutesPath.COMPANY_SETTINGS_DISCOUNTS}` 
            || location.pathname === `/${appRoutesPath.COMPANY_SETTINGS_TAXES}` 
            || location.pathname === `/${appRoutesPath.COMPANY_SETTINGS_EMAILS}` 
            || location.pathname === `/${appRoutesPath.COMPANY_SETTINGS_DATA}` 
              ? 'active_link' : '']}
            onClick={() => navigate(`/${appRoutesPath.COMPANY_SETTINGS}`)}
          >Настройки</li>
          <li
            className={cls[location.pathname === `/${appRoutesPath.COMPANY_WORKERS}` ? 'active_link' : '']}
            onClick={() => navigate(`/${appRoutesPath.COMPANY_WORKERS}`)}
          >Сотрудники</li>
          <li
            className={cls[location.pathname === `/${appRoutesPath.COMPANY_STORES}` ? 'active_link' : '']}
            onClick={() => navigate(`/${appRoutesPath.COMPANY_STORES}`)}
          >Магазины</li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar