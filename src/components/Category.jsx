import React from 'react';
import Marquee from 'react-fast-marquee';
import styles from './Category.module.css'; // CSS 모듈 사용 시
import { images } from 'data/category';

export default function Category() {
  return (
    <>
      <Marquee
        style={{ width: '100%', marginTop: '30px' }}
        gradient
        gradientColor='white'
        gradientWidth={'300px'}
      >
        <div className={styles.categoryContainer}>
          {images.map((image, index) => (
            <div key={index} className={styles.categoryImageWrapper}>
              <img
                src={image.src}
                alt={image.title}
                className={styles.categoryImage}
              />
            </div>
          ))}
        </div>
      </Marquee>
      <Marquee
        style={{ width: '100%', marginTop: '30px' }}
        direction='right'
        gradient
        gradientColor='white'
        gradientWidth={'300px'}
      >
        <div className={styles.categoryContainer}>
          {images.map((image, index) => (
            <div key={index} className={styles.categoryImageWrapper}>
              <img
                src={image.src}
                alt={image.title}
                className={styles.categoryImage}
              />
            </div>
          ))}
        </div>
      </Marquee>
    </>
  );
}
