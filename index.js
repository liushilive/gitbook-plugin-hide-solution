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

			var content = page.sections[0].content;

			var match = content.match(/<!--sec[\s\S]+?ces-->/g);

			if(match){
				var error = [];

				match.forEach(function(item, i){
					if(!item.match(/data-title="[^"]+?"\s/))
						error.push([item, 'A valid title is missing.']);
					else if(!item.match(/data-id="[\w\d]+?"\s/))
						error.push([item, 'A valid id is missing.']);
					else if(!item.match(/data-show=true\s/) && !item.match(/data-show=false\s/) && item.match(/data-show=/))
						error.push([item, 'data-show is set to invalid value']);

					var idMap = {};
					var id = item.match(/data-id="[\w\d]+?(?=")/);

					if(id){
						id = id[0].replace('data-id="', '');
						if(id in idMap)
							error.push([item, 'the id of this section is not unique.']);
						else
							idMap[id] = true;
					}	
				});

				if(error.length > 0){

					var msg = [];
					msg.push('\n\033[93m[gitbook-plugin-sectionx]('+ page.path +')');
					msg.push('*** There exists some syntax error in the following lines: ***\033[0m\n');

					error.forEach(function(item){
						msg.push(item[0]);
						msg.push('\033[93m'+item[1]+'\n\033[0m');
					});

					console.log(msg.join('\n'));
					page.sections[0].content = '<p class="alert alert-danger">TO AUTHOR: There exists some syntax error in this page, check the build log for details.</p>';
				
				} else {

					content = content.replace(/\<!--sec\s/g, '<sec ').replace(/\sces-->/g, '>').replace(/\<!--endsec-->/g, '</sec>');

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
