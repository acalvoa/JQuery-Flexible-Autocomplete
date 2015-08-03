(function($){
    //DEFINIMOS LA ENTRADA DEL CODIGO EN JQUERY
    $.fn.autocomplete = function(PARAMS){
        //DEFINIMOS LAS VARIABLES LOCALES
        var _SELF = this;
        //ACCIONES DEFAULT
        var _DEFAULTS =  {
            onChange: function(e){},
            onKeyUp: function(e){},
            onSelect: function(e){},
            onBlur: function(e){},
            dataAction: function(e,handler){},
            handler: function(data){},
            css: {},
            content: null,
            cache: {},
            minLength: 1
        };
        //SETTINGS
        var _SETTINGS = {};
        //DEFINIMOS EL CONSTRUCTOR
        var _CONSTRUCT = function(PARAMS){
            //REEMPLAZAMOS LOS DEFAULTS CON LOS SETTINGS
            _SETTINGS = $.extend({},_DEFAULTS,PARAMS);
            //ASIGNAMOS LOS HANDLER DE EVENTOS
            $(this).on('change',function(e){
                _SETTINGS.onChange(e);
            });
            $(this).on('keyup',function(e){
                _SETTINGS.onKeyup(e);
            });
            $(this).on('select',function(e){
                _SETTINGS.onSelect(e);
            });
            $(this).on('blur',function(e){
                _SETTINGS.onBlur(e);
            });
        };
        //DEFINIMOS LOS METODOS PRIVADOS
        var PRIV = {

        }
        //DEFINIMOS METODOS PUBLICOS
        this.PUB = {

        }

        _CONSTRUCT(PARAMS);
        return this;
    }
}(jQuery));