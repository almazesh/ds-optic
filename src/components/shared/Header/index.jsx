import { routeTitleHandler } from '../../../utils/routesTitleHandler';
import { useLocation, useNavigate } from 'react-router-dom';
import { appRoutesPath } from '../../../constants';
import logo from '../../../assets/logo.svg'
import cls from './header.module.scss';

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className={cls['header']}>
      <div className={cls['header-left']}>
        <div className={cls['header-left__logo']}>
          <img onClick={() => navigate(appRoutesPath.MAIN)} src={logo} alt="app-logo" />
        </div>
        <div className={cls['header-left__title']}>
          <h5>{routeTitleHandler(location.pathname === '/' ? location.pathname : location.pathname.slice(1))}</h5>
        </div>
      </div>
      <div className={cls['header-right']}>
        <div className={cls['header-right__user']}>
          <img 
            src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-
            during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000" 
            alt="user-icon" />
          <div>
            <h5>Asad Halmatov</h5>
            <p>Владелец</p>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default Header;