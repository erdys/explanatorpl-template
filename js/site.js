$(document).ready(function() {
    $('.drawer').drawer();
});

$('.drawer-close').click(function(e) {
    e.preventDefault();
    $('.drawer').drawer('close');
});

$('.input-number-increment').click(function() {
    var $input = $(this).parents('.input-group').find('.input-number');
    var val = parseInt($input.val(), 10);
    $input.val(val + 1);
});

$('.input-number-decrement').click(function() {
    var $input = $(this).parents('.input-group').find('.input-number');
    var val = parseInt($input.val(), 10);
    $input.val(val - 1);
})

$('.dropdown-menu li a').click(function(){
    var selText = $(this).text();
    $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <i class="icon icon--arrow-down"></i>');
});

$('.js-popup-close').click(function(e) {
    e.preventDefault();
    $(this).parent().slideUp('slow');
    $('body').find('.contentbox-main-hld').removeClass('js-overflow');
    $(this).parent().addClass('js-popup-hide');
    $(this).parent().removeClass('js-popup-show');

});

$('.js-popup-show').click(function(e) {
    e.preventDefault();
    $('body').find('.popup-inline').slideDown('slow');
    $('body').find('.contentbox-main-hld').addClass('js-overflow');
    $('body').find('.popup-inline').addClass('js-popup-show');
    $('body').find('.popup-inline').removeClass('js-popup-hide');
});

(function() {
    'use strict';
    window.addEventListener('load', function() {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                console.log('dupa');
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();

                    var errorElements = document.querySelectorAll("input.form-control:invalid");

                    $('html, body').animate({
                        scrollTop: $(errorElements[0]).offset().top - 50
                    }, 500);
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();