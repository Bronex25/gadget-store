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
  return (
    <>
      <ul className={styles.pagination}>
        <li
          className={cn(styles.button, styles.prev, {
            [styles.disabled]: currentPage === 1,
          })}
          onClick={() => handleLink(currentPage - 1)}
        ></li>

        {Array.from({ length: maxPages }).map((_, index) => (
          <li
            className={cn(styles.button, {
              [styles.active]: currentPage === index + 1,
            })}
            key={index}
            onClick={() => handleLink(index + 1)}
          >
            {index + 1}
          </li>
        ))}

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
