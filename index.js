var jade = require('jade');
var cheerio = require('cheerio');

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
			page.sections[0].content = page.sections[0].content.replace(/\<!--sec /g, '<sec ').replace(/\ ces-->/g, '>').replace(/\<!--endsec-->/g, '</sec>');

			var $ = cheerio.load(page.sections[0].content);

			$('sec').each(function(i, elem){
				var html = '<delete><h2>' + $(this).data('title') + '</h2></delete>';
				$(this).prepend(html);
			});

			page.sections[0].content = $.html();

			return page;
		}
	}
};
