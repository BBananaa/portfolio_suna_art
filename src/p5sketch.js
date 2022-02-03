let staticPath = 'https://static-assets.codecademy.com/Courses/Learn-p5/projects/static.mp4';
let cloudPath = 'https://static-assets.codecademy.com/Courses/Learn-p5/projects/cloud.mp4';
let humanPath = 'https://static-assets.codecademy.com/Courses/Learn-p5/projects/human.mp4';
let logoPath = './img/project/logo.jpg'
let centerPath = './img/project/center.jpg';

  const videoBg = document.querySelector('.p5video');

  let cloudVideo, staticVideo, humanVideo, logoImg, centerImg;
  let videos;
  let outsideVideos;

  let margin = 8;
  let numOfScreensTall = 4;
  let numOfScreensWide = 4;

  let counter = 1;
  
  let canvasH = videoBg.clientHeight;
  let canvasW = videoBg.clientWidth;
  function setup() {
  
  const p5Canvas = createCanvas(canvasW, canvasH);
  p5Canvas.parent(videoBg)

  cloudVideo = createVideo(cloudPath);
  staticVideo = createVideo(staticPath);
  humanVideo = createVideo(humanPath);
  centerImg = loadImage(centerPath);
  logoImg = loadImage(logoPath);

  videos = [staticVideo, cloudVideo, humanVideo];

  for (let i = 0; i < videos.length; i++) {
    let video0 = videos[i]
    video0.volume(0);
    video0.loop();
    video0.hide();
  }
  
  outsideVideos = [staticVideo, humanVideo, cloudVideo, humanVideo, logoImg];
}

function draw() {
  background(0);

  let w = (canvasW - margin * 3) / 4
  let h = (canvasH - margin * 3) /4

  for (let i = 0; i < numOfScreensWide; i++) { 
    let x = i * (w + margin);
    for (let j = 0; j < numOfScreensTall; j++) {
    
      let y = j * (h + margin);

      fill(255);
      
      // (0, 0)  (1, 0) (2, 0) (3, 0) 

      // (0, 1) /(1, 1) (2, 1) (3, 1)
      // (0, 2) /(1, 2) (2, 2) (3, 2)

      // (0, 3)  (1, 3) (2, 3) (3, 3) 

      if (i === 1 && j === 1) {
        image(centerImg, x, y, w, h, 0, 0, centerImg.width / 2, centerImg.height / 2);
      } else if (i === 1 && j === 2) {
        image(centerImg, x, y, w, h, 0, centerImg.height / 2, centerImg.width / 2, centerImg.height / 2);
      }
      else if (i === 2 && j === 1) {
        image(centerImg, x, y, w, h, centerImg.width / 2, 0, centerImg.width / 2, centerImg.height / 2);
      } else if (i === 2 && j === 2) {
        image(centerImg, x, y, w, h, centerImg.width / 2, centerImg.height / 2, centerImg.width / 2, centerImg.height / 2);
      }
      else { 
        // outside video
        let selectedIndex = (i + j * counter) % outsideVideos.length;
        let selectedVideo = outsideVideos[selectedIndex];
        image(selectedVideo, x, y, w, h);
      }
    }
  }
}
function mouseClicked() {
  counter++;
}
