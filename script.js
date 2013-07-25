(function($){

    $(document).ready(load);

    function load(){
        var Egg = {
                currentMode: 0,
                isLocked: false,
                css: 'body{cursor:none;}'
            },
            $window = $(window),
            $body = $('body');

        var Mode = function(name){
            this.name = name;
        };
        Mode.prototype.setActive = function(){
            Egg.subject.attr('class','');
            Egg.subject.addClass(this.name);
        };

        function createModes(){
            Egg.modes = [
                new Mode('normal'),
                new Mode('shift-red'),
                new Mode('invert'),
                new Mode('grey'),
                new Mode('predator')
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
            Egg.subject = $('#magnifier-subject');
        }

        function insertHTML(){
            Egg.magnifier = $($('#magnifier-template').html()).appendTo($body);
            Egg.slides = $('.slides',Egg.magnifier);
            Egg.dimens = {w:Egg.magnifier.width(),h:Egg.magnifier.height()};
        }

        function injectStyles(){
            Egg.styleElement = $('<style type="text/css">'+Egg.css+'</style>').appendTo($body);
        }

        function attachMouse(){
            $window.mousemove(function(e){
                Egg.magnifier.css({
                    top: e.pageY - Egg.dimens.h / 2,
                    left: e.pageX - Egg.dimens.w / 2
                });
            });
        }

        function setMode(d){

            if(Egg.isLocked) return;

            Egg.isLocked = true;

            var i;
            if(arguments.length == 0 || d > 0){
                i = Egg.currentMode + 1 < Egg.modes.length ? Egg.currentMode + 1 : 0;
            }
            else{
                i = Egg.currentMode > 0 ? Egg.currentMode - 1 : Egg.modes.length -1;
            }
            Egg.slides.addClass('rotate');
            Egg.slides.one('webkitAnimationEnd',function(){
                Egg.modes[i].setActive();
                Egg.slides.removeClass('rotate');
                Egg.isLocked = false;
            })
            Egg.currentMode = i;
        }

    }

})(jQuery);