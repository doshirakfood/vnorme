import sass from "gulp-dart-sass";
import cleanCSS from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import base64 from "gulp-base64-inline";

/**
 * Компиляция и минификация css-файлов
 */
const CompilationCSS = ((cb) => {
	const main = (cb) => {
		return gulp
			.src(configuration.source.css.main)
			.pipe(cache("css"))
			.pipe(gulpif(isDev, sourcemaps.init()))
			.pipe(
				sass({
					includePaths: ["./app/components/"],
				}).on(
					"error",
					notify.onError({
						message: "<%= error.message %>",
						title: "CSS Error!",
						onLast: true,
					}),
				),
			)
			.pipe(base64(configuration.source.base64))
			.pipe(autoprefixer(["last 15 versions", ">1%", "ie 9"], { cascade: false })) // Автоматическая вставка префиксов
			.pipe(gulpif(isDev, sourcemaps.write(".")))
			.pipe(gulp.dest(`${configuration.build}/css/`))
			.pipe(browserSync.reload({ stream: true }));

		cb();
	};

	const min = (cb) => {
		deleteSync(`${configuration.build}/css/build.min.css`);

		return gulp
			.src([`${configuration.source.css.libs}`, `${configuration.build}/css/**/*.css`], { sourcemaps: isDev })
			.pipe(concat("build.min.css"))
			.pipe(gulpif(!isDev, cleanCSS()))
			.pipe(gulp.dest(`${configuration.build}/css/`, { sourcemaps: "." }))
			.pipe(browserSync.reload({ stream: true }))
			.on("end", function () {
				deleteSync([
					`${configuration.build}/css/**/*`,
					`!${configuration.build}/css/build.min.css`,
					`!${configuration.build}/css/build.min.css.map`,
				]);
			});

		cb();
	};

	return { main, min };
})();

export default CompilationCSS;
