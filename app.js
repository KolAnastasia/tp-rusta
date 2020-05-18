// главный банер
$("#slider3").responsiveSlides({
  auto: true,
  pager: false,
  nav: true,
  timeout: 4000,
  prevText: "",
  nextText: "",
  speed: 200,
  pauseControls: true,
  namespace: "main-slider"
});

// Предложение недели
/*$(".actions-b__cont").slick({
  dots: false,
  infinite: true,
  arrows: false,
  fade: true,
  autoplay: false,
  draggable: false,
  slidesToShow: 1,
  slidesToScroll: 1
});*/

// дневник строительства (всплывающее окно)
$(".month-slider__inner").slick({
  dots: false,
  infinite: false,
  arrows: false,
  fade: false,
  autoplay: false,
  draggable: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  centerMode: false,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true
      }
    }
  ]
});


// Нежилые помещения (всплывающее окно)
function SliderPopInit() {
  $('.popup .one-slide__bottom').slick({
    dots: false,
    infinite: false,
    arrows: false,
    fade: false,
    autoplay: false,
    draggable: true,
    centerMode: false
  });
  $('.popup .one-slide__bottom').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    let nav = document.querySelector('.popup .one-slide__top');
    nav.innerHTML = '';
    nav.insertAdjacentHTML('afterBegin', `<p><span>${nextSlide + 1}</span>/${slick.$slides.length}</p>`);
  });
  $('.popup .left-btn').on('click', function() {
      $('.popup .one-slide__bottom').slick('slickPrev');
  });
  $('.popup .right-btn').on('click', function() {
      $('.popup .one-slide__bottom').slick('slickNext');
  });
};
document.querySelector('body').addEventListener('popupOpen', e=>{
  if(e.namePop == 'nonResidential') {
    SliderPopInit();
  }
})

// настройка фансибокса для дневника стройки
$('[data-fancybox]').fancybox({
  toolbar: false,
  smallBtn: true
})
if(window.location.pathname=='/'){
  function btnShowMoreInit() {
    let moreContainer = document.querySelector('.more-container');
    let moreBody = document.querySelector('.docs-b__content');

    moreContainer.addEventListener('click', e => {
      if (e.target.closest('.button')) {
        moreContainer.querySelector('.docs-b__content_more').classList.remove('docs-b__content_more');
        moreContainer.querySelector('.button_docs-btn').remove();
      }
    })
  };
  btnShowMoreInit();
}

function minimizationOfMenu() {
  let head = document.querySelector('.head');
  let wrap = head.querySelector('.head__wrapper');

  document.addEventListener('scroll', e => {
    if (window.pageYOffset > 400) {
      wrap.classList.add('head__wrapper_small')
    } else {
      wrap.classList.remove('head__wrapper_small')
    }
  });
};
minimizationOfMenu();

class ActionsOfWeek {
  constructor(element, ar) {
    this.slides = ar;
    this.rootElement = document.querySelector(element);
    this.nowPos = 0;
    this.totalPos = this.slides.length;
    this._buttonsInit();
    this.navigateSetting();
    this._init();
  };

  goTo(numberSlide) {
    this._getElemenentBySelector('.line-act__params').innerHTML = '';

    this._getElemenentBySelector('.actions-b__one-l img').setAttribute('src', this.slides[numberSlide].imgLeft);
    this._getElemenentBySelector('.actions-b__one-r .img').style.cssText += `background-image: url('${this.slides[numberSlide].imgRight}')`;

    this._getElemenentBySelector('.line-act__title').innerHTML = this.slides[numberSlide].title;
    this._getElemenentBySelector('.line-act__price').innerHTML = this.slides[numberSlide].price;

    // заполнение параметров. В идеале 2
    let params = this.slides[numberSlide].params;
    if (params) {
      for (let i = 0; i < params.length; i++) {
        this._getElemenentBySelector('.line-act__params').insertAdjacentHTML('beforeEnd', `<div class="param-one"><p>${params[i].name}</p><p>${params[i].value}</p></div>`);
      };
    }
  };

