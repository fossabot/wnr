var i18n = require("i18n");
const Store = require('electron-store');
const store = new Store();
const ipc = require('electron').ipcRenderer;
const path = require("path");
const cmdOrCtrl = require("cmd-or-ctrl")

isInDark();

const languageList = ['en', 'zh-CN', 'zh-TW'],//locale code
    languageNameList = ['English', '简体中文', '正體中文'],//real name
    isChinese = store.get("i18n").indexOf("zh") != -1 ? true : false;

i18n.configure({
    locales: languageList,
    directory: __dirname + '/locales'
});
i18n.setLocale(store.get("i18n"));//国际化组件默认设置

function isTimerWindow(isTimer) {
    if (isTimer) {
        ipc.send('timer-win', true);
    } else ipc.send('timer-win', false);
}

function call(content) {
    ipc.send(content);
}

function getHelp(idCode) {
    require('electron').shell.openExternal(isChinese ?
        'https://getwnr.com/zh/' + idCode + '.html' :
        'https://getwnr.com/' + idCode + '.html');
}

function isInDark() {
    const isDarkMode = store.get('isdark');
    if (isDarkMode) {
        $('body').append(
            '<style id="darkmode-jetplane">::-webkit-scrollbar-track {background-color: #191919;}\
            ::-webkit-scrollbar-thumb {background-color: #999999;}\
            .dropdown-menu {border-color: #aaaaaa; background-color: #393939;}\
            .dropdown-item:hover {background-color: #555555; color: #fefefe;}\
            input[type="range"] {background-color: #aaaaaa33;}\
            body {background-color: #191919;}\
            hr {border-color: #666666;}\
            #title {color: #aaaaaa;}\
            #settings-sidebar {border-right-color: #aaaaaa33;}\
            .settings-sidebar-block {color: #fefefe; background-color: #191919;}\
            #loader-wrapper .loader-section {background: #191919;}\
            .dropdown-item, .dropdown-item .text-info {color: #f5f5f5!important;}\
            label, li, select {color: #f5f5f5;}\
            input[type="text"]:focus, input[type="number"]:focus, input[type="password"]:focus {border-bottom-color: #cccccc33;}\
            input[type="text"]:hover, input[type="number"]:hover, input[type="password"]:hover {border-bottom-color: #cccccc28;}\
            </style>'
        );
    } else {
        $('#darkmode-jetplane').remove();
    }
}
ipc.on('darkModeChanges', function () {
    isInDark();
})//dark mode settings