//**************    JQuerry document ready function ********************
var lastselected='';
$(document).ready(function(){
//********************************
// Event Handlers
//********************************
//make noselected equal to something when a button is clicked

 $('button[name="vbuttons"]').click(function() {
  var selected = this.value;

	if (lastselected==''){
		$('#div' + selected).fadeIn(300);
			}
	else{
		$('#div'+ lastselected).fadeOut(300, function() {
		   $('#div' + selected).fadeIn(300);
		  });//function() {
	}//if (selected==''){
	lastselected = selected;
  });// 
	

  
});//$(document).ready(function(){