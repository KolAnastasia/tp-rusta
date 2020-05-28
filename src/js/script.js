$(document).ready(function () {
   $('.main_trust_slider').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '0',
      responsive: [{
            breakpoint: 1200,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 1,
               autoplay: true,
               autoplaySpeed: 1000,
            }
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 2,
            }
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 1,
            }
         }
      ]
   })

   $(".sandwich-wrap").click(function () {
      $('.sandwich-wrap').toggleClass('active');
      $('.header_mob-menu').toggleClass('active')
   });

   $('.header_application').click(function () {
      $('.form-wrap-request').fadeIn(200)
      $('.page-blur').toggleClass('page-wrap-fix')
      $('.page').css("overflow", "hidden")
   })
   $('.form_icon-close').click(function () {
      $('.form-wrap-request').css("display", "none")
      $('.page-blur').removeClass('page-wrap-fix')
      $('.page').css("overflow", "auto")
   })

   $('.requisites-print-btn').click(function() {
      print()
   });

   $('.fancybox-img').fancybox();

   $('.inner-page_nav').click(function () {
      $('.inner-page_nav').toggleClass('active')
   })
});

// $(document).ready(function() {
//     $.fancybox.open($('.fancybox-img'));
// });

// let acc = document.getElementsByClassName("alta-po_btn");
// let i;

// for (i = 0; i < acc.length; i++) {
//   acc[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     let panel = this.nextElementSibling;
//     if (panel.style.maxHeight) {
//       panel.style.maxHeight = null;
//     } else {
//       panel.style.maxHeight = panel.scrollHeight + "px";
//     }
//   });
// }