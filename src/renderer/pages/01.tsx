import axios from 'axios';
import { endpoint } from 'endpoint';
import { useEffect, useState } from 'react';
import Error from 'renderer/components/error';
import Videos from 'renderer/components/videos';
import loadingVideo from '../../../assets/loading.webm';
import type { IPageProps, IVideo } from '../../types';

const Season1: React.FC<IPageProps> = ({ setTitlebarStatus }) => {
  setTitlebarStatus({
    pageName: 'Season 1',
    showBackButton: false,
    hideMenu: true,
  });

  const [error, setError] = useState<Error>();
  const [metadata, setMetadata] = useState<IVideo[]>();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get(`${endpoint}/v2/metadata/season/s01`)
      .then((res) => {
        return setMetadata(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <>
      {metadata ? (
        <Videos metadata={metadata} />
      ) : (
        <div className="flex-centered">
          {error ? (
            <>
              <Error error={error} reload={reload} setReload={setReload} />
            </>
          ) : (
            <>
              <p>Loading&nbsp;</p>
              <video
                src={loadingVideo}
                autoPlay
                loop
                muted
                width="20"
                height="20"
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Season1;
