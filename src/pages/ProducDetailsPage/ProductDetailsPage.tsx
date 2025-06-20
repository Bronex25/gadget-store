import React, { useEffect, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Category, fetchProductDetails } from '../../utils/api';
import { ProductDetails } from '../../types/ProductInformation';
import cn from 'classnames';
import { ActionButtons } from '../../components/ActionButtons';

export const ProductDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [mainImage, setMainImage] = useState('');

  console.log(product?.data?.name, product, product?.id, product?.data);

  const location = useLocation();
  const navigate = useNavigate();

  const { productId } = useParams<{ productId: string }>();
  const category = location.pathname.split('/')[1] as Category;

  useEffect(() => {
    if (!productId || !category) {
      return;
    }

    fetchProductDetails(productId, category)
      .then((prod: ProductDetails[]) => {
        setProduct(prod[0]);
        setMainImage(prod[0].data.images[0]);
      })
      .catch(error => {
        console.error('Failed to fetch product:', error);
      });
  }, [productId, category]);

  const handleClickBack = () => navigate(-1);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.main}>
      <Breadcrumbs></Breadcrumbs>

      <button className={styles.backButton} onClick={handleClickBack}>
        Back
      </button>

      <h1 className={styles.pageTitle}>{product?.data?.name}</h1>

      <section className={styles.optionsAndImages}>
        <div className={styles.gallery}>
          <div className={styles.mainImageWrapper}>
            <img
              src={mainImage}
              alt="Main product view"
              className={styles.mainImage}
            />
          </div>

          <ul className={styles.galleryNav}>
            {product?.data.images.map(image => (
              <li key={image} className={styles.galleryItem}>
                <button
                  type="button"
                  className={styles.galleryButton}
                  onClick={() => setMainImage(image)}
                >
                  <img src={image} alt="Product thumbnail" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.options}>
          <div className={styles.colors}>
            <p className={styles.optionTitle}>Available colors</p>

            <ul className={styles.colorList}>
              {product?.data.colorsAvailable.map(color => (
                <li key={color} className={styles.colorItem}>
                  <button
                    className={cn(styles.colorButton)}
                    style={{ backgroundColor: color }}
                  ></button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.capacity}>
            <p className={styles.optionTitle}>Select capacity</p>

            <ul className={styles.capacityList}>
              {product?.data.capacityAvailable.map(capacity => (
                <li key={capacity} className={styles.capacityItem}>
                  <button
                    className={cn(styles.capacityButton, {
                      [styles.capacityButtonActive]:
                        capacity === product?.data.capacity,
                    })}
                    type="button"
                  >
                    {capacity}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <ActionButtons productId={product.id}></ActionButtons>
        </div>
      </section>
    </main>
  );
};
