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

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.navItem, { [styles.active]: isActive });

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="#/">
          <img src="public/img/logo.png" alt="logo" className={styles.logo} />
        </Link>
        <div className={styles.burgerMenu} onClick={() => handleMenuOpen()}>
          {!isMenuOpen ? (
            <img src="public/img/burgerMenu.svg" alt="Burger Menu" />
          ) : (
            <img src="public/img/cross-for-burger.svg" alt="Close sign" />
          )}
        </div>
      </div>
      <div className={cn(styles.menu, { [styles.active]: isMenuOpen })}>
        <ul className={styles.navBar}>
          {['home', 'phones', 'tablets', 'accessories'].map((item, index) => (
            <li key={index + 1}>
              <NavLink
                className={getNavLinkClass}
                to={`/${item !== 'home' ? item : ''}`}
                onClick={handleClickLink}
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={styles.shopping} onClick={handleClickLink}>
          <NavLink to="/cart" className={styles.link}>
            <img
              src="public/img/shopping-cart.png"
              alt="cart"
              className={styles.icon}
            />
          </NavLink>
          <NavLink to="/favorites" className={cn(getNavLinkClass, styles.link)}>
            <img
              src="public/img/favorites.png"
              alt="cart"
              className={styles.icon}
            />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
