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
        name: 'Minecraft',
        image: 'https://www.commonsensemedia.org/sites/default/files/styles/ratio_16_9_large/public/blog/parentsultimateguide-minecraft-blog.jpeg',
        path: "minecraft/index.html"
    },
    {
        name: 'Fortnite',
        image: "https://blogger.googleusercontent.com/img/a/AVvXsEgtkB9wvTL06eYHiO3c2foidOlhGjC8GS7Znneb2BRkAHpq5fruEtYoohQCzXRi7JOe_RujyhXWWgpXOJvdE_t8Bb84_B__moECEujg6dz_yS8n0KCDM8fNzEGIZbbtzePjzHST5NxavlMlydtzLrKa-uc5ErI2egPPGhsU1VBzG0RVki4kP4ayWe01=s640",
        controllerOnly: true,
        touchOnly: true,
        path: "xbox/www.xbox.com/en-US/play/manifest0cce.json"
    }];

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

            const embed = document.createElement('embed');
            embed.src = `./websites/${website.path}`;
            embed.dataset.embed = true;

            document.getElementsByClassName('embed')[0].appendChild(embed);
            document.getElementsByTagName('nav')[0].style.display = 'none';
        })
    })
}