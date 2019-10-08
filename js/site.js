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
    $(this).prev().prev().slideDown('slow');
    $('body').find('.contentbox-main-hld').addClass('js-overflow');
    $(this).prev().prev().addClass('js-popup-show');
    $(this).prev().prev().removeClass('js-popup-hide');
});

(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();