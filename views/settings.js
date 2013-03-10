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
		$('#div' + buttontype).fadeIn(300);
			}
	else{
		$('#div'+ lastselected).fadeOut(300, function() {
		   $('#div' + slected).fadeIn(300);
		  });//function() {
	}//if (selected==''){
	lastselected = selected;
  });// $('input[name="PaymentType"]').change(function() {
	}

  
});//$(document).ready(function(){