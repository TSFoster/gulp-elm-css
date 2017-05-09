var elmCss = require('elm-css');
var gutil = require('gulp-util');
var path = require('path');
var temp = require('temp').track();
var through = require('through2');
var Vinyl = require('vinyl');

var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-elm-css';

function css(options = {}) {
    return through.obj(function(file, enc, cb) {
        var projectDir = options.projectDir || __dirname;
        var stylesheetsPath = path.basename(file.path);
        var stylesheetsModule = path.basename(file.path, path.extname(file.path));
        var stylesheetsPort = options.port || 'files';
        var pathToMake = options.pathToMake;
        tempDir({prefix: PLUGIN_NAME + '-tmp-'})
            .then(outputDir => elmCss(
                projectDir,
                stylesheetsPath,
                outputDir,
                stylesheetsModule,
                stylesheetsPort,
                pathToMake
            ))
            .then(cssFiles => {
                cssFiles.forEach(cssFile =>
                    this.push(new Vinyl({
                        cwd: file.cwd,
                        base: file.base,
                        path: path.join(path.dirname(file.path), cssFile.filename),
                        contents: new Buffer(cssFile.content)
                    }))
                );
                cb();
            })
            .catch(error => cb(new gutil.PluginError(PLUGIN_NAME, error)));
    });
}

function tempDir(affixes) {
    return new Promise((resolve, reject) =>
        temp.mkdir(affixes, (err, dirPath) =>
            (err ? reject(err) : resolve(dirPath))
        )
    );
}

module.exports = css;
