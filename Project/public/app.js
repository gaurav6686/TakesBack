// sidebar
const menuItems = document.querySelectorAll('.menu-item');

// messages
const messagesNotification = document.querySelector('#messages-notification');
const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');


// theme
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSizes = document.querySelectorAll('.choose-size span');
const root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.choose-color span');
const Bg1 = document.querySelector('.bg-1');
const Bg2 = document.querySelector('.bg-2');
const Bg3 = document.querySelector('.bg-3');

//================sidebar==================

// remove active class from all menu items
const changeActiveItem = () =>{
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}


menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');

        if(item.id != 'notifications'){
            document.querySelector('.noti-popup').
            style.display = 'none';
        }else{
            document.querySelector('.noti-popup').
            style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display='none';
        }
    })
})


//================messages==================

// search-chats
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    message.forEach(user => {
        let name = user.querySelector('h5').textContent.toLowerCase();
        if(name.indexOf(val)!=-1){
            user.style.display = 'flex';
        }else{
            user.style.display='none';
        }
    })
}


// search-chats
messageSearch.addEventListener('keyup',searchMessage);

// highlighting
messagesNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';
    messagesNotification.querySelector('.notification-count').style.display='none';
    setTimeout(() => {
        messages.style.boxShadow='none';
    },2000)
})


// theme-customize

// open model
const openThemeModal = () => {
    themeModal.style.display ='grid';  
}

//closed
const closeThemeModal = (e) => {
     if(e.target.classList.contains('customize-theme')){
        themeModal.style.display='none';
     }
}

//close modal
themeModal.addEventListener('click',closeThemeModal);

theme.addEventListener('click',openThemeModal);



//===============font==============

// remove active class from spans or font size selectors
const removeSizeSelector = () => {
    fontSizes.forEach(size => {
        size.classList.remove('active');
    })
}


fontSizes.forEach(size => {  
    size.addEventListener('click',() => {
        removeSizeSelector();
        let fontSize;
        size.classList.toggle('active');
        
        if(size.classList.contains('font-size-1')){
            fontSize = '10px';
            root.style.setProperty('--sticky-top-left','5.4rem');
            root.style.setProperty('--sticky-top-right','5.4rem');
        }else if(size.classList.contains('font-size-2')){
            fontSize = '13px';
            root.style.setProperty('--sticky-top-left','5.4rem');
            root.style.setProperty('--sticky-top-right','-7rem');
        }else if(size.classList.contains('font-size-3')){
            fontSize = '16px';
            root.style.setProperty('--sticky-top-left','-2rem');
            root.style.setProperty('--sticky-top-right','-17rem');
        }else if(size.classList.contains('font-size-4')){
            fontSize = '19px';
            root.style.setProperty('--sticky-top-left','5em');
            root.style.setProperty('--sticky-top-right','-25rem');
        }else if(size.classList.contains('font-size-5')){
            fontSize = '22px';
            root.style.setProperty('--sticky-top-left','-12rem');
            root.style.setProperty('--sticky-top-right','-35rem');
        }
    //change font size of the root html element

    document.querySelector('html').style.fontSize = fontSize;
    })

})
    

// ============================color=========================

//remove active class from color
const changeActiveColorClass = () =>{
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active');
    })
}


//change color
colorPalette.forEach(color => {
    color.addEventListener('click', () => {
    let primary;
    changeActiveColorClass();

    if(color.classList.contains('color-1')) {
        primaryHue = 352    ;
    }else if(color.classList.contains('color-2')) {
        primaryHue = 52;
    }else if(color.classList.contains('color-3')){
        primaryHue = 252;
    }else if(color.classList.contains('color-4')) {
        primaryHue = 152;
    }else if(color.classList.contains('color-5')) {
        primaryHue = 202;
    }
    color.classList.add('active');

    root.style.setProperty('--primary-color-hue',primaryHue);
    })
})




// background
let lightcolorlight;
let whitecolorlight;
let darkcolorlight;

// change background col
const changeBG = ()=>{
    root.style.setProperty('--light-color-lightness',lightcolorlight);
    root.style.setProperty('--white-color-lightness',whitecolorlight);
    root.style.setProperty(' --dark-color-lightness',darkcolorlight);
}

Bg1.addEventListener('click',()=>{
    // add active color 
    Bg1.classList.add('active');
    // remove color
    Bg2.classList.remove('active');
    Bg3.classList.remove('active');
    // remove cust change from local storage
    window.location.reload();
})

Bg2.addEventListener('click', ()=>{
    darkcolorlight = '95%';
    whitecolorlight = '20%';
    lightcolorlight = '15%';

    // add active class
    Bg2.classList.add('active');
    // remove active class from the others
    Bg1.classList.remove('active');
    Bg3.classList.remove('active');
    changeBG();

    var all = document.getElementsByTagName("*");

   for (var i=0, max=all.length; i < max; i++) {
   all[i].style.color = "white";
}
});

Bg3.addEventListener('click', ()=>{
    darkcolorlight = '95%';
    whitecolorlight = '10%';
    lightcolorlight = '0%';

    // add active class
    Bg3.classList.add('active');
    // remove active class from the others
    Bg1.classList.remove('active');
    Bg2.classList.remove('active');
    changeBG();

    var all = document.getElementsByTagName("*");
    for (var i=0, max=all.length; i < max; i++) {
        all[i].style.color = "white";
     }
    
});

document.getElementById("myDivs").addEventListener("click", function() {
    window.location.href = "/profile.html";
});

document.getElementById("myDiv").addEventListener("click", function() {
    window.location.href = "/profile.html";
});

document.getElementById("myStory").addEventListener("click", function() {
    window.location.href = "/story.html";
});


document.getElementById("myMessage").addEventListener("click", function() {
    window.location.href = "/message.html";
});


