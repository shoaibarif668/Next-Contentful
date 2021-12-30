const path = require('path')

module.exports = {
    images: {
      domains: ['images.ctfassets.net'],
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
}