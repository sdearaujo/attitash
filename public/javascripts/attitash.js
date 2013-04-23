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

$('#send_tash').submit(function(e){
    e.preventDefault();
    var content = $('#tash_content').val();
    if(content.length == 0){
        return false;
    }
    $.ajax({
        method: "POST",
        url: "/tash/create",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ "content":content }),
        success: function(data, textStatus, jqXHR){
            var tash = data[0];
            var formattedTash = formatTash(tash.content);
            var li = '<li><div class="media"><a class="pull-left" href="#"><img class="media-object img-rounded" src="/images/attitash-dev-prof-pic.jpeg"></a><div class="media-body"><span class="pull-right date">' + tash.tdate + '</span><h5 class="media-heading"><a href="#">' + tash.fname + ' ' + tash.lname + '</a> <small>@' + tash.uname + '</small></h5><div class="wrap-tash">' + formattedTash + '</div></div></div></li>';
            $(li).hide().prependTo('#tashs').fadeIn(600);
            $('#tash_content').val('');
            var textLabel = '#' + $(this).attr('id') + ' .chars_left > small';
            $('#send_tash .chars_left > small').text("140");
            $('#tash_success').fadeIn(500).delay(4000).fadeOut(1000);
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(errorThrown);
            $('#tash_error').fadeIn(500).delay(5000).fadeOut(1000);
        }
    });
});

$('#loginForm').submit(function(){
    var username = $('#auname').val();
    $.cookie("auname", username);
    console.log($.cookie("auname"));
});

$('#logout').click(function(){
    var cookie = $.cookie("auname");
    if(cookie){
        $.removeCookie("auname");
    }
});

function formatTash(tash){
        var finalContent = "";
        array = tash.split(" ");
        for(var i = 0; i<array.length; i++){
                if(array[i].charAt(0) == '#'){
                                finalContent = finalContent.concat("<a href=\"");
                                finalContent = finalContent.concat(array[i]);
                                finalContent = finalContent.concat("\">");
                                finalContent = finalContent.concat(array[i]);
                                finalContent = finalContent.concat("</a>");
                }
                else if(array[i].charAt(0) == '@'){
                                finalContent = finalContent.concat("<a href=\"");
                                finalContent = finalContent.concat(array[i]);
                                finalContent = finalContent.concat("\">");
                                finalContent = finalContent.concat(array[i]);
                                finalContent = finalContent.concat("</a>");
                }
                else{
                        finalContent = finalContent.concat(array[i]);
                }
                finalContent = finalContent.concat(" ");
        }
        return finalContent;
}
