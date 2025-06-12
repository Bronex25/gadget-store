import styles from './Categories.module.scss';
import React from 'react';
import { CategoryCard } from './CategoryCard/CategoryCard';

export const Categories: React.FC = () => {
  return (
    <section className={styles.sectionCategories}>
      <h2 className={styles.categoriesTitle}>Shop by category</h2>

      <div className={styles.categoriesList}>
        <CategoryCard name="Phones" models={24} />
        <CategoryCard name="Tablets" models={14} />
        <CategoryCard name="Accessories" models={48} />
      </div>
    </section>
  );
};
