import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ITitlebarStatusSettings } from 'types';
import Menu from './components/menu';
import './styles/globals.scss';

// Import pages
import Specials from './pages/00';
import Season1 from './pages/01';
import Watch from './pages/watch';

export default function App() {
  const [pageName, setPageName] = useState<string>('The Unus Annus Archive');
  const [showBackButton, setShowBackButton] = useState<boolean>(false);
  const [hideMenu, setHideMenu] = useState<boolean>(true);

  const { ipcRenderer } = (window as any).electron;

  function setTitlebarStatus(settings: ITitlebarStatusSettings) {
    if (settings.pageName !== undefined) {
      setPageName(settings.pageName);
    }

    if (settings.showBackButton !== undefined) {
      setShowBackButton(settings.showBackButton);
    }

    if (settings.hideMenu !== undefined) {
      setHideMenu(settings.hideMenu);
    }
  }

  // let backgroundColor = '#ffffff';
  // if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //   ipcRenderer
  //     .getColor('window-background')
  //     .then((evt: any, color: string) => {
  //       backgroundColor = color;
  //     })
  //     .catch((err: Error) => {
  //       throw err;
  //     });
  // }

  return (
    <Router>
      <div className="container">
        <div className="menu-container">
          <Menu />
        </div>
        <div className="pageContainer">
          <div className={`drag dragbar ${hideMenu ? '' : 'nohide'}`}>
            {showBackButton ? <p className="back-btn">􀯶</p> : undefined}
            <p>{pageName}</p>
          </div>
          <div className="page">
            <Routes>
              <Route
                path="/00"
                element={<Specials setTitlebarStatus={setTitlebarStatus} />}
              />
              <Route
                path="/01"
                element={<Season1 setTitlebarStatus={setTitlebarStatus} />}
              />
              <Route
                path="/watch"
                element={<Watch setTitlebarStatus={setTitlebarStatus} />}
              />
              <Route
                path="*"
                element={<Season1 setTitlebarStatus={setTitlebarStatus} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