  navigateSetting() {
    let nav = this._getElemenentBySelector('.line-act__nav');

    this._getElemenentBySelector('.line-act__nav').addEventListener('click', e => {
      nav.querySelectorAll('.nav-one').forEach(el => {
        el.classList.remove('active');
      });
      if (e.target.closest('.nav-one')) {
        this.nowPos = e.target.closest('.nav-one').dataset.slide;
        this.goTo(this.nowPos);
        nav.querySelectorAll('.nav-one')[this.nowPos].classList.add('active');
      };
    })
  };

  _init() {
    this.goTo(0);
    this._getElemenentBySelector('.line-act__nav').querySelectorAll('.nav-one')[0].classList.add('active');
  };

  _buttonsInit() {
    let nav = this._getElemenentBySelector('.line-act__nav');
    nav.innerHTML = '';

    for (let i = 0; i < this.totalPos; i++) {
      let oneNav = document.createElement('div');
      oneNav.classList.add('nav-one');
      oneNav.setAttribute('data-slide', i);
      nav.appendChild(oneNav);
    };
  };

  _getElemenentBySelector(selector) {
    return this.rootElement.querySelector(selector)
  };

};

class About {
  constructor(element, ar) {
    this.slides = ar;
    this.rootElement = document.querySelector(element);
    this.nowPos = 0;
    this.totalPos = this.slides.length;
    this.navigateSetting();
    this.goTo(0);
  };

  goTo(numberSlide) {
    this.rootElement.style.cssText += `background-image: url('${this.slides[numberSlide].img}')`;
    this._getElemenentBySelector('.about-b__body .black').innerHTML = this.slides[numberSlide].title;
    this._getElemenentBySelector('.about-b__body .text').innerHTML = this.slides[numberSlide].desc;
    this._getElemenentBySelector('.part-numb__is').innerHTML = this.slides[numberSlide].num;
    this._getElemenentBySelector('.part-numb__from').innerHTML = this.totalPos;
  };

  navigateSetting() {
    this._getElemenentBySelector('.about-b__nav-left').addEventListener('click', e => {
      if (e.target.closest('.prev')) {
        this.nowPos--;
        this._checkPosition();
        this.goTo(this.nowPos);
      };
      if (e.target.closest('.next')) {
        this.nowPos++;
        this._checkPosition();
        this.goTo(this.nowPos);
      }
    })
  };

  _getElemenentBySelector(selector) {
    return this.rootElement.querySelector(selector)
  };

  _checkPosition() {
    if (this.nowPos < 0) {
      this.nowPos = this.totalPos - 1
    };
    if (this.nowPos > this.totalPos - 1) {
      this.nowPos = 0
    };
  }
};

(function genPlanNav() {
  let svg = document.querySelector('#genplanSVG');
  let plans = document.querySelector('.plans-b__content');
  let images = document.querySelector('.slider-plan__images');
  let slider = document.querySelector('#sliderPlan');

  svg ? init() : null;

  function init() {
    svg.addEventListener('click', e => {
      let elem = e.target;

      if (elem.dataset.polygon) {
        let poly = elem.dataset.polygon;
        // вешаем класс на svg polygon
        removeClass(svg, 'clicked');
        addClass(elem);

        // боксы с картинками
        removeClass(plans, 'vis');
        /*setButtons(poly);*/
        visImageBox('#' + poly, 'vis');
      };
    });
    showDescPosition();
  };

  function addClass(elem) {
    elem.classList.add('clicked');
  };

  function removeClass(parent, className) {
    parent.querySelectorAll('.' + className).forEach(el => {
      el.classList.remove(className)
    });
  };

  function visImageBox(selector, className) {
    plans.querySelector(selector).classList.add(className);
  };

  function showDescPosition() {
    plans.addEventListener('mousemove', e => {
      getAreaHandler({
        event: e,
        content: e.target.dataset.desc
      });
    });
    images.addEventListener('click', e => {
      e.preventDefault();
    });
  };

  function getAreaHandler(data) {
    // выставляем всплывающее окно
    var x = data.event.layerX;
    var y = data.event.layerY;

    if (data.content) {
      document.querySelector('.pop-descript').style.cssText += `left: ${x}px; top: ${y}px; display: inline-block`;
      document.querySelector('.pop-descript').innerHTML = data.content;
    } else {
      document.querySelector('.pop-descript').style.cssText += 'display: none';
    }
  };

  /*function setButtons(elem) {
    function setB() {

    };

    let count = 0;
    // настраиваем видимость кнопок листания в зависимости от количества фоток
    let allSectionPlan = document.getElementById(elem).querySelectorAll('.sectionPlan');
    if (allSectionPlan.length > 1) {
      let nav = slider.querySelectorAll('.nav-round');

      nav.forEach(el => {
        el.style.cssText += 'display:block';
      });

    }
    /*else {
        let nav = slider.querySelectorAll('.nav-round');
        
        nav.forEach(el=>{
            el.style.cssText += 'display:none';
        });
    }
  };*/


})();

