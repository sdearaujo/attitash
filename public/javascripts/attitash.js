$('#send_tash .new_tash,#send_tash_modal .new_tash').keyup(function (){
        var formId = $(this).context.parentNode.id;
        var textInput = '#' + formId + ' .new_tash';
        var textLabel = '#' + formId + ' .chars_left > small';
        $(textLabel).text(140-$(textInput).val().length);
});
$('#send_tash .new_tash, #send_tash_modal .new_tash').keydown(function(e){
    //if it's too long and the key pressed isn't backspace or delete
    if($(this).val().length >= 140 && e.which !== 8 && e.which !== 46){ 
        return false;
    }
});
$('#send_tash,#send_tash_modal').submit(function(e) {
    e.preventDefault();
    $.ajax({
        method: "POST",
        url: "/tash/create",
        success: function(data, textStatus, jqXHR){
            console.log("DATA:" + data);
        }
        error: function(jqXHR, textStatus, errorThrown){
            console.log("error: " + errorThrown);
        }
    });
    // e.preventDefault();
    // var that = $(this);
    // var queryString = '#' + $(this).attr('id') + ' .new_tash';
    // if($(queryString).val().length < 1){
    //     $('.alert-error').fadeIn(200).delay(4000).fadeOut(200);
    //     return false;
    // }
    // $('#tashs').prepend(
    //     '<li><div class="media"><a class="pull-left" href="#"><img class="media-object img-rounded" src="/images/attitash-dev-prof-pic.jpeg"></a><div class="media-body"><span class="pull-right date">Mar 6</span><h5 class="media-heading"><a href="#">AttitashDev</a> <small>@AttitashDev</small></h5>' + $(queryString).val() + '</div></div></li>');
    // $(queryString).val("");
    // var textLabel = '#' + $(this).attr('id') + ' .chars_left > small';
    // $(textLabel).text("140");
    // $('.alert-send_tash').fadeIn(200).delay(4000).fadeOut(1000);
    // $('#myModal').modal('hide');
    // return false;
});

$('.search-query').typeahead({
    source: ['Jerry Seinfeld', 'George Costanza', 'Cosmo Kramer', 'John Coschigano', 'Brain Dragunas', 'Samuel Nascimento', 'Anthony Battaglia'],
});
