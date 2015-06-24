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

			if(this.config.options.generator !== 'website'){
				$('sec').each(function(i, elem){
					var html = '<h2>' + $(this).data('title') + '</h2>';
					$(this).prepend(html);
				});
			}
			else
			{
				//render the section
				$('sec').each(function(){
					var html = $(this).html();
					var content = ''
						+ '<div class="panel panel-default">'
						+ '	<div class="panel-heading">'
						+ '		<h2>' + $(this).data('title') + '</h2>'
						+ '	</div>'
						+ '	<div class="panel-collapse collapse" id="' + $(this).data('id') + '">'
						+ ' 	<div class="panel-body">'
						+ html
						+ '		</div>'
						+ '	</div>'
						+ '</div>';
					$(this).html(content);

					if($(this).data('show'))
					{
						$(this).find('.panel-collapse.collapse').addClass('in');
						$(this).find('.panel-heading').children('h2').append('<a class="pull-right section atTitle" target="' + $(this).data('id') + '"><span class="fa fa-angle-down" /></a>');
					}
				});

				//add the toggle button
				$('.section').each(function(){
					if($(this).attr('show'))
						$(this).html("<b>"+ $(this).attr('show') +"</b><span class='fa fa-angle-down pull-left'/>");
					else
						$(this).html("<span class='fa fa-angle-down'/>");

					if($(this).hasClass('atTitle'))
						$(this).addClass('btn').addClass('btn-default');
					else
						$(this).addClass('btn').addClass('btn-primary');
				});
			}

			page.sections[0].content = $.html();
			return page;
		}
	}
};
