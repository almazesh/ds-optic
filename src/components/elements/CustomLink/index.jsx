import { Link, useMatch } from 'react-router-dom';
import cls from './customLink.module.scss';

const CustomLink = ({ to, children }) => {
  const match = useMatch(to)

  return (
    <Link className={cls[match ? 'active' : '']} to={to}>
      {children}
    </Link>
  )
}

export default CustomLink