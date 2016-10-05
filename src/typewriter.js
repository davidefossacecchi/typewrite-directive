angular.module('phox.typewriter', [])
	.directive('typewriter', ['$interval', '$timeout',
		function($interval, $timeout){
			return {
				restrict: 'A',
				scope: {
					sentences: '='
				},
				link: function(scope, elem, attrs){
					var type_delay = +attrs['typeDelay'] || 150;
					var erase_delay = +attrs['eraseDelay'] || 3000;
					var initial_delay = +attrs['initialDelay'] || 750;
					var randomize = attrs['randomize'];
					var cursor_char = attrs['cursor'] || '|';
					var new_line = attrs['newLine'] || false;
					var humanize = attrs['humanize'] ? (2 * type_delay / 100 * +attrs['humanize']) : 0;
					var manage_placeholder = attrs['managePlaceholder'] || false;
					var sentences_separator = angular.copy(scope.sentences);

					var step = 1;
					var stop = 0;
					var sentence;
					var sentences_shoulder = [];

					if(!manage_placeholder){
						var typed = document.createTextNode('');
						var cursor = document.createElement('span');
						var display_cursor = document.createTextNode(cursor_char);

						cursor.className = 'blink_me';
						cursor.appendChild(display_cursor);
						elem[0].appendChild(typed)
						elem[0].appendChild(cursor);
					}

					start();
					
					function start(){
						if(stop === 0){
							sentence = angular.isArray(sentences_separator) ? getNextSentence() : sentences_separator;
							sentences_shoulder.push(sentence);
						}
						$timeout(loop, getLoopDelay());
					}

					function loop(){
						stop += step;
						setTargetText(sentence.substr(0, stop));
						if(stop === 0 || stop === sentence.length){
							if(new_line) stop = 0;
							else step *= -1
							if(angular.isArray(sentences_separator)){
								start();
							}
							else if(cursor) elem[0].removeChild(cursor)
						}
						else $timeout(loop, getNextTypeDelay());
					}

					function setTargetText(text){
						if(!manage_placeholder) typed.nodeValue = text;
						else elem[0].placeholder = text;
					}

					function getNextSentence(){
						var index;
						if(sentences_separator.length === 0){
							sentences_separator = sentences_shoulder;
							sentences_shoulder = [];
						}

						index = randomize ? Math.round( Math.random() * (sentences_separator.length - 1) ) : 0;
						return sentences_separator.splice(index, 1)[0];
					}

					function getLoopDelay(){
						if(step === -1) return erase_delay;
						else return initial_delay;
					}

					function getNextTypeDelay(){
						if(step === -1) return type_delay
						else if(!humanize) return type_delay;
						else return Math.round(type_delay - humanize + (humanize * Math.random()));
					}

				}
			}
		}])