(function($){

    $(document).ready(load);

    function load(){
        var magnifier,
            $window = $(window),
            $body = $('body'),
            dimens,
            subject,
            styleElement,
            currentMode = 0,
            modes = [],
            slides,
            isLocked = false,
            css = 'body{cursor:none;}';


        var Mode = function(name){
            this.name = name;
        };
        Mode.prototype.setActive = function(){
            subject.attr('class','');
            subject.addClass(this.name);
        };

        function createModes(){
            modes = [
                new Mode('normal'),
                new Mode('shift-red'),
                new Mode('invert'),
                new Mode('grey')
            ];
        }

        //init
        (function(){
            wrapContent();
            insertHTML();
            injectStyles();
            createModes();
            attachMouse();
            attachKeys();
        })();

        function attachKeys(){
            $window.bind('keydown keypress',function(e){
                if(e.which == 40 || e.which == 38){
                    setMode(e.which == 38 ? -1 : 1);
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }

        function wrapContent(){
            $body.html('<div id="magnifier-subject">'+$body.html()+'</div>');
            subject = $('#magnifier-subject');
        }

        function insertHTML(){
            magnifier = $($('#magnifier-template').html()).appendTo($body);
            slides = $('.slides',magnifier);
            dimens = {w:magnifier.width(),h:magnifier.height()};
        }

        function injectStyles(){
            styleElement = $('<style type="text/css">'+css+'</style>').appendTo($body);
        }

        function attachMouse(){
            $window.mousemove(function(e){
                magnifier.css({
                    top: e.pageY - dimens.h / 2,
                    left: e.pageX - dimens.w / 2
                });
            });
        }

        function setMode(d){

            if(isLocked) return;

            isLocked = true;

            var i;
            if(arguments.length == 0 || d > 0){
                i = currentMode + 1 < modes.length ? currentMode + 1 : 0;
            }
            else{
                i = currentMode > 0 ? currentMode - 1 : modes.length -1;
            }
            slides.addClass('rotate');
            slides.one('webkitAnimationEnd',function(){
                modes[i].setActive();
                slides.removeClass('rotate');
                isLocked = false;
            })
            currentMode = i;
        }

    }

})(jQuery);