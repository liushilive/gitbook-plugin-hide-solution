function sectionToggle(tar, button){
	var $target = $('#'+tar);

	if(button)
		$target.parents('.panel').slideToggle('slow');
	else
		$target.collapse('toggle', 'slow');
}

var clickAction = function clickAction($source, tar){
	$source.click(function(){
		sectionToggle(tar, !$(this).hasClass('atTitle'));
		if(!$(this).hasClass('atTitle'))
			$(this).toggleClass('btn-info').toggleClass('btn-success');
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

require(["gitbook", "jquery"], function(gitbook, $) {

	gitbook.events.bind("page.change", function(){
		$('.section').each(function(){
			clickAction($(this), $(this).attr('target'));
			if(!$(this).hasClass('atTitle')){
				$(this).addClass('btn btn-info');
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
