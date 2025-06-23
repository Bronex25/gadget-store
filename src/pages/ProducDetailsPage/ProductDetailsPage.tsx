import React, { useEffect, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import cn from 'classnames';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Category, fetchProductDetails } from '../../utils/api';
import { ProductDetails } from '../../types/ProductInformation';
import { ActionButtons } from '../../components/ActionButtons';
import { Specs } from '../../components/Specs';
import { ItemSlider } from '../../components/ItemSlider';
import { colorMap } from '../../utils/colorsMap';
import { BackButton } from '../../components/BackButton';

export const ProductDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [mainImage, setMainImage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const { productId } = useParams<{ productId: string }>();
  const category = location.pathname.split('/')[1] as Category;

  const handleClickOption = ({
    color = product?.data.color,
    capacity = product?.data.capacity,
  }) => {
    const newId = `${product?.data.namespaceId}-${capacity?.toLocaleLowerCase()}-${color?.replace(' ', '')}`;
    navigate(`/${category}/${newId}`);
  };

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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.main}>
      <Breadcrumbs></Breadcrumbs>
      <BackButton />

      <h1 className={styles.pageTitle}>{product.data.name}</h1>

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
            {product.data.images.map(image => (
              <li key={image} className={styles.galleryItem}>
                <button type="button" onClick={() => setMainImage(image)}>
                  <img src={image} alt="Product thumbnail" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.options}>
          <div className={styles.colors}>
            <p className={styles.optionTitle}>Available colors</p>
            <p className={styles.id}>{`ID: ${product.data.namespaceId}`}</p>

            <ul className={styles.colorList}>
              {product.data.colorsAvailable.map(color => (
                <li
                  key={color}
                  className={cn(styles.colorItem, {
                    [styles.colorItemActive]: product.data.color === color,
                  })}
                >
                  <button
                    className={cn(styles.colorButton)}
                    style={{ backgroundColor: colorMap[color] }}
                    onClick={() => handleClickOption({ color })}
                  ></button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.capacity}>
            <p className={styles.optionTitle}>Select capacity</p>

            <ul className={styles.capacityList}>
              {product.data.capacityAvailable.map(capacity => (
                <li key={capacity} className={styles.capacity}>
                  <button
                    className={cn(styles.capacityButton, {
                      [styles.capacityButtonActive]:
                        capacity === product.data.capacity,
                    })}
                    type="button"
                    onClick={() => handleClickOption({ capacity })}
                  >
                    {capacity}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.priceContainer}>
            <p className={styles.price}>
              {product.data.priceDiscount
                ? `$${product.data.priceDiscount}`
                : `$${product.data.priceRegular}`}
            </p>

            {product.data.priceDiscount && (
              <p
                className={styles.oldPrice}
              >{`$${product.data.priceRegular}`}</p>
            )}
          </div>

          <ActionButtons productId={product.id}></ActionButtons>
          <Specs
            specs={{
              Screen: product.data.screen,
              Resolution: product.data.resolution,
              Processor: product.data.processor,
              RAM: product.data.ram,
            }}
          />
        </div>
      </section>

      <section className={styles.information}>
        <section className={styles.sectionAbout}>
          <h2 className={styles.secondTitle}>About</h2>
          {product.data.description.map(description => (
            <React.Fragment key={description.title}>
              <h3 className={styles.title}>{description.title}</h3>
              <p className={styles.text}>{description.text}</p>
            </React.Fragment>
          ))}
        </section>

        <section className={styles.sectionTechSpecs}>
          <h2 className={styles.secondTitle}>Tech Specs</h2>
          <Specs
            specs={{
              Screen: product.data.screen,
              Resolution: product.data.resolution,
              Processor: product.data.processor,
              RAM: product.data.ram,
              'Built-in memory': product.data.capacity,
              Camera: product.data?.camera ? product.data.camera : '',
              Cell: product.data.cell.join(', '),
            }}
          />
        </section>
      </section>

      <ItemSlider productsToShow={[]} title="You may also like"></ItemSlider>
    </main>
  );
};
