import { memo } from 'react';
import styles from './Sidebar.module.scss';
import classNames from 'classnames';
import LeftContent from './LeftContent.tsx';

type Props = {
  placement: 'left' | 'right';
};

function Sidebar({ placement }: Props) {
  return (
    <div
      className={classNames(styles['sidebar'], {
        [styles['sidebar__left']]: placement === 'left',
        [styles['sidebar__right']]: placement === 'right',
      })}
    >
      {placement === 'left' && <LeftContent />}
    </div>
  );
}

export default memo(Sidebar);
