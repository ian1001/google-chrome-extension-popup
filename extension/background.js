/*  Chrome extension popup background js
 Just testing how to develop the Chrome Extension
 This is note writing and store into localStorage of chrome. */


//Background.js and JQuery function
$(document).ready(function() {
myvar = []; // storage variable	

/* initial the popup 
 if this is the first time click, it will go to the catch err to initial the first localStorage, and refresh popup
 else it will generate the popup innterHTML by localStorage. */
try {
myvar =  JSON.parse(localStorage.note); 
	for (i = myvar.length - 1; i > -1; i--) {
		if( myvar[i]['isdelete'] == 0 ){
			document.getElementById("pop").innerHTML +='<div class="section" name='+myvar[i]['name']+'><textarea class="text">'+myvar[i]['text']+'</textarea><span class="close">×</span></div>';
		}
	}
}
catch(err) {
myvar[0] = {name:0, text:'', isdelete:0};
localStorage.note = JSON.stringify(myvar);
window.location.href="background.html";
}

// initial the height of each textarea.
$('.text').each(function(i, obj) {
   $(this).height( 0 );
   $(this).height( this.scrollHeight );
});

// add one empty textarea, store in the localStorage, then refresh popup.
$( "#add" ).click(function() {
var	textid = myvar.length;
myvar[textid] = {name:textid, text:'', isdelete:0};
localStorage.note = JSON.stringify(myvar);
window.location.href="background.html";
});

// make textarea height auto.
$(".text").keyup(function(){
   $(this).height( 0 );
   $(this).height( this.scrollHeight);
});

// make textarea not show
$( ".close" ).click(function() {
$(this).parent().hide(); 	
var	textid = $(this).parent().attr('name');
myvar[textid] = {name:textid, text:myvar[textid]['text'], isdelete:1};
localStorage.note = JSON.stringify(myvar);
window.location.href="background.html";
});

// focus on the textarea, it will show this close button and hide others.
$('.text').focus(function(){
	$(".close").hide();
	$(this).parent().children(".close").show();
});

// focusout one textarea, store textarea into localStorage.
$('.text').focusout(function(){
 	var	textid = $(this).parent().attr('name');
	myvar[textid] = {name:textid, text:$(this).val(), isdelete:0};
	localStorage.note = JSON.stringify(myvar);
});

// No meaning, just show and hide.
$( "#set" ).click(function() {
	if( document.getElementById("set").innerHTML == "*"){document.getElementById("set").innerHTML = "<-";}
	else{document.getElementById("set").innerHTML = "*";}
	$(".setup").toggle('slow');
	$(".main").toggle('slow');
});

// No meaning, just show and hide.
$( "#back" ).click(function() {
	$(".setup").toggle('slow');
	$(".main").toggle('slow');
});
});