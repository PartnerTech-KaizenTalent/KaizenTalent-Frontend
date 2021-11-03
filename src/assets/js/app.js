/*
Autor: José Soplin Roncal y Diego Campos Sandoval
*/


jQuery(document).ready(function() {

    'use strict';

    // Loader 
    $(window).on('load', function() {
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    }); 

    // Selectize
    $('#select-category, #select-lang,#select-country').selectize({
        create: true,
        sortField: {
            field: 'text',
            direction: 'asc'
        },
        dropdownParent: 'body'
    });

    // Seleccionar todos los checkboxs
    $("#customCheckAll").click(function() {
        $(".all-select").prop('checked', $(this).prop('checked'));
    });

    // Nice Select
    $('.nice-select').niceSelect();

    // Volver Arriba
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    }); 
    $('.back-to-top').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 3000);
        return false;
    });

    //nuevo

    (function ($) {

        'use strict';
    
        // Menu
        $('.navbar-toggle').on('click', function (event) {
            $(this).toggleClass('open');
           //  La animación se cierra muy rapido
           //$('#navigation').slideToggle(400);
        });
        
        $('.navigation-menu>li').slice(-1).addClass('last-elements');
        
        $('.menu-arrow,.submenu-arrow').on('click', function (e) {
            if ($(window).width() < 992) {
                e.preventDefault();
                $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open');
            }
        });
        
        $(".navigation-menu a").each(function () {
            if (this.href == window.location.href) {
                $(this).parent().addClass("active"); 
                $(this).parent().parent().parent().addClass("active"); 
                $(this).parent().parent().parent().parent().parent().addClass("active"); 
            }
        });
    
        // Menu Clickeable
        $(".has-submenu a").click(function() {
            if(window.innerWidth < 992){
                if($(this).parent().hasClass('open')){
                    $(this).siblings('.submenu').removeClass('open');
                    $(this).parent().removeClass('open');
                } else {
                    $(this).siblings('.submenu').addClass('open');
                    $(this).parent().addClass('open');
                }
            }
        });
    
        $('.mouse-down').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 0
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    
        
    })(jQuery)

    // Mensaje alerta
    $(window).scroll(function(){

        $('.alertmessage').fadeIn();
        
    }); 


    var KaizenHHApp = (function () {
    "use strict";

    var windowRef = $(window);
    var bodyRef = $('body');
    var docRef = $(document);
    var bodyContent = $('.body-content');
    var contentWrapper = $("#wrapper");
    var sidebar = $("#sidebar-main");
    var preloaderStatus = $('#status');
    var preloaderContainer = $('#preloader');
    var mobileToggle = $('.button-menu-mobile');
    var fullScreenToggle = $("#btn-fullscreen");
    var sideMenuItems = $("#sidebar-menu a");
    var sideSubMenus = $('.has_sub');

    //Inicializar Widgets
    var initWidgets = function () {
        //Tooltips
        $('[data-toggle="tooltip"]').tooltip();
        //Popovers
        $('[data-toggle="popover"]').popover();
    };
    
    //Cargar la Sidebar
    var initSidebar = function () {
        var t = this;
        //Izi Scroll
        sidebar.slimscroll({
            height: 'auto',
            position: 'right',
            size: "10px",
            color: '#9ea5ab'
        });

        // Desplegar la Sidebar para dispositivos mobiles (para el responsive)
        mobileToggle.on('click', function (e) {
            e.preventDefault();
            bodyRef.toggleClass("fixed-left-void");
            contentWrapper.toggleClass("enlarged");
            return false;
        });
        // Clickeo en los items de la sidebar
        sideMenuItems.on('click', function (e) {
            var parent = $(this).parent();
            var sub = parent.find('> ul');

            if (!bodyRef.hasClass('sidebar-collapsed')) {
                if (sub.is(':visible')) {
                    sub.slideUp(300, function () {
                        parent.removeClass('nav-active');
                        bodyContent.css({ height: '' });
                        adjustMainContentHeight();
                    });
                } else {
                    visibleSubMenuClose();
                    parent.addClass('nav-active');
                    sub.slideDown(300, function () {
                        adjustMainContentHeight();
                    });
                }
            }
        });

        //Activar el menu
        sideMenuItems.each(function () {
            if (this.href == window.location.href) {
                $(this).addClass("active");
                $(this).parent().addClass("active"); // add active to li of the current link
                $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
                $(this).parent().parent().parent().addClass("active"); // add active class to an anchor
                $(this).parent().parent().prev().click(); // click the item to make it drop
            }
        });
    };

    //Cerrar el submenu
    var visibleSubMenuClose = function () {
        sideSubMenus.each(function () {
            var t = $(this);
            if (t.hasClass('nav-active')) {
                t.find('> ul').slideUp(300, function () {
                    t.removeClass('nav-active');
                });
            }
        });
    }

    // Ajustar el contenido centrar basado en la altura de los menus
    var adjustMainContentHeight = function () {
        // Ajustar la altura del contenido
        var docHeight = docRef.height();
        if (docHeight > bodyContent.height())
            bodyContent.height(docHeight);
    }

    //Full Screen
    var toggleFullscreen = function (e) {
        fullScreenToggle.on("click", function (e) {
            e.preventDefault();
            if (!document.fullscreenElement && /**/ !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // MÃ©todo utilizado
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
            return false;
        });
    };

    //Llamada a la funciÃ³n
    var onWinLoad = function (e) {
        preloaderStatus.fadeOut();
        preloaderContainer.delay(350).fadeOut('slow');
        bodyRef.delay(350).css({
            'overflow': 'visible'
        });
    };

    //Llamando a la funciÃ³n cuando esta seteado
    var onDocReady = function (e) {
        // Aplicar Meterial Design
        bodyRef.bootstrapMaterialDesign();

        //Widgets
        initWidgets();

        // Cargar la Sidebar
        initSidebar();

        // Full Screen xd
        toggleFullscreen();
    };

        // Bind de events
        var bindEvents = function () {
            docRef.ready(onDocReady);
            windowRef.on('load', onWinLoad);
        };

        // InicializaciÃ³n
        var init = function () {
            bindEvents();
        };

        return {
            init: init
        };
    }());

    (function ($) {
        "use strict";
        KaizenHHApp.init();
    }(window.jQuery));

});