function clickToOpen() {
  let windowPop = document.querySelector('.windows');
  let body = document.querySelector('body');

  document.addEventListener('click', event => {
    let elem = event.target;
	
    if(event.target.closest('[data-popup]')) {
      
      let popName = event.target.closest('[data-popup]').dataset.popup;
      document.getElementById(popName) ? vis(popName) : null;
    };

    if (elem.dataset.close) {
		let pops = document.querySelectorAll('.popup');
		pops.forEach(elem => {
			elem.classList.remove('popup_vis');
		});
		
		
		
		body.classList.remove('page_blocked');
		windowPop.classList.remove('windows_vis');
    };
	
	if(event.target.closest('[data-action-window="close"]')) {
		switchWindowBox(0);
        switchPageBlocker(0);
	};
		
    function vis(id) {
      // генерируем и отправляем событие с именем открытого окна
      // нужно чтобы по это событию инициализировался слайдер slick
      // иначе ошибка 
		let newEvent = new Event('popupOpen', { bubbles: true});
		newEvent.namePop = id;

		body.classList.add('page_blocked');
		windowPop.classList.add('windows_vis');
		document.getElementById(id).classList.add('popup_vis');

		body.dispatchEvent(newEvent);
    };
	
	if(event.target.closest('.call')) {
		call();
  };
  
  if(event.target.closest('.auto')) {
		auto();
  };

  if(event.target.closest('.bus')) {
		bus();
  };
		
	function call() {
        switchWindowBox(1);
        switchPageBlocker(1);		
        let call = document.getElementById('call');
        // очищаем результат предыдущей заявки
        call.querySelector('form').style.display = '';
        call.querySelector('.popup__form-message').innerHTML = '';
        
        call.classList.add('popup_active');
        setTimeout(()=>{
            call.classList.add('popup_vis');
        }, 100);
    };
  
    
  function auto() {
      switchWindowBox(1);
      switchPageBlocker(1);		
      let auto = document.getElementById('auto');
      // очищаем результат предыдущей заявки

      auto.classList.add('popup_active');
      setTimeout(()=>{
        auto.classList.add('popup_vis');
      }, 100);
  };

  function bus() {
      switchWindowBox(1);
      switchPageBlocker(1);		
      let bus = document.getElementById('bus');
      // очищаем результат предыдущей заявки

      bus.classList.add('popup_active');
      setTimeout(()=>{
        bus.classList.add('popup_vis');
      }, 100);
  };

	// переключаем видимость блокировщика страницы
    function switchPageBlocker(boolean) {
        boolean ? body.classList.add('page_blocked') :
                  body.classList.remove('page_blocked');
    };
    
    // переключаем видимость бокса для всплывающих окон
    function switchWindowBox(boolean) {
        boolean ? windowPop.classList.add('windows_vis') :
                  windowPop.classList.remove('windows_vis');
    };
	
  });
};
clickToOpen();

