import Header from './components/Header/Header.tsx';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import styles from './App.module.scss';
import Content from './components/Content/Content.tsx';

function App() {
  return (
    <div className={styles['content']}>
      <Header />
      <div className={styles['content__main']}>
        <Sidebar placement="left" />
        <Content />
      </div>
    </div>
  );
}

export default App;
