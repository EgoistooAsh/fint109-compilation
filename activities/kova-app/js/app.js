/* Kova Wallet app: optional enhancements (FINT109 Activity 3).
   The page works without this file: all content, navigation and layout are HTML and CSS.
   JavaScript only adds a live transfer estimate, activity filters, the card freeze preview
   and the highlighted tab in the navigation. */
(function () {
  'use strict';

  /* Fictional rates: 1 USDC in each currency */
  var RATES = { PHP: 57.0, INR: 83.1, EUR: 0.92, AED: 3.67, THB: 35.8 };
  var SEND_FEE = 0.5;        // USDC, flat
  var CONVERSION_FEE = 0.005; // 0.5%

  /* 1. Live "they receive" estimate */
  var form = document.getElementById('send-form');
  var amountInput = document.getElementById('amount');
  var currencySelect = document.getElementById('currency');
  var receiveOutput = document.getElementById('receive');
  var statusEl = document.getElementById('form-status');

  function format(value, currency) {
    return currency + ' ' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function estimate() {
    var amount = parseFloat(amountInput.value);
    var currency = currencySelect.value;
    if (!(amount > SEND_FEE)) {
      receiveOutput.textContent = format(0, currency);
      return 0;
    }
    var received = (amount - SEND_FEE) * (1 - CONVERSION_FEE) * RATES[currency];
    receiveOutput.textContent = format(received, currency);
    return received;
  }

  amountInput.addEventListener('input', estimate);
  currencySelect.addEventListener('change', estimate);
  estimate();

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    statusEl.className = 'form-status';
    if (!amountInput.checkValidity()) {
      statusEl.className = 'form-status warn';
      statusEl.textContent = 'Enter an amount between 1 and 1,250 USDC.';
      amountInput.focus();
      return;
    }
    var to = form.querySelector('input[name="to"]:checked').value;
    var amount = parseFloat(amountInput.value).toFixed(2);
    statusEl.textContent = 'Ready to send ' + amount + ' USDC to ' + to + '. They get about ' +
      receiveOutput.textContent + '. This is a prototype, so no money moves.';
  });

  /* 2. Activity filters (hidden unless JavaScript runs) */
  var filters = document.getElementById('filters');
  var chips = Array.prototype.slice.call(filters.querySelectorAll('[data-filter]'));
  var items = Array.prototype.slice.call(document.querySelectorAll('.tx'));
  var dayHeadings = Array.prototype.slice.call(document.querySelectorAll('.panel-activity .day'));
  filters.hidden = false;

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var type = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      items.forEach(function (item) {
        item.hidden = type !== 'all' && item.getAttribute('data-type') !== type;
      });
      // Hide a day heading when none of its transactions are showing
      dayHeadings.forEach(function (heading) {
        var list = heading.nextElementSibling;
        var visible = list.querySelectorAll('.tx:not([hidden])').length;
        heading.hidden = visible === 0;
        list.hidden = visible === 0;
      });
    });
  });

  /* 3. Freeze card preview */
  var freeze = document.getElementById('freeze-card');
  var cardFigure = document.querySelector('.card-figure');
  freeze.addEventListener('change', function () {
    cardFigure.classList.toggle('is-frozen', freeze.checked);
  });

  /* 4. Highlight the nav tab for the section on screen */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.app-nav a'));
  function setCurrent(id) {
    navLinks.forEach(function (link) {
      if (link.getAttribute('href') === '#' + id) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { setCurrent(entry.target.id); }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    ['home', 'send', 'card', 'activity'].forEach(function (id) {
      observer.observe(document.getElementById(id));
    });
  }
}());
