const translations = {
  'ТОВ "ВЕКТОР"': { uk: 'ТОВ "ВЕКТОР"', en: 'Vector LLC' },
  'Головна': { uk: 'Головна', en: 'Home' },
  'Безпека': { uk: 'Безпека', en: 'Security' },
  'Документи': { uk: 'Документи', en: 'Documents' },
  'Платежі': { uk: 'Платежі', en: 'Payments' },
  'Новини': { uk: 'Новини', en: 'News' },
  'Галерея': { uk: 'Галерея', en: 'Gallery' },
  'Контакти': { uk: 'Контакти', en: 'Contacts' },
  'Безпека • Ідилія • Затишок': { uk: 'Безпека • Ідилія • Затишок', en: 'Security • Peace • Comfort' },
  'Відеонагляд 24/7': { uk: 'Відеонагляд 24/7', en: '24/7 video surveillance' },
  'Установчі документи ТОВ': { uk: 'Установчі документи ТОВ', en: 'Company founding documents' },
  'Реквізити для внесків': { uk: 'Реквізити для внесків', en: 'Payment details for contributions' },
  'Оплата': { uk: 'Оплата', en: 'Payments' },
  'Контроль доступу та відеоспостереження.': { uk: 'Контроль доступу та відеоспостереження.', en: 'Access control and video monitoring.' },
  'Офіційні документи та важливі матеріали ТОВ ВЕКТОР.': { uk: 'Офіційні документи та важливі матеріали ТОВ ВЕКТОР.', en: 'Official documents and important materials of Vector LLC.' },
  'Статут': { uk: 'Статут', en: 'Charter' },
  'Протоколи зборів': { uk: 'Протоколи зборів', en: 'Meeting minutes' },
  'Актуальні оголошення ТОВ ВЕКТОР.': { uk: 'Актуальні оголошення ТОВ ВЕКТОР.', en: 'Current announcements of Vector LLC.' },
  'Фото будинку та території.': { uk: 'Фото будинку та території.', en: 'Photos of the building and territory.' },
  'IBAN: UA00 0000 0000 0000 0000 0000 0000': { uk: 'IBAN: UA00 0000 0000 0000 0000 0000 0000', en: 'IBAN: UA00 0000 0000 0000 0000 0000 0000' },
  '© 2026 ТОВ "ВЕКТОР"': { uk: '© 2026 ТОВ "ВЕКТОР"', en: '© 2026 Vector LLC' },
  'Зворотній зв\'язок': { uk: 'Зворотній зв\'язок', en: 'Feedback' },
  'Зв\'яжіться з нами': { uk: 'Зв\'яжіться з нами', en: 'Contact us' },
  'Маєте запитання щодо роботи ОСББ чи пропозиції? Напишіть нам або зателефонуйте. Ми завжди раді допомогти.': {
    uk: 'Маєте запитання щодо роботи ОСББ чи пропозиції? Напишіть нам або зателефонуйте. Ми завжди раді допомогти.',
    en: 'Have questions about the HOA or suggestions? Write to us or call. We are always happy to help.'
  },
  'Телефон для зв\'язку': { uk: 'Телефон для зв\'язку', en: 'Phone' },
  '+38 XXX XXX XX XX': { uk: '+38 XXX XXX XX XX', en: '+38 XXX XXX XX XX' },
  'Режим роботи': { uk: 'Режим роботи', en: 'Working hours' },
  'Пн - Пт: 9:00 - 18:00': { uk: 'Пн - Пт: 9:00 - 18:00', en: 'Mon - Fri: 9:00 - 18:00' },
  'Ваше ім\'я': { uk: 'Ваше ім\'я', en: 'Your name' },
  'Електронна пошта (Email)': { uk: 'Електронна пошта (Email)', en: 'Email address' },
  'Текст вашого повідомлення': { uk: 'Текст вашого повідомлення', en: 'Your message' },
  'Надіслати повідомлення': { uk: 'Надіслати повідомлення', en: 'Send message' },
  'Дякуємо за повідомлення!': { uk: 'Дякуємо за повідомлення!', en: 'Thank you for your message!' },
  'Ваше повідомлення успішно надіслано. Ми зв\'яжемося з вами якнайшвидше.': {
    uk: 'Ваше повідомлення успішно надіслано. Ми зв\'яжемося з вами якнайшвидше.',
    en: 'Your message has been sent successfully. We will contact you as soon as possible.'
  },
  'Якщо потрібно, ви можете повернутися на головну сторінку або відкрити контакти ще раз.': {
    uk: 'Якщо потрібно, ви можете повернутися на головну сторінку або відкрити контакти ще раз.',
    en: 'If needed, you can return to the homepage or open the contacts page again.'
  },
  'На головну': { uk: 'На головну', en: 'Home' },
  'Надіслати ще одне': { uk: 'Надіслати ще одне', en: 'Send another message' }
};

