
export const fontsStyle = () => {
	let fontStyleFile = `${app.path.srcFolder}/scss/fonts.scss`;
	app.plugins.fs.readdir(app.path.build.fonts, (err, fontsFiles) => {
		if (fontsFiles) {
			if (!app.plugins.fs.existsSync(fontStyleFile)) {
				// Можно оставить if-else как в уроке вместо Map
        const fontWeightMap = new Map([
					["thin", 100],
					["extralight",200],
					["light", 300],
					["regular", 400],
					["medium", 500],
					["semi", 600],
					["bold", 700],
					["extrabold", 800],
					["black", 900] 
				]);
				app.plugins.fs.writeFile(fontStyleFile, '', cb);
				let newFileOnly;
				for (let i = 0; i < fontsFiles.length; i++) {
					let fontFileName = fontsFiles[i].split('.')[0]
					if (newFileOnly !== fontFileName) {
						// В новую переменную получаем параметры шрифта
            let fontParams = fontFileName.split('-') ? fontFileName.split('-') : fontFileName;
						// Вытаскиваем из них название шрифта тернарный оператор нужен на случай когда подключаем icons.woff или типа того
            let fontName = fontParams[0] ? fontParams[0] : fontFileName;
            // Теперь сохраняем там только начертание и вес шрифта
						fontParams = fontParams[1] ? fontParams[1] : fontFileName;
            // Разделяем их 
						fontParams = fontParams.split(/(?!^)(?=[A-Z])/)
						//и сохраняем в отдельные переменные 
						let fontWeight = fontParams[0] ? fontParams[0]: fontFileName;
						let fontStyleValue = fontParams[1];
						// Выяснилась проблема со шрифтами semibold там получаем "semi" как fontWeight и "bold", как начертание
						console.log(fontWeight.toLowerCase())
            // Проходимся по Map и меняем строку на значение. Если оставить этот блок, как было в уроке на if-else, то проблем со шрифтами semibold не будет
						if (fontWeightMap.has(fontWeight.toLowerCase()))fontWeight = fontWeightMap.get(fontWeight.toLowerCase())
						// Нужно для того случая, когда подключаем icons.woff
            else {
							fontStyleValue = fontWeight
							fontWeight = 400
						}
            // Ну и проверяем есть ли у нас fontStyle 
						if (fontStyleValue != null || fontStyleValue != undefined) fontStyleValue = fontStyleValue.toLowerCase()
						else fontStyleValue = "normal";

						app.plugins.fs.appendFile(fontStyleFile,
							`@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontStyleValue};\r\n}\r\n`, cb);
						newFileOnly = fontFileName;
					}
				}
			}
			else console.log("файл scss/fonts.scss уже существует. Для обновления его нужно удалить и запустить fontsStyle заново.")
		}
	})
	return app.gulp.src(`${app.path.srcFolder}`)
	function cb() { }
}
