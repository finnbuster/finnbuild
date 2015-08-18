# finnbuild
My perfect front end build process.

Requires node, bower and gulp to run.

Run npm install, bower install and then gulp to run

## Based on

Boy boilerplate
https://github.com/corysimmons/boy

## Includes

### Stylus
http://learnboost.github.io/stylus/

### Nib (stylus utility belt)
https://github.com/tj/nib/tree/master/docs

### Axis (stylus utility belt built on top of nib)
http://axis.netlify.com/

### Rupture (for media queries)
https://github.com/jenius/rupture

### Typographic (for handling type)
https://github.com/corysimmons/typographic

### Lost (super flexible grid system)
https://github.com/corysimmons/lost

### PostCSS (for lost but postcss has lots of other applications including autoprefixing)
https://github.com/postcss/postcss

### More PostCSS plugins here
https://www.npmjs.com/browse/keyword/postcss-plugin?offset=0

### Browsersync (can be configured to proxy MAMP wordpress)
http://www.browsersync.io/

## Tasks (aside from the default)

### SVG Sprites

Add individual SVG icons to img/icons and then run `gulp sprites` to build them into a new sprite with png fallback sprite. If you have the default gulp task running in another terminal window, it will detect the resulting change and then build the new _sprite.styl file in. A browser refresh may be required for the svgs to display correctly.

### Imagemin

Running `gulp minifyimages` will optimise any images in the img/src directory and place them in the img directory. The main gulp task will also watch for changes.

### Favicon creator

Running `gulp favicons` will build favicons for all platforms from the file img/favicon-original.png and place them in the img directory. The main gulp task will also watch for changes.

