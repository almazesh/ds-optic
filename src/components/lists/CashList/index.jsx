import cls from './cashList.module.scss';

const CashList = () => {
  return (
    <div className={cls['list']}>
      <div className={cls['list-child']}>
        <p>Наименование</p>
        <span>№1</span>
      </div>
      <div className={cls['list-child']}>
        <p>Магазин</p>
        <span>ДОмашний</span>
      </div>
      <div className={cls['list-child']}>
        <p>Баланс, сом</p>
        <h4>200.00</h4>
      </div>
      <div className={cls['list-child-user']}>
        <p>Кассиры</p>

        <div>
          <img src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-
          during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000" alt="" />
          <span>Asad Halmatov</span>
        </div>
      </div>

      <div className={cls['list-child-terminal']}>
        <p>Терминалы</p>
        <button>№1</button>
      </div>

      <div className={cls['list-child-create']}>
        <p>Создан</p>
        <h4>14 января 19:53</h4>
      </div>
    </div>
  )
}

export default CashList