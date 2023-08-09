$('.menu__btn').on('click',function(){
	$('nav').addClass('nav_active');
});
$('.menu__close, .menu__close-all').on('click',function(){
	$('nav').removeClass('nav_active');
});
$('.b-popup__close-up, .b-popup__close').on('click',function(){
	$('.b-popup').fadeOut(100);
	$('.messages').fadeOut(100);
});
$('.button_competition-participate, .personal-area_register').on('click',function(){
	$('.b-popup_register').fadeIn(100);
});
$('.personal-area_enter').on('click',function(){
	$('.b-popup_enter').fadeIn(100);
});
$('.b-popup__forget').on('click',function(){
	$('.b-popup').fadeOut(0);
	$('.b-popup_recovery').fadeIn(0);
});
$('.button_competition-send').on('click',function(){
	$('.messages').fadeIn(100);
});