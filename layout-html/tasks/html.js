import nunjucksRender from 'gulp-nunjucks-render';


/**
 * Компиляция html-файлов
 */
const CompilationHTML = (cb) => {
	const renderParams = {
		path: configuration.source.html.templates
	};

    return gulp.src(configuration.source.html.main, { since: gulp.lastRun(nunjucksRender) })
        .pipe(cache('html'))
        .pipe(nunjucksRender(renderParams)).on('error', notify.onError({
            message: "<%= error.message %>",
            title  : "HTML Error!",
            onLast: true
        }))
        .pipe(beautify.html({ indent_size: configuration.indent_size }))
        .pipe(gulp.dest(configuration.build))
        .pipe(browserSync.reload({stream:true}))

    cb();

};


export default CompilationHTML;