function applyTranslations(lang = localStorage.getItem('lang') || 'uk') {
  document.documentElement.lang = lang;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest('.lang-switcher')) return NodeFilter.FILTER_REJECT;
      return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  const translated = new Set();

  while (walker.nextNode()) {
    const text = walker.currentNode.textContent.trim();
    const mapped = translations[text];
    if (mapped && mapped[lang]) {
      walker.currentNode.textContent = mapped[lang];
      translated.add(text);
    }
  }

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
    btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
  });
}

function injectMobileMenu() {
  const nav = document.querySelector('nav .nav');
  if (!nav || nav.querySelector('.menu-toggle')) return;

  const links = Array.from(nav.querySelectorAll('a'));
  if (!links.length) return;

  const linksWrapper = document.createElement('div');
  linksWrapper.className = 'nav-links';
  links.forEach((link) => linksWrapper.appendChild(link));

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'menu-toggle';
  toggle.setAttribute('aria-label', 'Open menu');
  toggle.innerHTML = '<span></span><span></span><span></span>';

  const closeMenu = () => {
    linksWrapper.classList.remove('open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const willOpen = !linksWrapper.classList.contains('open');
    linksWrapper.classList.toggle('open', willOpen);
    toggle.classList.toggle('active', willOpen);
    toggle.setAttribute('aria-expanded', String(willOpen));
    toggle.setAttribute('aria-label', willOpen ? 'Close menu' : 'Open menu');
  });

  linksWrapper.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  nav.appendChild(toggle);
  nav.appendChild(linksWrapper);
}

function injectLanguageSwitcher() {
  const nav = document.querySelector('nav .nav, nav');
  if (!nav || nav.querySelector('.lang-switcher')) return;

  const switcher = document.createElement('div');
  switcher.className = 'lang-switcher';
  switcher.innerHTML = `
    <button type="button" class="lang-btn" data-lang="uk" aria-label="Українська">UA</button>
    <button type="button" class="lang-btn" data-lang="en" aria-label="English">EN</button>
  `;
  nav.appendChild(switcher);

  switcher.addEventListener('click', (event) => {
    const button = event.target.closest('.lang-btn');
    if (!button) return;
    localStorage.setItem('lang', button.dataset.lang);
    applyTranslations(button.dataset.lang);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  injectMobileMenu();
  injectLanguageSwitcher();
  applyTranslations(localStorage.getItem('lang') || 'uk');

  const form = document.getElementById('contactForm');
  const status = document.getElementById('form-status');

  if (!form || !status) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    status.textContent = 'Відправляємо повідомлення…';
    status.className = 'form-status visible';
    status.classList.remove('success', 'error');

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || 'Помилка відправки. Спробуйте ще раз.');
      }

      form.reset();
      status.textContent = 'Повідомлення надіслано. Дякуємо!';
      status.classList.add('success');
    } catch (error) {
      status.textContent = error.message || 'Не вдалося надіслати повідомлення.';
      status.classList.add('error');
    }
  });
});
