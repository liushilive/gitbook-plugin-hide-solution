function sectionToggle(tar){

	var $target = $('#' + tar);
	$target.collapse("toggle");

	var $targetParent = $target.parents('sec');

	if(!$targetParent.data('show'))
	{
		$targetParent.data('show', true);
		$targetParent.find('.panel-heading').children('h2').append('<a class="pull-right section atTitle btn btn-default" target="' + $targetParent.data('id') + '"><span class="fa fa-angle-down" /></a>');
		clickAction($targetParent.find('.section.atTitle'), $targetParent.find('.section.atTitle').attr('target'));
	}
}

var clickAction = function clickAction($source, tar){

	$source.click(function(){

		var $target = $('#' + tar);
		sectionToggle(tar);

		$target.on('show.bs.collapse', function(){
			if($source.attr('hide'))
				$source.html("<b>"+ $source.attr('hide') +"</b><span class='fa fa-angle-up pull-left'/>");
			else
				$source.html("<span class='fa fa-angle-up'/>");
		});

		$target.on('hide.bs.collapse', function(){
			if($source.attr('show'))
				$source.html("<b>"+ $source.attr('show') +"</b><span class='fa fa-angle-down pull-left'/>");
			else
				$source.html("<span class='fa fa-angle-down'/>");
		});
	});
};

(function(){

	require(["gitbook"], function(gitbook) {
		gitbook.events.bind("page.change", function(){
			$('.section').each(function(){
				clickAction($(this), $(this).attr('target'));
			});
		});
	});

})();
