import React from 'react'
import cls from './group.module.scss'
import { useDispatch } from 'react-redux'
import { setModal, setModalType } from '../../../store/slices/modalSlice'
import { modalTypes } from '../../../constants'
import { axiosInstance } from '../../../axios'
import { FaLayerGroup, FaRegCalendarCheck } from 'react-icons/fa'
import { BiTrash } from 'react-icons/bi'

const GroupList = () => {
  const dispatch = useDispatch()
  const [getGroup, setGetGroup] = React.useState([])
  const [render, setRender] = React.useState('text')

  const modalHandler = (type , id) => {
    localStorage.setItem('storeId', id)
    dispatch(setModal())
    dispatch(setModalType(type))
  }

  React.useEffect(() => {
    axiosInstance.get('/products/groups/')
      .then(res => setGetGroup(res.data))
  }, [render])  


  const deleteGroup = async (id) => {
    try {
      await axiosInstance.delete(`/products/groups/${id}/`)      
      setRender(`Deleted ${id}`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <React.Fragment>
      <div className={cls['stores']}>
        <div className={cls['stores-wrapper']}>
          <div onClick={() => modalHandler(modalTypes.CREATE_GROUP_TYPE)} className={cls['stores-create']}>
            <button>Создать</button>
          </div>
          {getGroup && getGroup?.results?.map(item => (
            <div key={item.id} className={cls['stores-child']}>
              <div onClick={() => modalHandler(modalTypes.STORE_HISTORY_TYPE, item.id)} className={cls['stores-child-head']}>
                <span className={cls['stores-child-icon']}><FaLayerGroup/>  </span>
                <div>
                  <h3>{item.name}</h3>
                  <p><FaRegCalendarCheck/> Создан 14 января</p>
                </div>
              </div>
              <div className={cls['stores-child-button']}>
                <div>
                  <span onClick={() => deleteGroup(item?.id)}><BiTrash/> Удалить</span>  
                </div>
              </div>
            </div>
          ))}
          {/* <div className={cls['stores-child']}>
            <div onClick={() => modalHandler(modalTypes.STORE_HISTORY_TYPE)} className={cls['stores-child-head']}>
              <span className={cls['stores-child-icon']}><HiOutlineBuildingOffice/>  </span>
              <div>
                <h3>Beta 2</h3>
                <p><FaRegCalendarCheck/> Создан 14 января</p>
              </div>
            </div>
            <div className={cls['stores-child-button']}>
              <div>
                <span onClick={() => modalHandler(modalTypes.EDIT_STORE_TYPE)}><FaRegEdit/> Редактировать</span>
                <button><BiTrash/></button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  )
}

export default GroupList
