var init = function init(){

	[insert jQuery here]

};

require(["gitbook"], function(gitbook) {
	gitbook.events.bind("page.change", function(){
		init();
	});

	$(window).bind('load',function(){
		init();
	});
});