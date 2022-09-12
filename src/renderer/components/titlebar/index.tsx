import { useEffect, useState } from 'react';
import {
  Controls,
  ButtonMacClose,
  ButtonMacMinimize,
  ButtonMacMaximize,
} from './styles';

export default function Titlebar() {
  const [showIcons, setShowIcons] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { ipcRenderer } = (window as any).electron;

  useEffect(() => {
    ipcRenderer.on('fullscreen-status-change', (newIsFullScreen: boolean) => {
      setIsFullScreen(newIsFullScreen);
    });
  }, []);

  function handleClose() {
    ipcRenderer.closeWindow();
  }

  function handleMinimize() {
    ipcRenderer.minimizeWindow();
  }

  function handleMaximize() {
    ipcRenderer.toggleFullScreen();
  }

  function mouseIn() {
    setShowIcons(true);
  }

  function mouseOut() {
    setShowIcons(false);
  }

  return (
    <>
      <Controls key="title-controls">
        <ButtonMacClose
          onClick={handleClose}
          onMouseEnter={mouseIn}
          onMouseLeave={mouseOut}
          className={showIcons ? 'hover' : ''}
        >
          <svg x="0px" y="0px" viewBox="0 0 6.4 6.4">
            <polygon
              fill="#4d0000"
              points="6.4,0.8 5.6,0 3.2,2.4 0.8,0 0,0.8 2.4,3.2 0,5.6 0.8,6.4 3.2,4 5.6,6.4 6.4,5.6 4,3.2"
            />
          </svg>
        </ButtonMacClose>
        <ButtonMacMinimize
          onClick={handleMinimize}
          onMouseEnter={mouseIn}
          onMouseLeave={mouseOut}
          className={showIcons ? 'hover' : ''}
        >
          <svg x="0px" y="0px" viewBox="0 0 8 1.1">
            <rect fill="#995700" width="8" height="1.1" />
          </svg>
        </ButtonMacMinimize>
        <ButtonMacMaximize
          onClick={handleMaximize}
          onMouseEnter={mouseIn}
          onMouseLeave={mouseOut}
          className={`${showIcons ? 'hover' : ''} ${
            isFullScreen ? 'fullscreen' : ''
          }`}
        >
          <svg
            className="enter-fullscreen-svg"
            x="0px"
            y="0px"
            viewBox="0 0 6 5.9"
          >
            <path
              fill="#006400"
              d="M5.4,0h-4L6,4.5V0.6C5.7,0.6,5.3,0.3,5.4,0z"
            />
            <path
              fill="#006400"
              d="M0.6,5.9h4L0,1.4l0,3.9C0.3,5.3,0.6,5.6,0.6,5.9z"
            />
          </svg>
        </ButtonMacMaximize>
      </Controls>
    </>
  );
}
