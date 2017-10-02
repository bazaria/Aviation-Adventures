

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
	if(!isOpen){
		var newslideheight = slideheight*1.2;
		console.log(slideheight);
		console.log(newslideheight);
		slide.animate({height: String(newslideheight) + 'vw'},animationduration);
		for(i=slidenum + 1;i<7;i++){
			$('#background' + String(i)).animate({top: String(newslideheight)  +'px'},animationduration);
		}
		readmore.fadeToggle(animationduration/2, function(){
			text.fadeToggle(animationduration/2);
		});
	}
	else{
		slide.animate({height: String('45.36vw')},animationduration);
		for(i=slidenum + 1;i<7;i++){
			$('#background' + String(i)).animate({top: '0px'},animationduration);
		}
		text.fadeToggle(animationduration/2, function(){
			readmore.fadeToggle(animationduration/2);
		});
	}
	$('.content-wrapper').css('height','100%');
}