var plugin = require('..');
var gutil = require('gulp-util');
var assert = require('assert');
var path = require('path');

describe('gulp-elm-css', function describeGulpElmCss() {
    it('should compile a real Elm file to a virtual CSS file', function itShouldCompile(done) {
        var gulpElmCss = plugin({projectDir: './test'});
        gulpElmCss.write(new gutil.File({
            base: __dirname,
            cwd: __dirname,
            path: path.join(__dirname, './Stylesheets.elm')
        }));
        gulpElmCss.once('data', function onceData(file) {
            var err;
            try {
                assert(file.isBuffer(), 'One buffer should be compiled');
                assert.equal(path.basename(file.path), 'main.css', 'File name should be main.css');
            } catch (e) {
                err = e;
            } finally {
                done(err);
            }
        });
    });
});
