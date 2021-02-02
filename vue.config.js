module.exports = {
    publicPath:"./",
    outputDir:"dist",
    lintOnSave: false,
    devServer: {
        disableHostCheck:true,
        overlay: {
            warning: false,
            errors: false
        }
    }
}

const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: false,
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets',resolve('src/assets'))
            .set('components',resolve('src/components'))
            .set('pages',resolve('src/pages'))
            .set('utils',resolve('src/utils'))
    },
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        hot: true,
    }
}