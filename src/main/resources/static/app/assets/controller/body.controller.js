(function() {
	'use strict';

	angular.module('sampleApp').controller('BodyController', Body);

	Body.$inject = [ '$scope', '$rootScope','$state','$window'];

	function Body($scope, $rootScope,$state,$window) {
		
		var vm = this;

		$scope.open = false;

		function render()
		{

		}

		render();
	}
})();