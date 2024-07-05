import { rollup } from 'rollup';
import resolve 	  from '@rollup/plugin-node-resolve';
import babel 	  from '@rollup/plugin-babel';
import multi 	  from '@rollup/plugin-multi-entry';
import terser 	  from '@rollup/plugin-terser';


/**
 * Компиляция и минификация js-файлов
 */
const CompilationScript = ((cb) => {

    const main = (cb) => {

		return rollup({
				input: configuration.source.script.main,
				plugins: [
					multi(),
					resolve(),
					babel({
						"babelHelpers": "runtime",
						"exclude": [
							"**/node_modules/**",
							"./app/libs/**"
						]
					}),
					terser()
				]
			})
			.then(bundle => {

				return bundle.write({
					file: `${configuration.build}/js/main.js`,
					format: 'iife',
					sourcemap: isDev
				});

			});

        cb();

    };


    const min = (cb) => {

        deleteSync(`${configuration.build}/js/build.min.js`);

        return gulp.src([`${configuration.build}/js/**/*.js`], { sourcemaps: isDev })
            .pipe(concat('build.min.js'))
            .pipe(gulp.dest(`${configuration.build}/js/`, { sourcemaps: '.' }))
            .pipe(browserSync.reload({stream:true}))
			.on('end', function() {
				deleteSync([
					`${configuration.build}/js/**/*.js`,
					`!${configuration.build}/js/build.min.js`,
					`!${configuration.build}/js/build.min.js.map`
				]);
			});

        cb();

    }


    return { main, min };

})();


export default CompilationScript;
