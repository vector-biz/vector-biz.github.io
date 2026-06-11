function changeLang(lang) {
    localStorage.setItem('lang', lang);
    alert('Мова: ' + lang);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('OSBB Vector');
});
