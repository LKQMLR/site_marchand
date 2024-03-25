document.addEventListener('DOMContentLoaded', () => {
    const burgerButton = document.querySelector('.burger_button');

    burgerButton.addEventListener('click', () => {
        nav.classList.toggle('active');
    })

})
