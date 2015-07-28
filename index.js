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

			var content = page.sections[0].content,
				match = content.match(/<!--\s*sec[\s\S]+?ces\s*-->[\s\S]+?<!--\s*endsec\s*-->/g),  // check if section is defined in page
				idList = [];

			if(match){
				var error = [];

				match.forEach(function(item, i){

					var header = item.match(/<!--\s*sec[\s\S]+?ces\s*-->/)[0],
						body = item.replace(/<!--\s*sec[\s\S]+?ces\s*-->/, '').replace(/<!--\s*endsec\s*-->/, '');

					if(/<!--\s*sec/.test(body)) //contain nested sections
						error.push([header, 'Nested sections are not supported by this plugin.']);

					var title = item.match(/data-title\s*=\s*"[^"]+?"\s/);
					if(title)
						title = title[0].match(/"[^"]+?"/)[0].replace(/"/g, '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
					else
						error.push([header, 'A valid title is missing.']);

					var id = item.match(/data-id\s*=\s*"[\w\d]+?"\s/);
					if(id){
						id = id[0].match(/"[^"]+?"/)[0].replace(/"/g, '');
						if(idList.indexOf(id) >= 0)
							error.push([header, 'The id for the section is not unique.']);
						else
							idList.push(id);
					}
					else
						error.push([header, 'A valid id is missing.']);

					var show;
					if(item.match(/data-show\s*=\s*.+?\s/)){
						if(item.match(/data-show\s*=\s*true\s/))
							show = true;
						else if(item.match(/data-show\s*=\s*false\s/))
							show = false;
						else
							error.push([header, 'Attribute "data-show" is set to invalid value.']);
					}

					content = content.replace(/\<!--\s*sec\s/g, '<sec ').replace(/\sces\s*-->/g, '>').replace(/\<!--\s*endsec\s*-->/g, '</sec>');
				});

				if(error.length > 0){
					console.log('\n\033[93m****** [gitbook-plugin-sectionx]('+page.path+') ******\033[0m\n');
					error.forEach(function(item){
						console.log('\u001B[31m*** Error: '+item[1]+' Please fix the syntax for the following section:\033[0m');
						console.log(item[0]+'\n');
					});
				} else {

					var $ = cheerio.load(content);

					if(this.config.options.generator === 'website'){

						$('sec').each(function(){

							var html = $(this).html();
							var title = $(this).data('title').replace(/</g, '&lt;').replace(/>/g, '&gt;');

							var content = ''
								+ '<div class="panel panel-default">'
								+ '	<div class="panel-heading">'
								+ '		<h2>' + title + '</h2>'
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
					else
					{
						$('sec').each(function(i, elem){
							var title = $(this).data('title').replace(/</g, '&lt;').replace(/>/g, '&gt;');
							$(this).prepend('<h2>' + $(this).data('title') + '</h2>');
						});
					}

					page.sections[0].content = $.html();
				}
			}

			return page;
		}
	}
};
