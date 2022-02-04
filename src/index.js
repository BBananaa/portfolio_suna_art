const gallContainer = document.querySelector('.gallery-container')

const bigConatiner = document.querySelector('.big-container')
const imgWrap = document.querySelector('.img-wrap')
const closeBtn = document.querySelector('.closeBtn')
let artImgs;
let gField;
let items;

  const loader = document.querySelector('.loader')
  const percent = document.querySelector('.percent')
  const making = document.querySelector('.making')
  const loadText = document.querySelector('.load-text')
  let t = 1

  loadText.style.transform = "translateX(-2000px)"

  const per = setInterval( () => {
    percent.textContent = String(t++).padStart(2, "0")
    if (t === 101) clearInterval(per)
  }, 18) 
  window.addEventListener("load", () => {
      making.textContent = "LOADING"
  })

  setTimeout( () => {
    loader.parentElement.removeChild(loader)
  }, 3500)



async function getPhotos() {
  let response = await fetch("./src/photos.json")
  let photos = await response.json()
  return photos
}

function getPhotosHtml(photos) {
  let photosHtml = photos.map(photo => {
      return `<div class="item">
                <div class="artwork">
                  <img class="artImg-s" src="${photo.src}" alt=""/>
                </div>
                <p class="title">${photo.title}</p>
              </div>`
  }).join('')
  return photosHtml
}

getPhotos().then(photos => {    
  gallContainer.innerHTML = `${getPhotosHtml(photos)}`    
  gField = gallContainer.getBoundingClientRect().width
  items = Array.from(document.getElementsByClassName("item"))
  artImgs = Array.from(document.getElementsByClassName("artImg-s"))
  
})
window.addEventListener("load", () => {
  for (let i = 0; i < items.length; i++) {
      if (i===2) {
        items[i].style.width = `30rem`
        items[i].style.top = `25%`
        items[i].style.zIndex = '100'
      } else if(i < 5) {
        items[i].style.width = `${randomNumber(20, 26)}rem`
        items[i].style.top = `${randomNumber(12, 70)}%`
        items[i].style.zIndex = `${Math.floor(randomNumber(50, 70))}`
      } else if ( 4 < i && i < 14 ) {
        items[i].style.width = `${randomNumber(13, 18)}rem`
        items[i].style.top = `${randomNumber(12, 55)}%`
        items[i].style.zIndex = `${Math.floor(randomNumber(50, 70))}`
      } else if ( 31 < i && i < 38 ) {
        items[i].style.width = `${randomNumber(8, 15)}rem`
        items[i].style.top = `${randomNumber(12, 65)}%`
        items[i].style.zIndex = `${Math.floor(randomNumber(10, 49))}`
      } else if( i > 37) {
        items[i].style.width = `${randomNumber(6, 12)}rem`
        items[i].style.top = `${randomNumber(12, 20)}%`
        items[i].style.zIndex = `${Math.floor(randomNumber(10, 49))}`
      } else {
        items[i].style.width = `${randomNumber(8, 14)}rem`
        items[i].style.top = `${randomNumber(20, 55)}%`
        items[i].style.zIndex = `${Math.floor(randomNumber(10, 49))}`
      }

      i === 2 ? items[i].style.left = '50%' : items[i].style.left = `${randomNumber(gField / 6, gField * 8)}px`
      items[i].childNodes[1].style.padding = `${randomNumber(3, 12)}px`

      let startx;
      let x;
      let xx;
      let pressed = false;
      let wheel;
      let xPos = 0;
      let add = -1
      let boundaryL;
      let boundaryR;
      const gallery = document.querySelector('#gallery')
      const headerGallery = document.querySelector('.gallery')
  
      headerGallery.addEventListener("click", () => {
        clearInterval(moving)
        return moving = setInterval(move, randomNumber(1, 30));
      })
  
      let moving = setInterval(move, randomNumber(1, 30));
  
      function move() {
        boundaryL = items.every(item => {
          return item.getBoundingClientRect().x > gField /5
        })
        boundaryR = items.every(item => {
          return item.getBoundingClientRect().x < gField /1.3
        })
  

          xPos = xPos + add;
          if (boundaryL) {
            add = -1
          } else if (boundaryR) {
            add = 1      
          }
          items[i].style.transform = `translateX(${xPos}px)`;
        
  
        if(gallery.style.display === "none") {
          clearInterval(moving)
        }
      }
    
      gallContainer.addEventListener('mouseup', () => {
          pressed = false;
      })  
      
      gallContainer.addEventListener('mousedown', (e) => {
        pressed = true;
        startx = e.offsetX;

        for (let img of artImgs) {
            if(e.target === img)
            return !pressed;
        }
      });
      
      gallContainer.addEventListener('wheel', (e) => {
        wheel = randomNumber(e.deltaY / 8, e.deltaY / 3) 
  
        if(wheel < 0) {
          add = -1
          if (boundaryR) return wheel = 0
        } else {
          add = 1
          if (boundaryL) return wheel = 0
        }
        xPos = xPos + wheel;
      })
    
      gallContainer.addEventListener('mousemove', (e) => {
        e.preventDefault()
        if(!pressed) return
        for (let img of artImgs) {
          if(e.target === img)
          return pressed = false;
        }

        x = e.offsetX
        xx = x - startx
  
        checkBoundary()
        if(i < 8) xPos = xPos + (xx / 60);
        else if(i < 16) xPos = xPos + (xx / 70);
        else if(i < 24) xPos = xPos + (xx / 80);
        else if(i < 32) xPos = xPos + (xx / 90);
        else xPos = xPos + (xx / 100);
      })
  
      gallContainer.addEventListener('touchstart', (e) => { 
        for (let img of artImgs) {
          if(e.target === img)
          return startx = false
        }
        startx = e.touches[0].pageX
      }, false);
      
      gallContainer.addEventListener('touchmove', (e) => {
        for (let img of artImgs) {
          if(e.target === img)
          return xx = false;
        }
        x = e.changedTouches[0].pageX;;
        xx = x - startx
        checkBoundary()
        if(i < 8) xPos = xPos + (xx / 70);
        else if(i < 16) xPos = xPos + (xx / 60);
        else if(i < 24 ) xPos = xPos + (xx / 50);
        else if(i < 32 ) xPos = xPos + (xx / 40);
        else xPos = xPos + (xx / 30);
  
      }, false)
      function checkBoundary() {
        if (startx < x) {
            add = 1
          if (boundaryL) {
            xx = 0
            return pressed = false;
          }      
        } else if (startx > x) {
          add = -1
          if (boundaryR) {
            xx = 0
            return pressed = false;
          }
        }
      }
    }
  
    let selectedImg;
    let text;
    
    artImgs.forEach(artImg => {
      artImg.addEventListener("click", enlargeImg)
  
      function enlargeImg(e) {
        selectedImg = document.createElement("img")
        text = document.querySelector('.text')
        selectedImg.src = `${e.target.src}`
  
        bigConatiner.style.display = "block"
        imgWrap.appendChild(selectedImg)
        text.textContent = `${e.target.parentElement.nextElementSibling.textContent}`
      }
    })
    closeBtn.addEventListener('click', () => {
      imgWrap.innerHTML =""
      text.innerHTML = ""
      bigConatiner.style.display = 'none'
    })
})


function randomNumber(min, max) {
  let random = Math.floor(Math.random() * (max - min) + min);
  return random
}
