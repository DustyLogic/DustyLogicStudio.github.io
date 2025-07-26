function launchGallerySlideShow() {
  const galleryImages = document.querySelectorAll('.gallery-image');
  const gallery = document.querySelector('.image-gallery');
  let currentIndex = 0;
  const stripCount = 6;

  function createFlipLayer(currentSrc, nextSrc, direction = 'X') {
    const layer = document.createElement('div');
    layer.classList.add('flip-layer');

    const galleryWidth = gallery.clientWidth;
    const galleryHeight = gallery.clientHeight;
    const stripWidth = galleryWidth / stripCount;

    for (let i = 0; i < stripCount; i++) {
      const strip = document.createElement('div');
      strip.classList.add('flip-strip', direction === 'X' ? 'flip-x' : 'flip-y');
      strip.style.width = `${stripWidth}px`;

      const front = document.createElement('div');
      front.classList.add('face', 'front');
      front.style.backgroundImage = `url('${currentSrc}')`;
      front.style.backgroundSize = `${galleryWidth}px ${galleryHeight}px`;
      front.style.backgroundPosition = `-${stripWidth * i}px 0`;

      const back = document.createElement('div');
      back.classList.add('face', 'back');
      back.style.backgroundImage = `url('${nextSrc}')`;
      back.style.backgroundSize = `${galleryWidth}px ${galleryHeight}px`;
      back.style.backgroundPosition = `-${stripWidth * i}px 0`;

      strip.appendChild(front);
      strip.appendChild(back);

      const waveDelay = Math.sin(i * (Math.PI / stripCount)) * 400;
      strip.style.transitionDelay = `${waveDelay}ms`;

      layer.appendChild(strip);
    }

    gallery.appendChild(layer);
    return layer;
  }

  function flipTransition(currentSrc, nextSrc, callback) {
    const layer = createFlipLayer(currentSrc, nextSrc, 'X');

    setTimeout(() => {
      const strips = layer.querySelectorAll('.flip-strip');
      strips.forEach(strip => {
        strip.style.transform = 'rotateX(180deg)';
      });
    }, 100);

    setTimeout(() => {
      gallery.removeChild(layer);
      galleryImages[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % galleryImages.length;
      galleryImages[currentIndex].classList.add('active');
      if (callback) callback();
    }, 1800);
  }

  function shutterWaveFlipTransition(currentSrc, nextSrc, callback) {
    const layer = createFlipLayer(currentSrc, nextSrc, 'Y');

    setTimeout(() => {
      const strips = layer.querySelectorAll('.flip-strip');
      strips.forEach(strip => {
        strip.style.transform = 'rotateY(180deg)';
      });
    }, 100);

    setTimeout(() => {
      gallery.removeChild(layer);
      galleryImages[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % galleryImages.length;
      galleryImages[currentIndex].classList.add('active');
      if (callback) callback();
    }, 1800);
  }

  function showNextImage() {
    const currentImage = galleryImages[currentIndex];
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    const nextImage = galleryImages[nextIndex];
    const transitionStyle = Math.random() > 0.5 ? 'flip' : 'shutter';

    if (transitionStyle === 'flip') {
      flipTransition(currentImage.src, nextImage.src);
    } else {
      shutterWaveFlipTransition(currentImage.src, nextImage.src);
    }
  }

  if (galleryImages.length > 0) {
    setInterval(showNextImage, 5000);
  }
}

window.launchGallerySlideShow = launchGallerySlideShow;