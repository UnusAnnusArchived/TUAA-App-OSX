import universal from '@electron/universal';
import { resolve } from 'path';

universal.makeUniversalApp({
  x64AppPath: resolve('./release/build/mac-arm64/The Unus Annus Archive.app'),
  arm64AppPath: resolve('./release/build/mac/The Unus Annus Archive.app'),
});
