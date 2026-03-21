const { DistributionAPI } = require('helios-core/common')
const ConfigManager = require('./configmanager')

// O seu novo link do Gist (Raw) para a versão 1.21.1
exports.REMOTE_DISTRO_URL = 'https://raw.githubusercontent.com/maycoveio/yudico-launcher/refs/heads/main/distribution.json'

const api = new DistributionAPI(
    ConfigManager.getLauncherDirectory(),
    null, // Injected forcefully by the preloader.
    null, // Injected forcefully by the preloader.
    exports.REMOTE_DISTRO_URL,
    false
)

exports.DistroAPI = api