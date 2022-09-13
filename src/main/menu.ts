import { Menu, BrowserWindow, MenuItemConstructorOptions } from 'electron';

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu(): Menu {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template = this.buildDarwinTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment(): void {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  buildDarwinTemplate(): DarwinMenuItemConstructorOptions[] {
    const subMenuAbout: DarwinMenuItemConstructorOptions = {
      role: 'appMenu',
    };
    const subMenuEdit: DarwinMenuItemConstructorOptions = {
      role: 'editMenu',
    };
    const subMenuViewDev: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          role: 'reload',
        },
        {
          role: 'forceReload',
        },
        {
          role: 'togglefullscreen',
        },
        {
          role: 'toggleDevTools',
        },
      ],
    };
    const subMenuViewProd: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          role: 'togglefullscreen',
        },
      ],
    };
    const subMenuWindow: DarwinMenuItemConstructorOptions = {
      role: 'windowMenu',
    };

    const subMenuView =
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
        ? subMenuViewDev
        : subMenuViewProd;

    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow];
  }
}
