const customJs = () =>{

    const sidebar = document.querySelector('#sidebar');
    const selectToggleButton = document.querySelector('#toggleButton');
    // const bodyCard = document.querySelector('#bodyCard');
    const barsIcon = document.querySelector("#barsIcon");
    

    // Function to set sidebar width based on screen size
    const setSidebarWidth = () => {
        const viewportWidth = window.innerWidth;
        
        // If the viewport width is greater than 768px, set the sidebar to 250px
        if (viewportWidth >= 768) {
            sidebar.style.minWidth = "250px";
        } else {
            // If the viewport width is smaller, collapse the sidebar to 0px
            sidebar.style.minWidth = "0px";
        }
    };

    setSidebarWidth();
    window.addEventListener('resize', setSidebarWidth);

    selectToggleButton.addEventListener('click', () => {
        const currentWidth = sidebar.offsetWidth;

        if(currentWidth == 50 || currentWidth == 0){
            sidebar.style.minWidth = "250px";
            // bodyCard.style.marginLeft = "250px";
            barsIcon.classList.remove('rotate');
        }else{
            sidebar.style.minWidth = "0px";
            // bodyCard.style.marginLeft = "0px";
            barsIcon.classList.add('rotate');
        }
    });
}


export default customJs;