import React from 'react';
import styles from './Specs.module.scss';

type Props = {
  specs: { [key: string]: string | number };
};

export const Specs: React.FC<Props> = ({ specs }) => {
  const entries = Object.entries(specs);

  return (
    <div className={styles.specs}>
      {entries.map(([title, value]) => (
        <div key={title} className={styles.item}>
          <span className={styles.label}>{title}</span>
          <span className={styles.value}>{value}</span>
        </div>
      ))}
    </div>
  );
};
