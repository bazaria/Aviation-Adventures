
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
		5:3,
		6:1.5,
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

	if(slidenum === 5){
		$('.next-advanture').fadeToggle(animationduration);
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


function next_advantures_loader(){
	
	$.ajax({
		type: "GET",
		url: "/advantures",
		success: function(data){
			var advantures = JSON.parse(data);
			for(prop in advantures)
			{
				$('#advanture' + String(prop)).attr('src','next/' + advantures[prop][0] + '.png').click(function(e){
                    open_contact_form(advantures[e.target.id[e.target.id.length - 1]][1]);
                });
                $('#select_adventure').append($('<option>',{
                    value: advantures[prop][1],
                    text : advantures[prop][2],
                }));
			}
		}
	});
}

function open_contact_form(advanture){
	$('#book-modal-container').css('display','block');
	console.log(advanture);
	$('#select_adventure').val(advanture);
	$("#select_adventure").material_select();
}


$(document).ready(function(){
	for(var i =1;i<7;i++)
	{
		$('#read-more'+String(i)).click(function(){
			toggleslide(parseInt(this.id.slice(-1)));
		});
	}
	$('#form-opener').click(function(){
		open_contact_form('none');
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

	next_advantures_loader()
});
