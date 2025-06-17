import React from 'react';
import styles from './Breadcrumbs.module.scss';
import { Link, useLocation } from 'react-router-dom';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(part => part !== '');

  return (
    <div className={styles.breadcrumbs}>
      <Link to={'/'} className={styles.homeLink}></Link>
      {pathParts.map((part, index) => {
        const path = '/' + pathParts.slice(0, index + 1).join('/');
        const name = decodeURIComponent(part).replace(/-/g, ' ');
        return (
          <React.Fragment key={part}>
            <img
              src="img/Icons/arrow-right.svg"
              alt="arrow"
              className={styles.arrow}
            />
            <Link to={path} className={styles.link}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
};
export default Breadcrumbs;
