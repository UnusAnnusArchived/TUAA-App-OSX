export interface IVideo {
  sources?: ISource[];
  tracks?: ITrack[];
  posters?: IPoster[];
  season: number;
  episode: number;
  title: string;
  description: string;
  date?: number;
  releasedate: number;
  duration?: number;
  thumbnail?: string;
  video?: string;
}

export interface ISource {
  src: string;
  type: string;
  size: number;
}

export interface ITrack {
  kind: string;
  label: string;
  srclang: string;
  src: string;
}

export interface IPoster {
  src: string;
  type: string;
}

export interface ITitlebarStatusSettings {
  pageName?: string;
  showBackButton?: boolean;
  hideMenu?: boolean;
}

export interface IPageProps {
  setTitlebarStatus: (settings: ITitlebarStatusSettings) => void;
}

export interface IError {
  isErrored: boolean;
  title: string;
  description: string;
  fatal: boolean;
}
