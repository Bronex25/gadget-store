import cn from 'classnames';
import styles from './Pagination.module.scss'

type Props = {
maxPages: number;
currentPage: number;
onPageChange: (newPage: number) => void;
}

export const Pagination: React.FC<Props> = ({
  maxPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <>
      <ul className={styles['pagination']}>
        <li className={styles['pagination__nav-item']}>
          <a
            className={styles['pagination__nav-link']}
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            <img 
              src="/img/slider-btn-left.png" 
              alt="arrow" 
              className={styles['pagination__icon']}
            />
          </a>
        </li>

        {Array.from({ length: maxPages }).map((_, index) => (
          <li
            className={styles['pagination__item']}
            key={index}
            onClick={() => onPageChange(index + 1)}
          >
            <a className={styles['pagination__link']} href={`#${index + 1}`}>
              {index + 1}
            </a>
          </li>
        ))}

        <li className={styles['pagination__nav-item']}>
          <a
            className={styles['pagination__nav-link']}
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            <img 
              src="/img/slider-btn-right.png" 
              alt="arrow" 
              className={styles['pagination__icon']}
            />
          </a>
        </li>
      </ul>
    </>
  );
};
