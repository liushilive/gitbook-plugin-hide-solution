function sectionToggle(tar){

	var target = $('#' + tar);
	target.collapse("toggle");

	var targetParent = target.parents('sec');
	if(!targetParent.data('show'))
	{
		targetParent.data('show', true);
		targetParent.html(targetParent.find('.panel-body').html());
		renderSection(targetParent);
	}
}

var renderSection = function renderSection(target){

	target.find('delete').remove();

	var html = target.html();
	var content = ''
		+ '<div class="panel panel-default">'
		+ '	<div class="panel-heading">'
		+ '		<title_here></title_here>'
		+ '	</div>'
		+ '	<div class="panel-collapse collapse">'
		+ ' 	<div class="panel-body">'
		+ html
		+ '		</div>'
		+ '	</div>'
		+ '</div>';

	target.html(content);
	target.find('title_here').html('<h2>' + target.data('title') + '</h2>');
	target.find('.panel-collapse.collapse').attr("id", target.data('id'));

	if(target.data('show'))
	{
		target.find('.panel-collapse.collapse').addClass('in');
		target.find('.panel-heading').children('title_here').children('h2').append('<a class="pull-right section atTitle" target="' + target.data('id') + '"><span class="fa fa-angle-down" /></a>');
	}

	target.find('.section').each(function(){
		if($(this).attr('show'))
			$(this).html("<b>"+ $(this).attr('show') +"</b><span class='fa fa-angle-down pull-left'/>");
		else
			$(this).html("<span class='fa fa-angle-down'/>");

		if($(this).hasClass('atTitle'))
			$(this).addClass('btn').addClass('btn-default');
		else
			$(this).addClass('btn').addClass('btn-primary');

		clickAction($(this), $(this).attr('target'));
	});
};


var clickAction = function clickAction(source, tar){

	source.click(function(){

		var target = '#' + tar;
		sectionToggle(tar);

		$(target).on('show.bs.collapse', function(){
			if(source.attr('hide'))
				source.html("<b>"+ source.attr('hide') +"</b><span class='fa fa-angle-up pull-left'/>");
			else
				source.html("<span class='fa fa-angle-up'/>");
		});

		$(target).on('hide.bs.collapse', function(){
			if(source.attr('show'))
				source.html("<b>"+ source.attr('show') +"</b><span class='fa fa-angle-down pull-left'/>");
			else
				source.html("<span class='fa fa-angle-down'/>");
		});
	});
};

(function(){

	var init = function init(){


		$('sec').each(function(){
			renderSection($(this));
		});
	};

	require(["gitbook"], function(gitbook) {

		gitbook.events.bind("page.change", function(){
			init();
		});
		
	});

})();
