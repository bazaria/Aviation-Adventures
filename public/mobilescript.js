
var pageMaxWidth = 770;

function baseSlideHeight () {
	if($(window).width()>pageMaxWidth){
		return String(Math.floor(pageMaxWidth*0.4536) + 'px');
	}
	else return '45.36vw';
}

function toggleslide (slidenum) {
	var stringnum = String(slidenum);
	var nextstringnum = String(slidenum + 1);

	var slide = $('#flex' + stringnum);
	var readmore = $('#read-more'+ stringnum);
	var text = $('#slide-body-text' + stringnum);
	var nextslide = $('#flex' + nextstringnum);
	var nextbackground= $('#background' + nextstringnum);

	var isOpen = (readmore.css('display') == 'none');

	var slideheight = parseInt(slide.height());
	var backgroundmargin = parseInt(nextbackground.css('top'));

	var animationduration = 300;

	var newSlidesSize = {
		1:2,
		2:2,
		3:2,
		4:4,
		5:1.5,
	}
	slide.removeClass('init-page');
	if(!isOpen){
		var newslideheight = slideheight*newSlidesSize[slidenum];
		console.log(slideheight);
		console.log(newslideheight);
		slide.animate({height: String(newslideheight) + 'px'},animationduration);
		$('#background' + nextstringnum).animate({marginTop: String(newslideheight - slideheight)  +'px'},animationduration);

		readmore.fadeToggle(animationduration/2, function(){
			text.fadeToggle(animationduration/2);
		});
	}
	else{
		slide.animate({height: baseSlideHeight()},animationduration);
			$('#background' + nextstringnum).animate({marginTop: '0px'},animationduration);
		text.fadeToggle(animationduration/2, function(){
			readmore.fadeToggle(animationduration/2);
		});
	}
}

$(document).ready(function(){
});
