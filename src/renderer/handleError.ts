import { IError } from 'types';

const { ipcRenderer } = (window as any).electron;

export default function handleError(error: IError) {
  if (error.isErrored) {
    alert(
      `${error.title}\n${error.description}${
        error.fatal ? '\nThis is a fatal error, so the app will now exit.' : ''
      }`
    );
    if (error.fatal) {
      ipcRenderer.quitApp();
    }
  }
}

export function getErrorDescription(error?: Error): string {
  if (error) {
    let errorDescription = 'Please try again later.';
    if (error.message === 'Network Error') {
      errorDescription = 'Please check your network connection and try again.';
    }
    return errorDescription;
  }
  return '';
}
