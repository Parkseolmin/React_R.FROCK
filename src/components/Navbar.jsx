import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import { SlLogin, SlLogout } from 'react-icons/sl';
import { IoIosClose } from 'react-icons/io';

import styles from './Navbar.module.css';
import User from './User';
import CloseButton from 'ui/CloseButton';
import { secondNav } from 'data/secondNavData';
import { useAuthContext } from 'context/AuthContext';
import CartStatus from './CartStatus';

export default function Navbar() {
  const { user, login, logout } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductHover, setIsProductHover] = useState(false);
  const LOGINBTN = `font-Playfair flex flex-col items-center pt-3`;
  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
        <div className={styles.header__wrap}>
          <CloseButton handleClick={handleClick} />
          <div className={styles.header__logo}>
            <h1>
              <Link to={'/'} className='text-3xl'>
                MOLLEE.
              </Link>
            </h1>
            <ul
              className={`${styles.header__gnb} ${
                isMenuOpen ? `${styles.gg}` : ''
              }`}
            >
              <span onClick={handleClick} className={styles.menu__closeBtn}>
                <IoIosClose />
              </span>
              <li>
                <Link to={'/'}>Home</Link>
              </li>
              <li onMouseEnter={() => setIsProductHover(true)}>
                <div className={styles.productBtn}>
                  Product
                  <IoIosArrowDown className={styles.productBtn__arrow} />
                </div>
                {isProductHover && (
                  <div
                    className={styles.productNav}
                    onMouseLeave={() => setIsProductHover(false)}
                  >
                    <ul>
                      {secondNav.map((item, index) => {
                        return (
                          <li key={item.id + index}>
                            <Link to={item.src}>{item.name}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <Link to={'/'}>Blog</Link>
              </li>
              <li>
                <Link to={'/'}>Contact</Link>
              </li>
              {user && user.isAdmin && (
                <li>
                  <Link to='/products/new'>registration</Link>
                </li>
              )}
            </ul>
          </div>
          <nav className={styles.header__menu}>
            <ul className={styles.header__login}>
              {user && (
                <li>
                  <Link to='/carts'>
                    <CartStatus />
                  </Link>
                </li>
              )}
              {user && <User user={user} />}
              <li>
                {!user && (
                  <button onClick={login} className={LOGINBTN}>
                    <SlLogin />
                    <em className='text-sm'>login</em>
                  </button>
                )}
                {user && (
                  <button onClick={logout} className={LOGINBTN}>
                    <SlLogout />
                    <em className='text-sm'>logout</em>
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
