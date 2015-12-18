

var gulp 			= require('gulp');
var browserSync 	=	require('browser-sync').create(),
	pngcrush 		=	require('imagemin-pngcrush'),
	favicons 		=	require('favicons');
	typographic 	=	require('typographic');
	nib			 	=	require('nib'),
	autoprefixer 	= 	require('autoprefixer'),
	lost 			= 	require('lost'),
	axis 			= 	require('axis'),
	rupture 		= 	require('rupture'),
	csswring 		= 	require('csswring');

var plugins 		= 	require('gulp-load-plugins')();

//	uglify      	=	require('gulp-uglify'),
//	jshint      	=	require('gulp-jshint'),
//	
//	stripDebug  	=	require('gulp-strip-debug'),
//	imagemin    	=	require('gulp-imagemin'),

var processors = [
	require('postcss-mixins'),
	require('postcss-simple-vars'),
	require('postcss-nested'),
	require('autoprefixer-core')({ browsers: ['last 2 versions', '> 2%'] }),
	lost(),
	autoprefixer()
];



var javascripts = [
	// 'bower_components/jquery/dist/jquery.js',
	'bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js',
	'bower_components/detectizr/dist/detectizr.js',
	// 'bower_components/skrollr/dist/skrollr.min.js',
	'bower_components/enquire/dist/enquire.js',
	'bower_components/slick.js/slick/slick.js',
	// 'bower_components/select/select.min.js',
	// 'bower_components/jquery-validate/build/release.js',
	// 'bower_components/respondJS/respond.min.js',
	// 'bower_components/semantic/build/packaged/javascript/semantic.min.js',
	// 'bower_components/semantic-ui/build/uncompressed/modules/behavior/form.js',
	// 'bower_components/semantic-ui/build/uncompressed/modules/transition.js',
	// 'bower_components/foundation/js/foundation/foundation.js',
	// 'bower_components/foundation/js/foundation/foundation.interchange.js',
	// 'bower_components/foundation/js/foundation.js',
	'bower_components/fitvids/jquery.fitvids.js',
	'bower_components/waypoints/lib/jquery.waypoints.js',
	'bower_components/waypoints/lib/shortcuts/sticky.js',
	// 'js/*.js'
	// 'js/acfgooglemap.js',
	'bower_components/js-cookie/src/js.cookie.js',
	//	'bower_components/RRSSB/js/rrssb.js',
	'bower_components/pace/pace.js',
	'bower_components/jquery.scrollTo/jquery.scrollTo.js',
	'bower_components/ajaxchimp/jquery.ajaxchimp.js',
	'bower_components/share-button/build/share.js',
	'js/site.js'
]

var markupFiles = [
	'*.php',
	'partials/*.php',
	'views/*.twig',
	'**/*.html'
]

var javascripts_dest	= "js/build/";

var scss_files = [ 'scss/style.scss' ];

var css_dest			= "/";

var sprites_folder 		= 'img/icons',
	sprites_css_output 	= "../../styles/_sprite.styl",
	sprites_destination	= "img/iconsprites";


// Default Task

gulp.task('default', ['styles', 'js-dev', 'browser-sync', 'watch:styles', 'watch:minifyimages', 'watch:favicon'], function() {
	gulp.watch(javascripts, function() {
	    gulp.run('js-dev');
	});
	gulp.watch(markupFiles, ['bs-reload']);
});

gulp.task('watch:styles', function () {
	gulp.watch('**/*.styl', ['styles']);
});

gulp.task('watch:minifyimages', function () {
	gulp.watch('img/src/*', ['minifyimages']);
});

gulp.task('watch:favicon', function () {
	gulp.watch('img/favicon-original.png', ['favicons']);
});

// Production Task

gulp.task('production', ['styles-production', 'js-production'], function(){});



// svg png sprites

gulp.task('sprites', function () {
    return gulp.src('img/icons/**/*.svg')
	    // .pipe(svgo())
        .pipe(plugins.svgSprite({
        	"dest": sprites_destination,
            "mode": {
                "css": {
                    "layout": "vertical",
                    "common": "sprite",
                    "prefix": ".sprite-%s",
                    "dimensions": true,
                    "sprite": "sprite.svg",
                    "dest": "./",
                    "bust": false,
                    "render": {
                        "styl": {
                            "dest": sprites_css_output,
                            "template": "img/iconsprites/svgspritetemplate.styl"
                        }
                    }
                }
            }
        }))
	    .pipe(gulp.dest(sprites_destination))
	    .pipe(plugins.filter("**/*.svg"))
	    .pipe(plugins.svg2png())
	    .pipe(gulp.dest(sprites_destination));
});


// favicon creator

gulp.task('favicons', function () {
	favicons({
	    // I/O
	    source: 'img/favicon-original.png',
	    dest: 'img',

	    // Icon Types
	    android: true,
	    apple: true,
	    coast: true,
	    favicons: true,
	    firefox: true,
	    windows: true,

	    // Miscellaneous
	    html: 'img/favicons.html',
	    background: '#ffffff',
	    tileBlackWhite: true,
	    manifest: null,
	    trueColor: true,
	    logging: false,
	    callback: null
	})
});



// imagemin

gulp.task('minifyimages', function () {
    return gulp.src('img/src/*')
        .pipe(plugins.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('img'));
});



// Development

gulp.task('styles', function() {
	gulp.src('style.styl')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.stylus({
			use: [typographic(), nib(), axis(), rupture()]
			}))
		.pipe(plugins.postcss(processors))
		// .pipe(plugins.cssnano())
		.pipe(plugins.sourcemaps.write('./'))
		.pipe(gulp.dest('./'))
		.pipe(browserSync.reload({stream:true, notify: false}));
});

gulp.task('js-dev', function(){
	gulp.src(javascripts)
		// .pipe( uglify() )
		// .pipe( stripDebug() )
		.pipe( plugins.concat('site.js') )
		.pipe( gulp.dest(javascripts_dest) )
		.pipe(browserSync.reload({stream:true, notify: false}))
		.pipe(plugins.notify({ message: 'Development JS processed!'}));     // notify when done
});



// Production

gulp.task('styles-production', function() {
	gulp.src('style.styl')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.stylus({
			use: [typographic(), nib(), axis(), rupture()]
			}))
		.pipe(plugins.postcss(processors))
		.pipe(plugins.cssnano())
		.pipe(plugins.sourcemaps.write('./'))
		.pipe(gulp.dest('./'))
		.pipe(browserSync.reload({stream:true, notify: false}));
});

gulp.task('js-production', function(){
	gulp.src(javascripts)
		.pipe( plugins.uglify() )
		.pipe( plugins.stripDebug() )
		.pipe( plugins.concat('site.js') )
		.pipe( gulp.dest(javascripts_dest) )
		.pipe(browserSync.reload({stream:true, notify: false}))
		.pipe(plugins.notify({ message: 'Production JS processed!'}));     // notify when done
});



// Global

gulp.task('browser-sync', function() {
    browserSync.init({
        // proxy: "yourlocal.dev"
        // proxy: "localhost:8888/papercloud/Bladnoch",
        server: {
        	baseDir: "./"
        },
        browser: "google chrome canary",
        ghostMode: {
            clicks: true,
            location: true,
            forms: true,
            scroll: true
        }
    });
});

gulp.task('bs-reload', function() {
	browserSync.reload({notify: false});
});
