var jade = require('jade');
var marked = require('marked');

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

	blocks: {

		section: {
			process: function(blk) {

				var data = '';

					data+=	'.panel.panel-default' + '\n';
					data+=	'	.panel-heading' + '\n';

				if(blk.kwargs.show) {
					data+=	'		h2 #{title}' + '\n';
					data+=	'			a.pull-right.section.atTitle(target="' + blk.kwargs.id + '")' + '\n';
					data+=	'				span.fa.fa-times' + '\n';
					data+=	'	.panel-collapse.collapse.in(id=sectionName)' + '\n';
				}
				else
				{
					data+=	'		h2 #{title}' + '\n';
					data+=	'	.panel-collapse.collapse(id=sectionName)' + '\n';
				}
	
					data+=	'		.panel-body' + '\n';
					data+=	'			!=content' + '\n';

				return jade.render(data, {title: blk.kwargs.title, content: marked(blk.body), sectionName: blk.kwargs.id});
			}
		},
	}
};
