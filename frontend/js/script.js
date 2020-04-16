$(document).ready(function() {
  //размещение блоков с помощью masonry
  $('.advantages-content').masonry({
    itemSelector: '.advantages__item',
    columnWidth: '.advantages__item',
    gutter: 80,
    percentPosition: true,
    gutter: $(window).width() < 664 ? 0 : 80
  });


  //открытие меню
  let headerbtn = $('.menu-toggle'),
      menu = $('.header__dropdown');

  $(document).mouseup(function(e){
    if (!menu.is(e.target)
      && menu.has(e.target).length === 0) {
      menu.removeClass('show');
      headerbtn.removeClass('active')
    }
    headerbtn.on('click', function (e) {
      if (headerbtn.hasClass('active')) {
        headerbtn.removeClass('active');
        menu.removeClass('show');
      } else {
        headerbtn.addClass('active');
        menu.addClass('show');
      }
    });
  });

  // открытие и закрытие модального окна при клике на кнопку “Let’s Talk"
  let openbtn = $('.popup-btn'),
      popup = $('.popup-form'),
      close = $('.modal_content_close');

  openbtn.on('click', function (e) {
    e.preventDefault();
    popup.addClass('modal_content_show');
  });

  close.on('click', function (e) {
    e.preventDefault();
    popup.removeClass('modal_content_show');
    popup.removeClass('modal_error');
  });

  $(document).keyup(function (event) {    
    if (event.keyCode === 27) {
      if (popup.hasClass('modal_content_show')) {
        popup.removeClass('modal_content_show');
        popup.removeClass('modal_error');
      }
    }
  });

  //ajax отправка формы
  $('.ajax-form').on('submit', function (e) {
    e.preventDefault();
    if ( validateForm($(this)) ) {
      return false;
    }

    let owner = $(this);
    let fields = $(this).serialize();

    $.ajax({
      url: this.action,
      type: this.method,
      data: fields,
      success: function (response) {
        owner[0].reset();
        $('.ajax-notify__content').html(response);
        $('.popup-form.modal_content_show').removeClass('modal_content_show');
        $('.ajax-notify').addClass('show');

        setTimeout(() => {
          $('.ajax-notify.show').removeClass('show');
          $('.ajax-notify__content').html('');
        }, 2500);

      }
    });
  });

  //валидация формы всплывающего блока
  function validateForm(form) {
    form.find('.text-error').remove();

    const reg = /^\w+([\.-]?\w+)*@(((([a-z0-9]{2,})|([a-z0-9][-][a-z0-9]+))[\.][a-z0-9])|([a-z0-9]+[-]?))+[a-z0-9]+\.([a-z]{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/i;
    let name_field = form.find('.name-field'),
        email_field = form.find('.email-field'),
        message_field = form.find('.message-area'),
        v_email = false,
        v_name = false,
        v_message = false,
        name_warning = '<span class="text-error for-name">Введите полное имя</span>',
        email_warning = '<span class="text-error for-email">Поле e-mail обязательно к заполнению</span>',
        email_invalid = '<span class="text-error for-email">Вы указали недопустимый e-mail</span>'
        textarea_warning = '<span class="text-error for-text">Введите сообщение</span>';

    // Проверка имени  
    if (name_field.val().length < 2) {
      v_name = true;
      name_field.before(name_warning);
      form.find('.for-name').css({ bottom: name_field.position().top + name_field.outerHeight() + 2, 'color': 'red' });
    }

    // Проверка e-mail
    if (v_email) {
      v_email = email_field.val() ? false : true;
      email_field.before(email_warning);
      form.find('.for-email').css({ bottom: email_field.position().top + email_field.outerHeight() + 2, 'color': 'red' });
    } else if (!reg.test(email_field.val())) {
      v_email = true;
      email_field.before(email_invalid);
      form.find('.for-email').css({ bottom: email_field.position().top + email_field.outerHeight() + 2, 'color': 'red' });
    }

    form.find('.email-field').toggleClass('error', v_email);

    // проверка ввода сообщения
    if (message_field.val().length < 2) {
      v_message = true;
      message_field.before(textarea_warning);
      form.find('.for-text').css({ bottom: message_field.position().top + message_field.outerHeight() + 2, 'color': 'red' });
    }
    // form.find('#login').toggleClass('error', v_message);

    return (v_name || v_email || v_message);
  }

  // обработка кликов вне контейнеров/активных блоков
  $(document).mouseup(function (e) { 

    let popup_form = $('.popup-form .ajax-content'),
        ajax_notify = $('.ajax-notify .ajax-notify__content');

    if (!popup_form.is(e.target)
      && popup_form.has(e.target).length === 0) {
      popup_form.parent('.popup-form').removeClass('modal_content_show');
    }

    if (!ajax_notify.is(e.target)
      && ajax_notify.has(e.target).length === 0) {
        ajax_notify.parent('.ajax-notify').removeClass('show');
    }
  });
});
