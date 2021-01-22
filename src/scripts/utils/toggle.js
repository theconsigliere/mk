// toggle dark / light mode

const modeToggle = document.querySelector('.js-mode-toggle')

export default function toggle () {

    // get localstorage

    let mode = localStorage.getItem("mode");
    modeToggle.classList.add(mode)

    function changeMode() {
      
        const text = document.querySelector('.js-toggle-text')
        const canvas = document.querySelector('.noise')
        let root = document.documentElement;
        const grids = document.querySelectorAll('.gi')
        
    
        if (modeToggle.classList.contains('light')) {
            canvas.style.opacity = '0'
            root.style.setProperty('--black', '#fffcf2', 'important')
            root.style.setProperty('--white', '#191919', 'important')
            text.textContent = 'off'
            
    
            // wait a second and fade noise in
            setTimeout(() => {
             //   console.log('hello light')
                canvas.style.opacity = '0.05'
            }, 500);

            grids.forEach(grid => grid.style.borderColor = '#1d1c1c40')

            // set item of light to local storage
            localStorage.setItem('mode', 'light')
    
        }  else {
            canvas.style.opacity = '0'
            root.style.setProperty('--black', '#191919', 'important')
            root.style.setProperty('--white', '#fffcf2', 'important')
            text.textContent = 'on'
            
    
            // wait a second and fade noise in
            setTimeout(() => {
              //  console.log('hello dark')
                canvas.style.opacity = '1'
            }, 500);

            grids.forEach(grid => grid.style.borderColor = '#1d1c1c')


            // set item of light to local storage
            localStorage.setItem('mode', 'dark')
            
        }
    }

    changeMode()
    
    modeToggle.addEventListener('click', e => {
        e.preventDefault();
        modeToggle.classList.toggle('light')
        changeMode()
    
    })
}