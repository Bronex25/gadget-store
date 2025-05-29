import styles from './Slider.module.scss';
import React from 'react';

export const Slider: React.FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.slider}>
        <button className={styles.sliderButton}>
          <img
            src="/img/slider-btn-left.png"
            alt="arrow"
            className={styles.sliderButtonIcon}
          />
        </button>

        <div className={styles.banner}>
          <div className={styles.bannerLeft}>
            <div className={styles.bannerLeftContent}>
              <h2 className={styles.bannerLeftTitle}>
                Now available <br /> in our store!{' '}
              </h2>
              <span className={styles.bannerLeftText}>Be the first!</span>
            </div>

            <button className={styles.bannerLeftButton}>ORDER NOW</button>
          </div>

          <div className={styles.bannerRight}>
            <div className={styles.bannerRightContent}>
              <h2 className={styles.bannerRightTitle}>iPhone 14 Pro</h2>
              <p className={styles.bannerRightText}>Pro.Beyond.</p>
            </div>
            <img
              className={styles.bannerRightImage}
              src="/img/slider/main.png"
              alt="Slider Picture"
            />
          </div>
        </div>

        <button className={styles.sliderButton}>
          <img
            src="/img/slider-btn-right.png"
            alt="arrow"
            className={styles.sliderButtonIcon}
          />
        </button>
      </div>

      <div className={styles.nav}>
        {[1, 2, 3].map(i => (
          <button className={styles.navButton} key={i}></button>
        ))}
        <button
          className={`${styles.navButton} ${styles.navButtonActive}`}
        ></button>
        <button className={styles.navButton}></button>
      </div>
    </section>
  );
};
