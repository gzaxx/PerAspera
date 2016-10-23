import config from './config.js'

const {remote} = require('electron')
const fs = remote.require('fs-extra')
const dir = './data'
const dataAccess = {}

function folderExists () {
    fs.mkdirsSync(dir)
}

function getDirectory(year) {
    return dir  + '/' + year
}

function getFilePath(month, year) {
    return getDirectory(year) + '/' + month + '.json'
}

function loadDataOrCreateNew(month, year) {
    var p = getFilePath(month, year)
    
    var obj = {};

    if (fs.existsSync(p)) {
        obj = fs.readJsonSync(p, { throws: false })        
    }
    
    if (!obj.data) {
        obj.data = {        
            workDays: 22,
            netPayment: 0,
            overhours: 0
        }         
    }

    if (!obj.settings) {
        obj.settings = config.readConfig()
    }

    return obj
}

function save(month, year, data, settings) {
    var p = getFilePath(month, year)
    var dict = getDirectory(year)

    fs.ensureDirSync(dict)

    if (fs.existsSync(p)) {
        fs.removeSync(p)
    }
    
    var saveObj = {}
    saveObj.data = data
    saveObj.settings = settings

    fs.writeJsonSync(p, saveObj)  
}

dataAccess.getCurrent = () => {
    var d = new Date()
    return loadDataOrCreateNew(d.getMonth(), d.getFullYear())
}

dataAccess.saveCurrent = (data, settings) => {
    var d = new Date()
    save(d.getMonth(), d.getFullYear(), data, settings)
}

dataAccess.save = (month, year, data, settings) => {        
    save(month, year, data, settings)
}

dataAccess.hasMonthDataInYear = (year) => {
    var data = []

    for (var i = 0; i < 12; i++) {
        var p = getFilePath(i, year)
        data[i] = fs.existsSync(p)
    }

    return data
}

export default dataAccess