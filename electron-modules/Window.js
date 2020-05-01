const {
	BrowserWindow
} = require('electron');

const defaultSettings = {
	width: 500,
	height: 500,
	show: false,
	webPreferences: {
		nodeIntegration: true
	}
}

class Window extends BrowserWindow{
	constructor({file, ...windowSettings}){
		super({
			...defaultSettings,
			...windowSettings,
		});

		this.loadFile(file);

		// this.webContents.openDevTools();

		// to open windows gracefully on load
		// otherwise it usually flickers on loading window
		this.once('ready-to-show', () => {
			this.show();
		})
	}
}

module.exports = Window