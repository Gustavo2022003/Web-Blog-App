$(document).ready(function(){
    function resizeTextareaAndDiv() {
        var lineHeight = parseInt($('.post-message').css('line-height'));
        var numLines = $('#postMessage').prop('scrollHeight') / lineHeight;
        var newHeight = numLines * lineHeight;
        $('.post-message').css('height', newHeight + 'px');
        $('.post').height(newHeight + $('.post-header').outerHeight(true));
    }

    resizeTextareaAndDiv();

    $('#postMessage').on('input', function() {
        resizeTextareaAndDiv();
    });

    $('#postMessage').on('keyup', function() {
        if ($(this).val() === '') {
            $('.post-message').css('height', '');
            $('.post').height($('.post-header').outerHeight(true));
        }
    });

    $("#button-icon-edit").click( () => { 
        $("#background-confirm").css("display", "flex"); 
    });
});