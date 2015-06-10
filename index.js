var jade = require('jade');

module.exports = {

	website: {
		assets: "./assets",
		js: [
			"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js",
			"sectionx.js"
		],
		css: [
			"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css",
			"sectionx.css"
		]
	},

	hooks: {

		"page": function(page){
			page.sections[0].content = page.sections[0].content
										.replace(/\<!--sec /g, '<sec ')
										.replace(/\ ces-->/g, '>')
										.replace(/\<!--endsec-->/g, '</sec>')
			return page;
		}
	}
};
