import { cdn } from 'endpoint';
import React, { useEffect, useRef, useState } from 'react';
import type { IVideo } from 'types';
import styles from './styles.module.scss';

interface IProps {
  video: IVideo;
}

const Player: React.FC<IProps> = ({ video }) => {
  const videoElement = useRef<HTMLVideoElement>(null);
  // const [showControls, setShowControls] = useState(true);
  const [isFullScreen, setIsFullscreen] = useState(false);
  const [isPiP, setIsPiP] = useState(false);

  // Video elements
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [, /* volume, */ setVolume] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(videoElement.current?.currentTime ?? 0);
      setDuration(videoElement.current?.duration ?? 0);
      setIsPaused(videoElement.current?.paused ?? true);
      setVolume(videoElement.current?.volume ?? 1);
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {}, [isPiP]);

  const handleKeyPress = (
    evt: React.KeyboardEvent<HTMLSpanElement>,
    func: () => any
  ) => {
    if (evt.code === 'Enter') {
      func();
    }
  };

  const toggleFullScreen = () => {
    setIsFullscreen(!isFullScreen);
  };

  const togglePiP = () => {
    setIsPiP(!isPiP);
  };

  const togglePause = () => {
    if (isPaused) {
      videoElement.current?.play();
    } else {
      videoElement.current?.pause();
    }
  };

  const handleTimeSkip = (interval: number) => {
    videoElement.current!.currentTime = currentTime + interval;
  };

  useEffect(() => {
    if (isFullScreen) {
      videoElement.current?.requestFullscreen({ navigationUI: 'hide' });
    }

    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        toggleFullScreen();
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, [isFullScreen]);

  return (
    <>
      <video
        className={styles.player}
        src={`${cdn}${video.video ?? video.sources?.[0].src}`}
        autoPlay
        ref={videoElement}
      />
      <span className={`${styles.controls} ${styles.topControls}`}>
        <span
          role="button"
          tabIndex={0}
          onClick={toggleFullScreen}
          onKeyPress={(evt) => handleKeyPress(evt, toggleFullScreen)}
        >
          {isFullScreen ? '􀅋' : '􀅊'}
        </span>
        <span
          role="button"
          tabIndex={0}
          onClick={togglePiP}
          onKeyPress={(evt) => handleKeyPress(evt, togglePiP)}
        >
          {isPiP ? '􀑧' : '􀑨'}
        </span>
      </span>
      <span className={`${styles.controls} ${styles.bottomControls}`}>
        <span
          role="button"
          tabIndex={0}
          onClick={() => handleTimeSkip(-15)}
          onKeyPress={(evt) => handleKeyPress(evt, () => handleTimeSkip(-15))}
        >
          􀎄
        </span>
        <span
          role="button"
          tabIndex={0}
          onClick={togglePause}
          onKeyPress={(evt) => handleKeyPress(evt, togglePause)}
        >
          {currentTime === duration ? '􀅉' : isPaused ? '􀊄' : '􀊆'}
        </span>
        <span
          role="button"
          tabIndex={0}
          onClick={() => handleTimeSkip(15)}
          onKeyPress={(evt) => handleKeyPress(evt, () => handleTimeSkip(15))}
        >
          􀎃
        </span>
        <span className={styles.progressBar}>aaaa</span>
        <span>􀊣􀊥􀊧􀊩</span>
      </span>
    </>
  );
};

export default Player;
