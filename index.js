#!/usr/bin/env node

var fs = require('fs-extra');
var prependFile = require('prepend-file');
var program = require('commander');
var giroVersion = require('./package.json').version;

var GIRO_CSS_START = "/*** GIRO CUSTOM CSS START ***/";
var GIRO_CSS_STOP = "/*** GIRO CUSTOM CSS STOP ***/";
var GIRO_CSS_FILE = "giro.css";
var GIRO_CSS_FILE_IMPORT = '@import "' + GIRO_CSS_FILE + '";';
var BASE_MAC_PATH = "/Applications/Vivaldi.app/Contents/Versions/";
var APPEND_MAC_PATH = "/Vivaldi Framework.framework/Resources/vivaldi/style/";
var VIVALDI_CSS_FILE = "common.css";
var NEW_LINE = '\n';

var getCustomCssPath = function () {
    var version = fs.readdirSync(BASE_MAC_PATH);
    var giroPath = undefined;
    if (version.length === 1) {
        giroPath = BASE_MAC_PATH + version[0] + APPEND_MAC_PATH + GIRO_CSS_FILE;
    } else {
        console.log("Could not find version, exiting...");
        return;
    }
    return giroPath;
};

var getVivaldiCssPath = function () {
    var version = fs.readdirSync(BASE_MAC_PATH);
    var path = undefined;
    if (version.length === 1) {
        path = BASE_MAC_PATH + version[0] + APPEND_MAC_PATH + VIVALDI_CSS_FILE;
    } else {
        console.log("Could not find version, exiting...");
        return;
    }

    fs.accessSync(path, fs.R_OK | fs.W_OK);
    return path;
};

var installGiro = function() {
    var path = getVivaldiCssPath()
    var contents = fs.readFileSync(path, 'utf-8');
    if (!contents.startsWith(GIRO_CSS_START)) {
        prependFile.sync(path, NEW_LINE);
        prependFile.sync(path, GIRO_CSS_STOP);
        prependFile.sync(path, GIRO_CSS_FILE_IMPORT);
        prependFile.sync(path, GIRO_CSS_START);
        fs.copySync(GIRO_CSS_FILE, getCustomCssPath());
        console.log("Giro installed");
    } else {
        console.log('Giro is already installed');
    }
};

var uninstallGiro = function () {
    var contents = fs.readFileSync(getVivaldiCssPath(), 'utf-8');
    if (contents.startsWith(GIRO_CSS_START)) {
        var index = contents.lastIndexOf(GIRO_CSS_STOP);
        var newContents = contents.substring(index);
        fs.writeFileSync(getVivaldiCssPath(), newContents);
        fs.removeSync(getCustomCssPath());
        console.log('Giro has been uninstalled');
    } else {
        console.log('Giro is not installed.');
    }
};

var cmdValue;

program
    .version(giroVersion)
    .arguments('<cmd>')
    .action(function(cmd){
        cmdValue = cmd;
    })
    .parse(process.argv);


if (cmdValue === 'install') {
    installGiro();
} else if (cmdValue == 'uninstall') {
    uninstallGiro();
} else {
    console.log(cmdValue + ' is not recognized');
}
