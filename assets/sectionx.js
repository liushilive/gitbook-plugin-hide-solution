function sectionToggle(tar){
	var $target = $('#'+tar);
	var $panel = $target.parents('.panel');

	$target.collapse('toggle');

	if($target.parents('sec').data('show') === false)
		$panel.toggle('slow');
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

		$('sec').each(function(){
			if($(this).find('.panel').hasClass('hidden'))
				$(this).find('.panel').removeClass('hidden').hide();
		});
	});
});
