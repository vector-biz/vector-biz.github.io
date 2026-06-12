const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

function loadHtml(file) {
  return fs.readFileSync(path.join(__dirname, file), 'utf8');
}

function createDom(html) {
  return new JSDOM(html, { runScripts: 'dangerously', url: 'http://localhost/' });
}

async function runMenuTest() {
  const dom = createDom(loadHtml('index.html'));
  const { window } = dom;
  const script = fs.readFileSync(path.join(__dirname, 'js/script.js'), 'utf8');
  window.eval(script);

  await new Promise((resolve) => window.document.addEventListener('DOMContentLoaded', resolve, { once: true }));

  const nav = window.document.querySelector('nav .nav');
  const toggle = nav.querySelector('.menu-toggle');
  const links = nav.querySelector('.nav-links');

  if (!toggle || !links) throw new Error('MENU_LOGIC_FAIL: toggler or links wrapper missing');

  toggle.click();
  if (!links.classList.contains('open')) throw new Error('MENU_LOGIC_FAIL: menu did not open');

  toggle.click();
  if (links.classList.contains('open')) throw new Error('MENU_LOGIC_FAIL: menu did not close');

  console.log('MENU_LOGIC_OK');
}

async function runFormTest() {
  const html = `
    <form id="contactForm" action="https://example.test" method="POST">
      <input name="name" />
      <input name="email" />
      <textarea name="message"></textarea>
      <div id="form-status"></div>
    </form>
  `;

  const dom = createDom(`<!doctype html><html><body>${html}</body></html>`);
  const { window } = dom;
  const originalFetch = window.fetch;

  let fetchCalls = 0;
  window.fetch = async () => {
    fetchCalls += 1;
    return { ok: true, json: async () => ({}) };
  };

  window.eval(fs.readFileSync(path.join(__dirname, 'js/script.js'), 'utf8'));
  await new Promise((resolve) => window.document.addEventListener('DOMContentLoaded', resolve, { once: true }));

  const form = window.document.getElementById('contactForm');
  const status = window.document.getElementById('form-status');

  form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  await new Promise((resolve) => setTimeout(resolve, 0));

  if (fetchCalls !== 1) throw new Error('FORM_LOGIC_FAIL: fetch was not called');
  if (!status.textContent.includes('Повідомлення надіслано')) throw new Error('FORM_LOGIC_FAIL: success message not shown');
  if (!status.classList.contains('success')) throw new Error('FORM_LOGIC_FAIL: success class not applied');

  window.fetch = originalFetch;
  console.log('FORM_LOGIC_OK');
}

(async () => {
  try {
    await runMenuTest();
    await runFormTest();
  } catch (error) {
    console.error(error.message || error);
    process.exit(1);
  }
})();
