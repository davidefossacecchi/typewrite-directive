angular.module('phox.utils',['phox.typewriter'])
	.controller('test.controller', ['$scope',
	    function($scope){
	   		$scope.sequence = [
	   			'if you specify',
	   			'an array of sentences',
	   			'the directive will autmatically loop the sentences'
	   		];

	   		$scope.single_sentence = "but if you specify a single sentence the directive will write that just one time";

	   		$scope.random = [
	   			'you can ask',
	   			'to randomize',
	   			'your sentences'
	   		];

	   		$scope.faster = [
	   			'you can ask',
	   			'to type',
	   			'faster'
	   		];

	   		$scope.slower = [
	   			'and you can ask',
	   			'to type',
	   			'slower'
	   		];
	    }
   ]);