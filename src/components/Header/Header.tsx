import styles from './Header.module.scss';
import cn from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleClickLink = () => {
    setIsMenuOpen(false);
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.link, styles.navItem, { [styles.active]: isActive });

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          <img src="./img/logo.svg" alt="logo" className={styles.logo} />
        </Link>
        <div className={styles.burgerMenu} onClick={() => handleMenuOpen()}>
          {!isMenuOpen ? (
            <img src="./img/burgerMenu.svg" alt="Burger Menu" />
          ) : (
            <img src="./img/cross-for-burger.svg" alt="Close sign" />
          )}
        </div>
      </div>
      <div className={cn(styles.menu, { [styles.active]: isMenuOpen })}>
        <ul className={styles.navBar}>
          {['home', 'phones', 'tablets', 'accessories'].map((item, index) => (
            <li key={index + 1}>
              <NavLink
                className={getLinkClass}
                to={`/${item !== 'home' ? item : ''}`}
                onClick={handleClickLink}
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={styles.shopping} onClick={handleClickLink}>
          <NavLink to="/cart" className={getLinkClass}>
            <img
              src="./img/shopping-cart.png"
              alt="cart"
              className={styles.icon}
            />
          </NavLink>
          <NavLink to="/favorites" className={getLinkClass}>
            <img src="./img/favorites.png" alt="cart" className={styles.icon} />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
