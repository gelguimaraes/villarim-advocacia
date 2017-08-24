// JavaScript Document
$(document).ready(function() {	
	"use strict";
	$("a[name=modal]").click(function(e) {
		e.preventDefault();
		
		var id = $(this).attr('href');
	
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
	    //alert("altura:"+maskHeight+" \nlargura:"+maskWidth);
		
		$('.mask').css({'width':maskWidth,'height':maskHeight});
		$('.mask').fadeIn(1000);
			
		$(id).fadeIn(1000); 
	
	});
	
	$('.window .close').click(function (e) {
		e.preventDefault();
		$('.mask').fadeOut(500);
		$('.window').fadeOut(500);
	});		
	
	$('.mask').click(function () {
		$(this).fadeOut(500);
		$('.window').fadeOut(500);
	});	
	
	$('#menu-anchor').on('click touchstart', function(e){
		$('html').toggleClass('menu-active');
		e.preventDefault();
	});
	
	$(window).scroll(function(){
		if ($(this).scrollTop() < 500) {
			$('.scrollToTop').fadeOut(1000);
			
		} else {
			$('.scrollToTop').fadeIn(1000);
		}
	});
	
	//Click event to scroll to top
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},1000);
		return false;
	});
	
});