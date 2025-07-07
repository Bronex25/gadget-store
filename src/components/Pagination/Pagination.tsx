import styles from './Pagination.module.scss';
import React from 'react';
import cn from 'classnames';

type Props = {
  maxPages: number;
  currentPage: number;
  handleLink: (newPage: number) => void;
};

export const Pagination: React.FC<Props> = ({
  maxPages,
  currentPage,
  handleLink,
}) => {
  const getPageNumbers = (
    current: number,
    total: number,
  ): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    pages.push(1);

    if (current > 4) {
      pages.push('...');
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 3) {
      pages.push('...');
    }

    pages.push(total);

    return pages;
  };

  return (
    <>
      <ul className={styles.pagination}>
        <li
          className={cn(styles.button, styles.prev, {
            [styles.disabled]: currentPage === 1,
          })}
          onClick={() => handleLink(currentPage - 1)}
        ></li>

        {getPageNumbers(currentPage, maxPages).map((item, index) =>
          item === '...' ? (
            <li key={`dots-${index}`}>...</li>
          ) : (
            <li
              className={cn(styles.button, {
                [styles.active]: currentPage === item,
              })}
              key={`page-${item}`}
              onClick={() => handleLink(item as number)}
            >
              {item}
            </li>
          ),
        )}

        <li
          className={cn(styles.button, styles.next, {
            [styles.disabled]: currentPage === maxPages,
          })}
          onClick={() => handleLink(currentPage + 1)}
        ></li>
      </ul>
    </>
  );
};
