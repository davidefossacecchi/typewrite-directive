angular.module('phox.typewriter', [])
	.directive('typewriter', ['$interval', '$timeout',
		function($interval, $timeout){
			return {
				restrict: 'A',
				scope: {
					sentences: '='
				},
				link: function(scope, elem, attrs){
					var type_delay = attrs['typeDelay'] || 150;
					var erase_delay = attrs['eraseDelay'] || 3000;
					var initial_delay = attrs['initialDelay'] || 750;
					var randomize = attrs['randomize'];
					var cursor_char = attrs['cursor'] || '|';
					var step = 1;
					var stop = 0;
					var sentence;
					var sentences_shoulder = [];

					var typed = document.createTextNode('');
					var cursor = document.createElement('span');
					var display_cursor = document.createTextNode(cursor_char);
					
					var interval_promise;

					cursor.className = 'blink_me';
					cursor.appendChild(display_cursor);
					elem[0].appendChild(typed)
					elem[0].appendChild(cursor);

					restart();

					function loop(){
						stop += step;
						typed.nodeValue = sentence.substr(0, stop);
						if(stop === 0 || stop === sentence.length){
							$interval.cancel(interval_promise);
							step *= -1
							if(angular.isArray(scope.sentences)){
								restart();
							}
							else elem[0].removeChild(cursor)
						}
					}


					function getNextSentence(){
						var index;
						if(scope.sentences.length === 0){
							scope.sentences = sentences_shoulder;
							sentences_shoulder = [];
						}

						index = randomize ? Math.round( Math.random() * (scope.sentences.length - 1) ) : 0;
						return scope.sentences.splice(index, 1)[0];
					}

					function restart(){
						if(stop === 0){
							sentence = angular.isArray(scope.sentences) ? getNextSentence() : scope.sentences;
							sentences_shoulder.push(sentence);
						}
						$timeout(
							function(){
								interval_promise = $interval(loop, type_delay);
							}, getLoopDelay()
						)
					}

					function getLoopDelay(){
						if(step === -1) return erase_delay;
						else return initial_delay;
					}

					scope.$on('$destroy', function(){
						$interval.cancel(interval_promise);
					})

				}
			}
		}])