// переключение секций
function switchSection() {
  let view = {
    el: '',
    open(selector) {
      this.el.querySelector(selector).classList.add('');
    }
  };

  let model = {
    init(el) {
      // открыть первое меню
      el.querySelectorAll('.switch-section__menu-one')[0].classList.add('active');

      let nameSection = el.querySelectorAll('.switch-section__menu-one')[0].dataset.sectionTitle;

      el.closest('.switch-section').querySelectorAll('.switch-section__block-one').forEach(item => {
        if (item.dataset.section == nameSection) {
          item.classList.add('display')
        }
      })
    },
    getTarget(event) {
      view.el = event.target.closest('.switch-section');
    },
    removeAll(where, who, what) {
      view.el.querySelector(where).querySelectorAll(who).forEach(el => {
        el.classList.remove(what);
      })
    },
    setOpen(event) {
      this.closeBlocks();
      this.closeMenu();

      event.target.closest('.switch-section__menu-one').classList.add('active');
      let nameSection = event.target.dataset.sectionTitle;

      view.el.querySelectorAll('.switch-section__block-one').forEach(item => {
        if (item.dataset.section == nameSection) {
          item.classList.add('display')
        }
      })
    },
    closeBlocks() {
      this.removeAll('.switch-section__blocks', '.switch-section__block-one', 'display')
    },
    closeMenu() {
      this.removeAll('.switch-section__menu', '.switch-section__menu-one', 'active')
    },
  };

  let controller = {
    handler() {
      document.querySelectorAll('.switch-section').forEach(el => {
        model.init(el);
        el.addEventListener('click', (e) => {
          if (e.target.closest('.switch-section__menu-one')) {
            model.getTarget(e);
            model.setOpen(e);
          }
        });
      });
    }
  };

  (function () {
    try {
      controller.handler();
    } catch (e) {};
  })();
};
switchSection();

function mobileMenu() {
  let menuOpenBtn = document.querySelector('.head__menu_mobile-btn');
  let menuBody = document.querySelector('.head__menu_mobile-body');
  let menuCloseBtn = document.querySelector('.head__menu_mobile-close');
  
  if(menuOpenBtn && menuBody && menuCloseBtn) {
    menuOpenBtn.addEventListener('click', e=>{
      menuBody.classList.add('open')
    });
    
    menuCloseBtn.addEventListener('click', e=>{
      menuBody.classList.remove('open')
    })
  }
};
mobileMenu();

function setVideoSize() {
  let allVideos = document.querySelectorAll('.main-slider video');
  window.addEventListener('resize', e=>{
    init()
  });
  
  function init() {
    let width = document.body.clientWidth;
    allVideos.forEach(elem=>{
      elem.width = width;
    })
  };
  return init()
};
setVideoSize();

function imagesLayerAnimat() {
  let box = document.getElementById('images-block');
  window.addEventListener('load', e=>{
    box.classList.add('start')
  });
};
imagesLayerAnimat();

// зум карты
try {
  document.querySelector('.box-map').addEventListener('click', function(e) {
      if(e.target.classList.contains('box-map__options-plus')) {
          document.querySelector('.gmnoprint button[aria-label="Увеличить"]').click();
      }
      else if(e.target.classList.contains('box-map__options-minus')) {
          document.querySelector('.gmnoprint button[aria-label="Уменьшить"]').click();
      }
  }); 
} catch(e) {};


//Слайдер в планировке этажей (в всплывающем окне)

  $('.plan-images__slider-wrap').slick ({
    arrows: true,
    centerMode: true,
    slidesToShow: 1,
    prevArrow: $('.plan-images__arrow__left'),
    nextArrow: $('.plan-images__arrow__right'),
    responsive: true,
    centerPadding : 0,
});


$('.plan-images__slider-wrap .slick-list').css({ "height": "450px","width": "894px"})
$('.plan-images__item.slick-slide.slick-cloned').css({"width": "894px"});
