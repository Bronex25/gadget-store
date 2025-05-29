import { Pagination } from '../../components/Pagination/Pagination';
import { ProductCard } from '../../components/ProductCard';
import styles from './ItemsPage.module.scss'

type Props = {
  pageName: string;
  title: string;
  totalModels: number;
}

export const ItemsPage: React.FC<Props> = ({ pageName, title, totalModels }) => {
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
        <span className={styles['route__text']}>{pageName}</span>
      </div>
    
      <h1 className={styles['title']}>{title}</h1>
      <span className={styles['models']}>{`${totalModels} models`}</span>
      
      {pageName !== 'Favorites' && (
        <div className={styles['settings']}>
        <div className={styles['settings__wrapper']}>
          <label htmlFor="sortBy">Sort By</label>

          <select 
            name="sortBy" 
            id="sortBy" 
            className={styles['settings__select']}
          >
            <option value="newest" defaultChecked>Newest</option>
            <option value="cheapest" defaultChecked>Cheapest</option>
            <option value="alphabeticaly" defaultChecked>Alphabeticaly</option>
          </select>   
        </div>
        
        <div className={styles['settings__wrapper']}>
          <label htmlFor="itemsOnPaage">Items on Page</label>

          <select 
            name="itemsOnPage" 
            id="itemsOnPage" 
            className={styles['settings__select']}
          >
            <option value="all" defaultChecked>All</option>
            <option value="32">32</option>
            <option value="16">16</option>
            <option value="8">8</option>
        </select>
        </div>
      </div>
      )}
      
      
      <div className={styles['item-list']}>
      </div>

      <Pagination maxPages={4} currentPage={5}  onPageChange={() => 4}/>
    </div>

  )
}