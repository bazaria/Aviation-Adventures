
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

	var isOpen = !(text.css('display') == 'none');

	var slideheight = parseInt(slide.height());
	var backgroundmargin = parseInt(nextbackground.css('top'));

	var animationduration = 300;

	var newSlidesSize = {
		1:2,
		2:2,
		3:2,
		4:2.5,
		5:1.5,
	}
	slide.removeClass('init-page');
	slide.css('-moz-border-radius','3px');
	slide.css('-webkit-border-radius','3px');
	slide.css('border-radius','3px');
    readmore.toggleClass("arrowDown");
	text.fadeToggle(animationduration);
	if(slidenum === 4){
		$('.gallery-ext').fadeToggle(animationduration,function(){
			if ($(this).is(':visible'))
        	$(this).css('display','inline-block');
		});
	}
	if(!isOpen){
		var newslideheight = slideheight*newSlidesSize[slidenum];
		console.log(slideheight);
		console.log(newslideheight);
		slide.animate({height: String(newslideheight) + 'px'},animationduration);
		$('#background' + nextstringnum).animate({marginTop: String(newslideheight - slideheight)  +'px'},animationduration);

	}
	else{
		slide.animate({height: baseSlideHeight()},animationduration);
		$('#background' + nextstringnum).animate({marginTop: '0px'},animationduration);
	}
}

$(document).ready(function(){
	for(var i =1;i<6;i++)
	{
		$('#read-more'+String(i)).click(function(){
			toggleslide(parseInt(this.id.slice(-1)));
		});
	}
	$('#form-opener').click(function(){
		$('#book-modal-container').css('display','block');
	});
	$('#close-form-button').click(function(){
		$('#book-modal-container').css('display','none');
	});
	$(window).click(function(e){
		if(e.target.id=="book-modal-container")
		{
			$('#book-modal-container').css('display','none');
		}
	});
	$('#order_form').on("submit",function(){
        var url = "/order";
        $.ajax({
            type: "POST",
            url: url,
            data: $('#order_form').serialize(),
            success: function(data){
            	if(data != '0')
            	{
								$('#book-modal-container').css('display','none');
								if(data=="1"){
									 Materialize.toast('Ошибка отправки электронной почты. Пожалуйста, повторите попытку позже.', 4000)
								 }
								else{
								 Materialize.toast("Отправлено по электронной почте. С вами свяжутся в ближайшее время.", 4000)
								}
                }
            }
        });
        return false;
    });
	$('select').material_select();
});
