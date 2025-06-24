import { Pagination } from '../../components/Pagination/Pagination';
import React, { useCallback, useEffect, useMemo } from 'react';
import styles from './ItemsPage.module.scss';
import typography from '../../styles/typography.module.scss';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useSearchParams } from 'react-router-dom';
import { updateSearchParams } from '../../utils/searchHelper';

type Props = {
  pageName: string;
  productToShow: Product[];
};

export const ItemsPage: React.FC<Props> = React.memo((props: Props) => {
  const { pageName, productToShow } = props;

  const totalModelsNumber = productToShow.length;
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || 'newest';
  const perPage = searchParams.get('perPage') || 'all';

  const currentPage = Number(searchParams.get('page') || 1);
  const maxPages = Math.ceil(totalModelsNumber / +perPage) || 1;

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setSearchParams(prev =>
      updateSearchParams(prev, { sortBy: event.target.value, page: null }),
    );

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) =>
    setSearchParams(prev =>
      updateSearchParams(prev, { perPage: event.target.value, page: null }),
    );

  const handleChangePage = useCallback(
    (targetPage: number) =>
      setSearchParams(prev =>
        updateSearchParams(prev, { page: targetPage.toString() }),
      ),
    [setSearchParams],
  );

  const sortedProducts = useMemo(() => {
    return [...productToShow].sort((a: Product, b: Product) => {
      switch (sortBy) {
        case 'newest':
          return b.year - a.year;
        case 'cheapest':
          return a.price - b.price;
        case 'alphabeticaly':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [sortBy, productToShow]);

  function handleSlice() {
    const index = currentPage - 1;
    const from = +perPage * index;
    const to = +perPage * currentPage;

    return sortedProducts.slice(from, to);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const displayedItems = perPage === 'all' ? sortedProducts : handleSlice();

  return (
    <div className={styles.itemsPage}>
      <Breadcrumbs />

      <div>
        <h1 className={typography.heading1}>{pageName}</h1>
        <p
          className={cn(styles.models, typography.bodyText)}
        >{`${totalModelsNumber} models`}</p>
      </div>

      <div className={styles.settings}>
        <div className={styles.settingsWrapper}>
          <label htmlFor="sortBy" className={typography.smallText}>
            Sort By
          </label>

          <select
            name="sortBy"
            id="sortBy"
            className={styles.settingsSelect}
            onChange={handleSortChange}
            value={sortBy}
          >
            <option value="">Newest</option>
            <option value="cheapest">Cheapest</option>
            <option value="alphabeticaly">Alphabeticaly</option>
          </select>
        </div>

        <div className={styles.settingsWrapper}>
          <label htmlFor="itemsOnPaage" className={typography.smallText}>
            Items on Page
          </label>

          <select
            name="itemsOnPage"
            id="itemsOnPage"
            className={styles.settingsSelect}
            onChange={handleItemsPerPageChange}
            value={perPage}
          >
            <option value="">All</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="32">32</option>
          </select>
        </div>
      </div>
      <div className={styles.productList}>
        {displayedItems.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      {perPage !== 'all' && (
        <Pagination
          maxPages={maxPages}
          currentPage={currentPage}
          handleLink={handleChangePage}
        />
      )}
    </div>
  );
});
