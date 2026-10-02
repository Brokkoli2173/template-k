/**
 * Kök & Kanat — Editorial Luxury (single-file demo build)
 * Vanilla JS only. No dependencies, no build step.
 */
(function () {
  'use strict';

  /* ---------------------------------------------
   * WhatsApp configuration
   * WHATSAPP_NUMBER'ı gerçek işletme numarasıyla
   * (ülke kodu dahil, sadece rakamlar) değiştirin.
   * ------------------------------------------- */
  var WHATSAPP_NUMBER = '905462911590';

  function buildWhatsAppUrl() {
    return 'https://wa.me/' + WHATSAPP_NUMBER; // önceden yazılmış mesaj yok — sohbet boş açılır
  }

  function initWhatsAppLinks() {
    var links = document.querySelectorAll('[data-wa]');
    links.forEach(function (link) {
      var variant = link.getAttribute('data-wa') === 'b' ? 'b' : 'a';
      link.setAttribute('href', buildWhatsAppUrl(variant));
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }

  function initHeaderScrollState() {
    var header = document.querySelector('[data-header]');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------
   * Fixed hamburger menu — position:fixed, stays
   * pinned to the viewport regardless of scroll.
   * ------------------------------------------- */
  function initFixedMenu() {
    var toggle = document.querySelector('[data-fixed-menu-toggle]');
    var panel = document.querySelector('[data-fixed-menu-panel]');
    if (!toggle || !panel) return;

    function close() {
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    function open() {
      panel.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', function () {
      if (panel.classList.contains('is-open')) close(); else open();
    });

    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', close);
    });

    document.addEventListener('click', function (e) {
      if (!panel.classList.contains('is-open')) return;
      if (panel.contains(e.target) || toggle.contains(e.target)) return;
      close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---------------------------------------------
   * Nav dropdown — "Çalışmalar" expands to show
   * the two offering pages (desktop flyout panel,
   * mobile inline accordion inside the fixed menu).
   * ------------------------------------------- */
  function initNavDropdowns() {
    var dropdowns = document.querySelectorAll('[data-nav-dropdown]');
    dropdowns.forEach(function (dropdown) {
      var trigger = dropdown.querySelector('[data-nav-dropdown-trigger]');
      if (!trigger) return;

      function close() {
        dropdown.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
      function open() {
        dropdowns.forEach(function (other) {
          if (other !== dropdown) {
            other.classList.remove('is-open');
            var otherTrigger = other.querySelector('[data-nav-dropdown-trigger]');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });
        dropdown.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }

      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        if (dropdown.classList.contains('is-open')) close(); else open();
      });

      document.addEventListener('click', function (e) {
        if (!dropdown.classList.contains('is-open')) return;
        if (dropdown.contains(e.target)) return;
        close();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
      });
    });
  }

  function initScrollReveal() {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var targets = document.querySelectorAll('.section, .station');
    if (prefersReduced || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------
   * Language switch (TR / EN)
   * Every element with a data-i18n key gets its
   * innerHTML swapped between its original Turkish
   * markup and the English string below. No reload,
   * no build step — pure vanilla JS.
   * ------------------------------------------- */
  /* Per-page title translation: each page keeps its own Turkish <title> as
     written in the HTML, and supplies its English version via
     <body data-title-en="…">. This keeps script.js shared across pages. */
  var TITLE_TR = document.title;
  var TITLE_EN = document.body.getAttribute('data-title-en') || TITLE_TR;

  var TRANSLATIONS = {
    'nav.calismalar': 'Offerings',
    'nav.yasemin': 'About Me',
    'nav.faq': 'FAQ',
    'cta.info': 'Ask on WhatsApp',
    'cta.explore': 'Keep exploring ↓',
    'cta.write': 'Message on WhatsApp',
    'cta.justOpen': 'Just open WhatsApp',
    'cta.seeCalismalar': 'See Our Offerings',
    'hero.eyebrow': 'A Six-Session Structured Workshop · Istanbul',
    'hero.title': 'You can\u2019t spread your wings without knowing your roots.',
    'hero.lede': 'We don\u2019t always know how to move into the next chapter while one is closing. Kök &amp; Kanat is a six-session workshop \u2014 time for yourself to pause, look back on what\u2019s behind you, and move forward with more clarity.',
    'label.giris': 'Introduction',
    'intro.p0': 'Maybe a long career came to an end. Maybe the kids moved out, you moved to a new city, or a new chapter began in your life that doesn\u2019t have a name yet\u2026',
    'intro.quote': 'Some chapters end quietly. Without looking back on what\u2019s behind you, starting the next one can be hard.',
    'intro.p1': 'Kök &amp; Kanat is a structured, six-session workshop designed to help you look at your own story again during exactly this kind of transition.',
    'intro.p2': 'Together with a small group, you take the time to notice what you\u2019re leaving behind, understand where you stand today, and move forward with more clarity.',
    'intro.imgCaption': 'Writing down, on a notebook page, what you\u2019re carrying that week.',
    'label.yolculuk': 'The Workshop Journey',
    'journey.title': 'Look at your story again, in six sessions.',
    'station1.h': 'The Start — My Roots',
    'station1.sub': 'Stopping and looking.',
    'station1.p': 'You first arrive where you are, slow down a little, and look back at the roots that brought you to today.',
    'station2.h': 'Family and First Experiences',
    'station2.sub': 'Looking at where the story began.',
    'station2.p': 'You begin to notice the traces your family, relationships, and early experiences left on who you are today.',
    'station3.h': 'Turning Points',
    'station3.sub': 'Seeing the paths you\u2019ve taken.',
    'station3.p': 'You look at the turning points on your timeline that changed you, shaped your direction, and made you who you are today.',
    'station4.h': 'Repetitions',
    'station4.sub': 'Noticing the connections.',
    'station4.p': 'You take a closer look at patterns that repeat in your life, and the connections between the past and today.',
    'station5.h': 'Who I Am Today',
    'station5.sub': 'Seeing where you stand right now.',
    'station5.p': 'You focus on your values, needs, and direction for what comes next, as you are today.',
    'station6.h': 'Harvest',
    'station6.sub': 'Choosing what to take with you.',
    'station6.p': 'You bring together everything you noticed across the six sessions, and move forward by looking at what to leave behind and what to carry with you.',
    'label.rehberiniz': 'Who Am I?',
    'about.greeting': 'Hi, I\u2019m Yasemin.',
    'about.title': 'I\u2019m an education scientist, the founder of Kök &amp; Kanat, and the one who leads the workshop.',
    'about.p1': 'I\u2019ve spent many years working with people, families, and their life stories. My professional path began with a degree in pedagogy from the University of Cologne, and was shaped by my work with immigrant families, social and pedagogical counseling, three years of training in systemic and family therapy, and my experience in individual counseling.',
    'about.pathTitle': 'The road that brought me here',
    'about.path.p1': 'Over the years, accompanying people through different chapters of their lives, I kept seeing the same thing: sometimes what we need isn\u2019t someone telling us which way to go \u2014 it\u2019s a space where we can pause, look at our own story again, and get closer to our own answers.',
    'about.path.p2': 'Kök &amp; Kanat was born, in part, out of that thought.',
    'about.path.p3': 'My role in this process is to open up a space \u2014 through creative exercises, questions, and sharing \u2014 where you can look at your own story again. Not to tell you which way to go.',
    'about.path.p4': 'Having experienced pausing, looking again, and changing direction in my own life, I accompany this process with you over six sessions.',
    'label.detaylar': 'Details',
    'detail.tarih.h': 'Date',
    'detail.tarih.p': 'The KÖK &amp; KANAT Group Workshop will take place again <strong>in spring, over 6 sessions</strong>.<br><br>The <strong>day, time, and dates</strong> of the sessions will be announced here once the schedule is finalized.',
    'detail.yer.h': 'Location',
    'detail.yer.p': '<strong>Archerson Köşkü</strong><br>Zühtüpaşa Neighborhood<br>Şefikbey Street No: 3<br>34724 Kadıköy / Istanbul',
    'detail.grup.h': 'Group',
    'detail.grup.p': '6\u201312 participants<br>A small, warmly held group setting.',
    'detail.bireysel.h': 'Individual Work',
    'detail.bireysel.p': '<strong>By personal appointment</strong><br>Individual biography work consists of three sessions planned specifically for you.',
    'detail.dil.h': 'Language',
    'detail.dil.p': 'The workshop is held in Turkish.',
    'detail.yas.h': 'Age Range',
    'detail.yas.p': 'Designed for adults aged 40 and up.',
    'label.faq': 'Frequently Asked Questions',
    'faq1.q': 'What exactly is Kök &amp; Kanat?',
    'faq1.a': 'Kök &amp; Kanat is a structured workshop program made up of six sessions, where you can look at your own life story step by step and notice and make sense of the experiences that have shaped you from the past to today.',
    'faq2.q': 'Who can take part?',
    'faq2.a': 'Adults who want to get to know themselves better, look again at the turning points and things they carry from the past into today, and move forward with more clarity are welcome to join.',
    'faq3.q': 'Is this therapy?',
    'faq3.a': 'No. Kök &amp; Kanat is an education-based, structured self-reflection workshop. It helps participants look at their life stories from different angles and make sense of their own experiences. It is not therapy or a clinical intervention.',
    'faq4.q': 'How can I join?',
    'faq4.a': 'At KÖK &amp; KANAT, there are different formats for looking at your life story.<br><br><a href="calismalar-grup.html"><strong>Group Workshop</strong></a> is a longer-term program of six sessions that creates space to look at your life journey more fully within a group.<br><br><a href="calismalar-bireysel.html"><strong>Individual Biography Work</strong></a> consists of three individual sessions. Starting from a topic or question that occupies you today, it offers a personal space to look at the traces running from the past to the present — and at what comes next.<br><br>You can decide which format suits you best by considering your own needs.',
    'faq5.q': 'How does individual biography work proceed?',
    'faq5.a': 'Individual biography work consists of three sessions. Each session lasts about 60\u201390 minutes.<br><br>In the first session, we look at where you stand today and what you\u2019d like to explore; in the second, at the traces of that topic throughout your life story; and in the third, at what comes next, starting from what you\u2019ve noticed.<br><br>There\u2019s no obligation to continue after the first session.',
    'finalcta.title': 'Let\u2019s find the right fit for you.',
    'finalcta.p': 'Dates, pricing, and all the details for the Group Workshop and Individual Biography Work are on our Offerings page. You can also message me on WhatsApp with any questions.',
    'footer.tagline': 'Touch your story.',
    'footer.taxLine': 'Tax Office: Göztepe Tax Office',
    'footer.email': 'Email',
    'footer.tel': 'Phone',
    'footer.privacy': 'Privacy Policy',
    'footer.kvkk': 'Data Protection Notice (KVKK)',
    'footer.rights': 'All rights reserved.',

    /* Çalışmalar (Offerings) subpage */
    'label.calismalar': 'Offerings',
    'calismalar.lede': 'At KÖK &amp; KANAT, there are different formats for looking at your life story.',
    'calismalar.jump.grup': 'Group Workshop',
    'calismalar.jump.bireysel': 'Individual Biography Work',

    'offer.grup.eyebrow': 'Group Workshop',
    'offer.grup.title': 'A six-session program that creates space to look at your life journey more fully within a group.',
    'offer.grup.ucret.h': 'Pricing &amp; Payment',
    'offer.grup.ucret.intro': 'The total participation fee for the KÖK &amp; KANAT Group Workshop is <strong>14,000 TL</strong>. Payment can be made in installments or in full.',
    'offer.grup.taksit.h': 'Installment Payment',
    'offer.grup.taksit.li1': '1st payment: 5,000 TL (at registration)',
    'offer.grup.taksit.li2': '2nd payment: 4,500 TL',
    'offer.grup.taksit.li3': '3rd payment: 4,500 TL',
    'offer.grup.taksit.note': 'Registration is confirmed once the first payment is completed. The second and third payments are made on dates set in advance during the workshop.',
    'offer.grup.pesin.h': 'Payment in Full',
    'offer.grup.pesin.p': 'Participants who prefer to pay the full workshop fee at registration receive a 10% discount. The full payment amount is <strong>12,600 TL</strong>.',
    'offer.grup.iptal.h': 'Cancellation Terms',
    'offer.grup.iptal.tbd': 'Details will be added soon.',

    'offer.bireysel.eyebrow': 'Individual Biography Work',
    'offer.bireysel.title': 'A three-session program that starts from your own biographical question.',
    'label.ucbulusma': 'The Three-Session Journey',
    'meeting1.h': 'Where Am I?',
    'meeting1.sub': 'Looking at where you stand today.',
    'meeting1.p': 'We focus on the topic that brought you here today, and on what you’d like to look at more closely in your life. The goal isn’t to find an immediate answer or solution, but to clarify the question that matters to you.',
    'meeting2.h': 'Where Are Its Traces in My Life?',
    'meeting2.sub': 'Looking from today back into the past.',
    'meeting2.p': 'We look at the traces of the topic that occupies you today throughout your life story. Through past periods, turning points, relationships, and experiences, we try to notice what has continued up to now and what has changed.',
    'meeting3.h': 'From Here, Where To?',
    'meeting3.sub': 'Looking from today into the future.',
    'meeting3.p': 'You bring together what you noticed in the first two sessions, and look at what you want to make room for in the period ahead, and what you want to carry with you.',
    'offer.bireysel.note': 'Every life story is different. For this reason, the questions and exercises used are shaped around the topic each person brings and their own life story.',
    'offer.bireysel.ucret.h': 'Pricing &amp; Payment',
    'offer.bireysel.ilk.p1': 'First Session: <strong>1,500 TL</strong>',
    'offer.bireysel.ilk.p2': 'The first session lasts about 60–90 minutes. The appointment is confirmed once payment is completed.',
    'offer.bireysel.devam.intro': 'If you decide to continue with individual biography work after the first session:',
    'offer.bireysel.devam.h': 'Continuation Package: 2,500 TL',
    'offer.bireysel.devam.p': 'Covers the 2nd and 3rd sessions. Payment for the continuation package is completed before the second session.',
    'offer.bireysel.toplam.p': 'The total fee for the full three-session individual biography work therefore comes to <strong>4,000 TL</strong>.',
    'offer.bireysel.devamsiz.p': 'There is no obligation to continue after the first session.',
    'offer.bireysel.iptal.h': 'Rescheduling &amp; Cancellation',
    'offer.bireysel.iptal.tbd': 'Details will be added soon.',

    'offerscta.title': 'Which format is right for you?',
    'offerscta.p': 'If you’re having trouble deciding, send me a short message on WhatsApp — we can figure it out together.',
    'calismalar.back': '← Home',
    'offer.grup.switchLink': 'See Individual Biography Work →',
    'offer.bireysel.switchLink': 'See Group Workshop →'
  };

  function initLanguageSwitch() {
    var elements = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'))
      .map(function (el) { return { el: el, original: el.innerHTML }; });
    var buttons = document.querySelectorAll('.lang-btn');
    var switchEls = document.querySelectorAll('[data-lang-switch]');
    if (!elements.length || !buttons.length) return;

    var currentLang = 'tr';

    function applyLanguage(lang) {
      currentLang = lang;
      elements.forEach(function (item) {
        var key = item.el.getAttribute('data-i18n');
        item.el.innerHTML = (lang === 'en' && TRANSLATIONS[key]) ? TRANSLATIONS[key] : item.original;
      });
      buttons.forEach(function (btn) {
        btn.classList.toggle('is-active', btn.getAttribute('data-lang') === lang);
      });
      switchEls.forEach(function (el) { el.classList.toggle('is-en', lang === 'en'); });
      document.documentElement.lang = lang;
      document.title = lang === 'en' ? TITLE_EN : TITLE_TR;
      try { localStorage.setItem('kk_lang', lang); } catch (e) { /* storage unavailable — ignore */ }
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLanguage(currentLang === 'tr' ? 'en' : 'tr');
      });
    });

    var saved = 'tr';
    try { saved = localStorage.getItem('kk_lang') || 'tr'; } catch (e) { /* storage unavailable — ignore */ }
    if (saved === 'en') applyLanguage('en');
  }

  /* ---------------------------------------------
   * Legal document modals (Gizlilik Politikası,
   * KVKK Aydınlatma Metni)
   * ------------------------------------------- */
  function initLegalModals() {
    var openButtons = document.querySelectorAll('[data-open-modal]');
    var overlays = document.querySelectorAll('[data-modal-overlay]');
    if (!openButtons.length || !overlays.length) return;

    var lastFocused = null;

    function openModal(id) {
      var overlay = document.getElementById('modal-' + id);
      if (!overlay) return;
      lastFocused = document.activeElement;
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      var closeBtn = overlay.querySelector('[data-close-modal]');
      if (closeBtn) closeBtn.focus();
    }

    function closeModal(overlay) {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }

    openButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        openModal(btn.getAttribute('data-open-modal'));
      });
    });

    overlays.forEach(function (overlay) {
      overlay.querySelectorAll('[data-close-modal]').forEach(function (btn) {
        btn.addEventListener('click', function () { closeModal(overlay); });
      });
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal(overlay);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      overlays.forEach(function (overlay) {
        if (overlay.classList.contains('is-open')) closeModal(overlay);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initWhatsAppLinks();
    initHeaderScrollState();
    initFixedMenu();
    initNavDropdowns();
    initScrollReveal();
    initLanguageSwitch();
    initLegalModals();
  });
})();
