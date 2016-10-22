import config from './config.js'

const {remote} = require('electron')
const fs = remote.require('fs-extra')
const dir = './data'
const dataAccess = {}

function folderExists () {
    fs.mkdirsSync(dir)
}

function getFilePath(month, year) {
    return dir  + '/' + year + '/' + month + '.json'
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

dataAccess.getCurrent = () => {
    var d = new Date()
    return loadDataOrCreateNew(d.getMonth(), d.getFullYear())
}

dataAccess.saveCurrent = (data, settings) => {
    var d = new Date()    
    var p = getFilePath(d.getMonth(), d.getFullYear())

    if (fs.ensureFileSync(p)) {
        fs.removeSync(p)
    }
    
    var saveObj = {}
    saveObj.data = data
    saveObj.settings = settings

    fs.writeJsonSync(p, saveObj)
}

export default dataAccess