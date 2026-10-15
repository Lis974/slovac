/* ============================================================
   Welcome Student — лендинг «Словаччина»
   Модалка + «Спасибо» (стандартное / для каталога) + бургер
   ============================================================ */

(function () {
  'use strict';

  var modal         = document.getElementById('modal');
  var modalTitle    = document.getElementById('modal-title');
  var modalSub      = document.getElementById('modal-subtitle');
  var modalClose    = document.getElementById('modal-close');
  var modalForm     = document.getElementById('modal-form');
  var modalThanksFlag = document.getElementById('modal-thanks-flag');

  var thanks        = document.getElementById('thanks');
  var thanksClose   = document.getElementById('thanks-close');

  var thanksCatalog = document.getElementById('thanks-catalog');
  var thanksCatalogClose = document.getElementById('thanks-catalog-close');

  var leadForm      = document.getElementById('lead-form');

  var burger        = document.getElementById('burger');
  var navMenu       = document.getElementById('nav-menu');

  // ===== ОТКРЫТИЕ МОДАЛКИ С ПОДМЕНОЙ КОНТЕНТА =====
  function openModal(title, subtitle, thanksFlag) {
    if (title)    modalTitle.textContent = title;
    if (subtitle) modalSub.textContent   = subtitle;
    if (modalThanksFlag) modalThanksFlag.value = thanksFlag || '';
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.js-open-modal').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal(
        btn.getAttribute('data-modal-title'),
        btn.getAttribute('data-modal-subtitle'),
        btn.getAttribute('data-thanks')
      );
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  // ===== ОТКРЫТИЕ/ЗАКРЫТИЕ «СПАСИБО» =====
  function openThanks(type) {
    if (type === 'catalog') {
      thanksCatalog.classList.add('is-open');
    } else {
      thanks.classList.add('is-open');
    }
    document.body.style.overflow = 'hidden';
  }
  function closeAllThanks() {
    thanks.classList.remove('is-open');
    thanksCatalog.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (thanksClose) thanksClose.addEventListener('click', function (e) {
    e.preventDefault(); closeAllThanks();
  });
  if (thanksCatalogClose) thanksCatalogClose.addEventListener('click', function (e) {
    e.preventDefault(); closeAllThanks();
  });
  if (thanks) {
    thanks.addEventListener('click', function (e) {
      if (e.target === thanks) closeAllThanks();
    });
  }
  if (thanksCatalog) {
    thanksCatalog.addEventListener('click', function (e) {
      if (e.target === thanksCatalog) closeAllThanks();
    });
  }

  // ===== ОТПРАВКА ФОРМЫ В МОДАЛКЕ =====
  if (modalForm) {
    modalForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var flag = modalThanksFlag ? modalThanksFlag.value : '';
      closeModal();
      openThanks(flag);
    });
  }

  // ===== ФОРМА НА СТРАНИЦЕ (стандартное «Спасибо») =====
  if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      openThanks();
    });
  }

  // ===== БУРГЕР =====
  if (burger && navMenu) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('is-active');
      navMenu.classList.toggle('is-open');
    });
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('is-active');
        navMenu.classList.remove('is-open');
      });
    });
  }

  // ===== ESC =====
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
      closeAllThanks();
    }
  });

})();