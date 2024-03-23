document.addEventListener('DOMContentLoaded', () => {
    const burgerButton = document.querySelector('.burger_button');
    const adminButton = document.querySelector('.admin_button');
    const adminPanel = document.querySelector('.admin_panel');

    burgerButton.addEventListener('click', () => {
        nav.classList.toggle('active');
    })

    adminButton.addEventListener('click', () => {
        adminPanel.classList.toggle('active')
    })
})
