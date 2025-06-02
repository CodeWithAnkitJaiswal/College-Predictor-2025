function showMenu() {
    const menuIcon = document.getElementById('menuIcon');
    const mobileUl = document.getElementById('mobile-ul');
    const nav = document.getElementById('nav');
    menuIcon.classList.toggle('active');
    mobileUl.classList.toggle('active');
    nav.classList.toggle('active');
}

const mobileLinks = document.querySelectorAll('.mobile-ul a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('menuIcon').classList.remove('active');
        document.getElementById('mobile-ul').classList.remove('active');
        document.getElementById('nav').classList.remove('active');
        document.body.style.overflow = '';
    });
});