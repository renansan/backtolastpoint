/*
 *	Back to Last Point - jQuery Plugin
 *
 *	Copyright (c) Renan San
 *	http://www.github.com/renansan
 *
 *	Plugin website:
 *	http://www.github.com/renansan/backtolastpoint
 *
 *	Licensed under the MIT license.
 *	http://en.wikipedia.org/wiki/MIT_License
 */

;(function ( $, window, document, undefined ) {

	// Create the defaults once
	var pluginName = 'backToLastPoint',
        defaults = {
            justAnchors: false, // Quando "true", o botão só considera a navegação por âncoras "on page"
            scrollDuration: 400 // Velocidade do "smooth scroll" pra voltar ao último ponto
        };

    // The actual plugin constructor
    function Plugin( el, options) {
        // this. element = element;
        this.element = el;
        element = el;

        this.settings = $.extend( {}, defaults, options) ;
        settings = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

	// Ações/Actions
	Plugin.prototype.init = function () {
		// Evita conflitos ao chamar uma função do plugin quando essa
		// função está dentro de outra função (ex: on click/hover/resize)
		var self = this;

		// Variáveis globais
		this.position = $(document).scrollTop(), // Armazena a posição (scrollTop) atual da página
		this.lastPosition; // Armazena a última posição da página

		// Ready
			// Insere a classe no plugin
				$(self.element).addClass('backtolastpoint').attr('href', 'javascript:void(0)');

			// Gera o Help Data
				// Se houver uma div com a id x
				if ($("#btlp-data").length > 0) {
					self.showHelpData();
				};

		// Scroll
			// Chama a função principal do plugin
				// Se o plugin estiver setado para "apenas em âncoras"
				if (this.settings.justAnchors) {
					
					$(document).on("scroll", function() {
						self.position = $(document).scrollTop();
					});
					
					$("a[href*=#]").click(function() {
						console.log("actual position: " + self.position);
						self.lastPosition = self.position;
						console.log("Real Last Position: " + self.lastPosition);
					});

				} else {
					$(document).on("scroll", function() {
						self.lastPosition = self.position;
						self.position = $(document).scrollTop();
					});
				};

		// CLick
			// Chama a ação principal do plugin
				// Quando o botão btlp é clicado, a página rola até o ponto anterior
				$(".backtolastpoint").click(function(event) {
					event.preventDefault();
					event.stopPropagation();
					self.backtoLastPoint();
				});

	};

	Plugin.prototype.backtoLastPoint = function () {
		var self = this;
		// Rola a página para a última posição
		$('html, body').animate({
			scrollTop: self.lastPosition
		}, self.settings.scrollDuration);
	};

	Plugin.prototype.showHelpData = function () {
		var self = this;
		// Gera o HTML que exibe os dados do btlp
		$html = '<h2>Dados</h2>';
		$html += '<ul>';
		$html += '<li class="btlp-position">Posição atual: <span class="btlp-data-value"></span></li>';
		$html += '<li class="btlp-last-position">Última posição: <span class="btlp-data-value"></span></li>';
		$html += '</ul>';

		// Insere o HTML gerado na div x
		$("#btlp-data").prepend($html);

		// Quando a página é rolada, atualiza a atual e a última posição no arquivo data
		$(document,"a[href*=#]").on("ready scroll mouseover mouseup click", function() {
			$("#btlp-data .btlp-position .btlp-data-value").text(self.position);
			$("#btlp-data .btlp-last-position .btlp-data-value").text(self.lastPosition);
		});
	};

    $.fn[ pluginName ] = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });

        return this;
    };

}(jQuery, window, document));

// Finish Here //