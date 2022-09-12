import axios from 'axios';
import { endpoint } from 'endpoint';
import { useEffect, useState } from 'react';
import Error from 'renderer/components/error';
import Videos from 'renderer/components/videos';
import loadingVideo from '../../../assets/loading.webm';
import type { IPageProps, IVideo } from '../../types';

const Specials: React.FC<IPageProps> = ({ setTitlebarStatus }) => {
  setTitlebarStatus({
    pageName: 'Specials',
    showBackButton: false,
    hideMenu: true,
  });

  const [error, setError] = useState<Error>();
  const [metadata, setMetadata] = useState<IVideo[]>();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get(`${endpoint}/v2/metadata/season/s00`)
      .then((res) => {
        return setMetadata(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, [reload]);

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

export default Specials;
