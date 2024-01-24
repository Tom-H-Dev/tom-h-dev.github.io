jQuery(document).ready(function($){
	//if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
	var MQL = 1170;

	//primary navigation slide-in effect
	if($(window).width() > MQL) {
		var headerHeight = $('.box-header').height();
		$(window).on('scroll',
		{
	        previousTop: 0
	    }, 
	    function () {
		    var currentTop = $(window).scrollTop();
		    //check if user is scrolling up
		    if (currentTop < this.previousTop ) {
		    	//if scrolling up...
		    	if (currentTop > 0 && $('.box-header').hasClass('is-fixed')) {
		    		$('.box-header').addClass('is-visible');
		    	} else {
		    		$('.box-header').removeClass('is-visible is-fixed');
		    	}
		    } else {
		    	//if scrolling down...
		    	$('.box-header').removeClass('is-visible');
		    	if( currentTop > headerHeight && !$('.box-header').hasClass('is-fixed')) $('.box-header').addClass('is-fixed');
		    }
		    this.previousTop = currentTop;
		});
	}

	//open/close primary navigation
	$('.box-primary-nav-trigger').on('click', function(){
		$('.box-menu-icon').toggleClass('is-clicked'); 
		$('.box-header').toggleClass('menu-is-open');
		
		//in firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
		if( $('.box-primary-nav').hasClass('is-visible') ) {
			$('.box-primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
				$('body').removeClass('overflow-hidden');
			});
		} else {
			$('.box-primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
				$('body').addClass('overflow-hidden');
			});	
		}
	});
});

//Own 
let currentIndex = 0;
  const images = document.querySelectorAll('.carousel-image');
  const description = document.getElementById('carousel-description');
  const expandView = document.getElementById('expand-view');
  const expandedImage = document.getElementById('expanded-image');

  // Descriptions for each image
  const imageDescriptions = [
    'Djdhigihghdfgdfsg',
    'Description for Image 2',
  ];

  function updateCarousel() {
    const newTransformValue = -currentIndex * 100 + '%';
    document.getElementById('image-carousel').style.transform = 'translateX(' + newTransformValue + ')';
    updateDescription();
  }

  function updateDescription() {
    description.textContent = imageDescriptions[currentIndex];
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  }

  function openExpandView() {
    const currentImageSrc = images[currentIndex].src;
    expandedImage.src = currentImageSrc;
    expandView.style.display = 'flex';
  }

  function closeExpandView() {
    expandView.style.display = 'none';
  }

  // Set click event for each image
  images.forEach((image, index) => {
    image.onclick = (event) => {
      event.stopPropagation(); // Prevents the click from propagating to the document
      currentIndex = index;
      openExpandView();
    };
  });

  setInterval(nextSlide, 30000); // Auto-advance every 30 seconds

  updateCarousel(); // Initial update