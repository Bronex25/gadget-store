import styles from './Categories.module.scss'
import { CategoryCard } from "../CategoryCard/CategoryCard"

export const Categories: React.FC = () => {
  return (
    <section className={styles['categories']}>
      <h2 className={styles['categories__title']}>Shop by category</h2>

      <div className={styles['categories__list']}>
        <CategoryCard 
          name='Phones' 
          image='img/category-phones.webp'
          models={24}
        />
        <CategoryCard 
          name='Tablets' 
          image='img/category-tablets.webp'
          models={14}
        />
        <CategoryCard 
          name='Accessories' 
          image='img/category-accessories.webp'
          models={48}
        />
      </div>
      


    </section>
    
  )
}