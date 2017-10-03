
var baseSlideWidth;

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
		1:2.6
	}

	if(!isOpen){
		var newslideheight = slideheight*newSlidesSize[slidenum];
		console.log(slideheight);
		console.log(newslideheight);
		slide.animate({height: String(newslideheight) + 'px'},animationduration);
		$('#background' + nextstringnum).animate({marginTop: String(newslideheight - slideheight)  +'px'},animationduration,function(){
					$('.content-wrapper').height($('body').height());
			});

		readmore.fadeToggle(animationduration/2, function(){
			text.fadeToggle(animationduration/2);
		});
	}
	else{
		slide.animate({height: String('45.36vw')},animationduration);
			$('#background' + nextstringnum).animate({marginTop: '0px'},animationduration,function(){
					$('.content-wrapper').height($('body').height());
			});
		text.fadeToggle(animationduration/2, function(){
			readmore.fadeToggle(animationduration/2);
		});
	}
	$('.content-wrapper').css('height','100%');
}


$(document).ready(function(){
});