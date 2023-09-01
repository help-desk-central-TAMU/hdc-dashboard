const { app, BrowserWindow, Menu } = require('electron');
const { exec } = require('child_process');
const find = require('find-process');
let mainWindow;
let server1Process;
let server2Process;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

function startServer(scriptName) {
    const appRoot = app.getAppPath();

    let command;

    switch (process.platform) {
        case 'darwin':
            command = `osascript -e 'tell app "Terminal" to do script "cd ${appRoot} && ./venv/bin/python3 ${scriptName}"'`;
            break;
        case 'linux':
            command = `gnome-terminal -- bash -c "cd ${appRoot} && ./venv/bin/python3 ${scriptName}"`;
            break;
        case 'win32':
            command = `start cmd.exe /K "cd ${appRoot} && ./venv/bin/python3 ${scriptName}"`;
            break;
        default:
            console.error('Unsupported platform');
            return;
    }

    const childProcess = exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error}`);
            return;
        }
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
    });

    return childProcess;
}

function killProcessOnPort(port) {
    return new Promise((resolve, reject) => {
        find('port', port)
            .then(function (list) {
                if (list.length) {
                    const pid = list[0].pid;
                    process.kill(pid);
                    resolve();
                } else {
                    resolve();
                }
            }, function (err) {
                reject(err);
            });
    });
}



let template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Restart Cisco Data',
                click: () => {
                    killProcessOnPort(3000)
                        .then(() => {
                            server1Process.kill();
                            server1Process = startServer('scrape_cisco_data.py');
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            },
            {
                label: 'Restart service-now webservice',
                click: () => {
                    killProcessOnPort(5002) // Kill the process  running on port 4000
                        .then(() => {
                            server2Process.kill();
                            server2Process = startServer('service-now-webservice.py');
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            },
            {
                label: 'Exit',
                role: 'quit'  // This will handle the basic 'quit' functionality for you
            }
        ]
    },
    {
        label: 'Developer',
        submenu: [
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                click: () => {
                    mainWindow.webContents.toggleDevTools();
                }
            }
        ]
    }
    //... you can add more menu sections as needed
];

app.on('ready', () => {
    // Start Flask server1
    //startServer('scrape_cisco_data.py');

    // Start Flask server2
    server2Process = startServer('service-now-webservice.py');

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    createWindow();
});
