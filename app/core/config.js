const {remote} = require('electron')
const fs = remote.require('fs-extra')
const path = './config.json'
const config = {}

function saveConfig(config) {
    var file = fs.openSync(path, 'w+')        
    return updateConfig(config)
}

function updateConfig(config) {
    fs.writeFileSync(path, JSON.stringify(config))        
}

config.configurationExists = () => {
    return fs.existsSync(path)
}

config.saveConfigFile = (cfg) => {
    try {

        if (config.configurationExists()) {
            updateConfig(cfg)
        } else {
            saveConfig(cfg)
        }

    } catch (err) {
        console.error(err)
        return false
    }
}

config.readConfig = () => {
    return fs.readJsonSync(path)
}

export default config