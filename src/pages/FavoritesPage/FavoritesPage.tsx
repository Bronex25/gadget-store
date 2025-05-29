import { useAppSelector } from '../../app/hooks'
import { Pagination } from '../../components/Pagination/Pagination';
import { ProductCard } from '../../components/ProductCard';
import styles from '../ItemsPage/ItemsPage.module.scss'


export const FavoritesPage: React.FC = () => {
  const items = useAppSelector(state => state.product.favoritesItems);

  return (
    <div className={styles.mobilePage}>
      <div className={styles['route']}>
        <img
          src="public/img/home-icon.png"
          alt="home"
          className={styles['route__icon']} />
        <img
          src="/img/arrow-grey-right.png"
          alt="arrow"
          className={styles['route__icon']} />
        <span className={styles['route__text']}>Favorites</span>
      </div>
    
      <h1 className={styles['title']}>Favorites</h1>
      <span className={styles['models']}>{`${items.length} models`}</span>
      

      
      
      <div className={styles['item-list']}>
        {items.map(item => (
          <ProductCard product={item} key={item.id} />
          )
        )}
      </div>

      <Pagination maxPages={4} currentPage={5}  onPageChange={() => 4}/>
    </div>

  )
}