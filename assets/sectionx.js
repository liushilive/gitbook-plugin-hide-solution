function sectionToggle(tar){
	$('#'+tar).collapse('toggle');

	var $button = $('#'+tar).parents('sec').find('.section.atTitle');
	if($button.hasClass('hidden')){
		$button.removeClass('hidden').hide().show('slow');
		clickAction($button, $button.attr('target'));
	}
}

var clickAction = function clickAction($source, tar){
	$source.click(function(){
		sectionToggle(tar);
	});

	$('#'+tar).on('show.bs.collapse', function(){
		$source.html($source.attr('hide')?
			('<b>' + $source.attr('hide') + '</b><span class="fa fa-angle-up pull-left"/>'):
			'<span class="fa fa-angle-up"/>');
	});

	$('#'+tar).on('hide.bs.collapse', function(){
		$source.html($source.attr('show')?
			('<b>' + $source.attr('show') + '</b><span class="fa fa-angle-down pull-left"/>'):'<span class="fa fa-angle-down"/>');
	});
};

require(["gitbook"], function(gitbook) {
	gitbook.events.bind("page.change", function(){
		$('.section').each(function(){
			clickAction($(this), $(this).attr('target'));
			if(!$(this).hasClass('atTitle')){
				$(this).addClass('btn btn-primary');
				$(this).html($(this).attr('show')?
					('<b>'+ $(this).attr('show') +'</b><span class="fa fa-angle-down pull-left"/>'):
					'<span class="fa fa-angle-down"/>');
			}
		});
	});
});
