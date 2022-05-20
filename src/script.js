const nameEle = document.getElementById('name');
const icon = document.getElementById('icon');
const confirmEle = document.querySelector('[confirm]');
const nameDone = document.querySelector('[nameDone]');
const nameReset = document.querySelector('[nameReset]');
const iconReset = document.querySelector('[iconReset]');
const iconDone = document.querySelector('[iconDone]');
const iconNone = document.querySelector('[iconNone]');
const title = document.getElementsByTagName('title')[0];
const docIcon = document.querySelector("link[rel~='icon']");
const websites = document.getElementsByClassName('all-websites')[0];
const search = document.getElementById('search');

function confirm(text) {
    if(confirmEle.classList.contains('active')) return;
    confirmEle.classList.add('active');
    confirmEle.innerHTML = text;

    setTimeout(() => { confirmEle.innerHTML = ''; confirmEle.classList.remove('active') }, 2000)
}

if(nameEle){
    nameEle.value = localStorage.getItem('disg-title') || '';
}
title.innerText = localStorage.getItem('disg-title') || 'Website Unblocker';

if(icon){
    icon.value = localStorage.getItem('disg-icon') || '';
}
if(localStorage.getItem('disg-icon') === 'None') docIcon.href = './media/newtab.png'
else docIcon.href = localStorage.getItem('disg-icon') || './media/icon.png';

if(nameEle && icon) {
    nameDone.addEventListener('click', () => {
        if(!nameEle.value) return;
    
        localStorage.setItem('disg-title', nameEle.value);
        title.innerText = localStorage.getItem('disg-title');
    
        confirm('Title was updated')
    })
    
    nameReset.addEventListener('click', () => {
        localStorage.removeItem('disg-title');
        title.innerText = localStorage.getItem('disg-title') || 'Website Unblocker';
        nameEle.value = '';
    
        confirm('Title was reset');
    })
    
    
    iconDone.addEventListener('click', () => {
        if(!icon.value) return;
    
        let newIcon = String(icon.value);
    
        function textReplace(haystack, needle, replacement) {
            needle = needle.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1")
                .replace(/\x08/g, "\\x08");
            return haystack.replace(new RegExp(needle, 'g'), replacement);
        }
    
        if(!newIcon.startsWith('https://') && !newIcon.startsWith('http://')) {
            newIcon.replace('www.', '');
            newIcon = `https://${newIcon}`;
        }
    
        localStorage.setItem('disg-icon', newIcon);
        docIcon.href = localStorage.getItem('disg-title');
    
        confirm('Icon was updated');
        window.location = window.location;
    })
    
    iconReset.addEventListener('click', () => {
        localStorage.removeItem('disg-icon');
        docIcon.href = localStorage.getItem('disg-icon') || './media/icon.png';
        icon.value = '';
    
        confirm('Icon was reset');
    })
    
    iconNone.addEventListener('click', () => {
        localStorage.setItem('disg-icon', 'None');
        docIcon.href = './media/newtab.png';
        icon.value = 'None';
    
        confirm('Icon was updated');
    })
}

if(websites) {
    const allWebsites = [{
        name: 'Minecraft Classic',
        image: 'https://www.commonsensemedia.org/sites/default/files/styles/ratio_16_9_large/public/blog/parentsultimateguide-minecraft-blog.jpeg',
        path: "https://classic.minecraft.net"
    },
    {
        name: 'Powerline.io',
        image: 'https://games66.imgix.net/thumb/2018/01/powerline-io.png?auto=format,compress&lossless=1&ch=DPR&q=90&cs=strip&w=280',
        path: "https://powerline.io",
    },
    {
        name: 'Wordle',
        image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/02/wordle-logo.jpg?q=50&fit=contain&w=960&h=500&dpr=1.5',
        path: "./websites/wordle/index.html",
    },
    {
        name: 'Wordle Unlimited',
        image: 'https://cdn.nerdschalk.com/wp-content/uploads/2022/01/wordle-logo-pics-18-759x427.png?width=600',
        path: "https://wordleunlimited.org"
    },
    {
        name: '2048',
        image: 'https://logodix.com/logo/1649425.png',
        path: "https://play2048.co"
    },
    {
        name: 'Paper.io',
        image: 'https://paper-io.com/images/paper-new.png',
        path: 'https://paper-io.com'
    },
    {
        name: 'Hole.io',
        image: 'https://cdn.discordapp.com/attachments/923042414271287317/977344953002893362/unknown.png',
        path: 'https://hole-io.com'
    },
    {
        name: 'Wings.io',
        image: 'https://iogames.onl/upload/imgs/wingio.gif',
        path: 'https://wings.io'
    },
    {
        name: 'Moto X3M',
        image: 'https://cdn.discordapp.com/attachments/923042414271287317/977345256376901642/unknown.png',
        path: 'https://motox3m.co'
    },
    {
        name: 'Run 3',
        image: 'https://digistatement.com/wp-content/uploads/2021/03/run-3.jpg',
        path: "./websites/run-3/index.html"
    }];

    allWebsites.sort((a, b) => {
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
    });

    allWebsites.forEach(website => {
        let element = document.createElement('div');
        element.dataset.website = true;
        element.dataset.name = website.name;

        const img = document.createElement('img');
        img.src = website.image;
        element.appendChild(img);

        const h2 = document.createElement('h2');
        h2.innerText = website.name;
        element.appendChild(h2);

        if(website.controllerOnly || website.touchOnly) {
            const p = document.createElement('p');
            if(website.controllerOnly) p.append('Controller');
            if(website.touchOnly) p.append(' or touchscreen only')

            element.appendChild(p);
        }

        websites.appendChild(element);
    })

    document.querySelectorAll('[data-website]').forEach(web => {
        web.addEventListener('click', () => {
            const websiteName = web.dataset.name;
            const website = allWebsites.find(website => website.name === websiteName);
            
            const websitesMain = document.getElementsByClassName('websites-main')[0];
            websitesMain.style.display = 'none';

            const iframe = document.createElement('iframe');
            iframe.src = website.path;
            iframe.dataset.embed = true;
            iframe.name = 'innerFrame';
            iframe.sandbox = 'allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads';
            iframe.frameborder = '0';
            iframe.allowFullscreen = "";

            document.getElementsByClassName('embed')[0].appendChild(iframe);
            document.getElementsByTagName('nav')[0].style.display = 'none';
        })
    });

    search.addEventListener('input', e => {
        const searchTerm = search.value;
        console.log(searchTerm);

        let websites = [];

        document.querySelectorAll('[data-website]').forEach(website => websites.push(website));
        
        websites.filter(website => !website.dataset.name.toLowerCase().includes(searchTerm.toLowerCase())).forEach(website => website.style.display = 'none');
        websites.filter(website => website.dataset.name.toLowerCase().includes(searchTerm.toLowerCase())).forEach(website => website.style.display = 'block');
    })
}