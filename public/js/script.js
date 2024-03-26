document.addEventListener('DOMContentLoaded', () => {

    
    handleNavbar();
    initializeAdminPanel();

})

function handleNavbar() {
    const burgerButton = document.querySelector('.burger_button');

    burgerButton.addEventListener('click', () => {
        nav.classList.toggle('active');
    })

}


function initializeAdminPanel() {
    const adminButton = document.querySelector('.admin_button');
    const adminPanel = document.querySelector('.admin_panel');
    
    function handleAdminButton() {
        adminPanel.classList.toggle('active');
    }
    
    adminButton.addEventListener('click', handleAdminButton);
}