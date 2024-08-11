import { memo } from 'react';

import { Chevron } from '@/assets';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.css';

export type HeaderProps = {
  title: string;
  isBackButtonVisible: boolean;
};

export const Header = memo(({ title, isBackButtonVisible }: HeaderProps) => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <header className={styles.wrapper}>
      {isBackButtonVisible && (
        <button className={styles.backButton} onClick={handleClickBack}>
          <Chevron />
        </button>
      )}
      {title}
    </header>
  );
});
