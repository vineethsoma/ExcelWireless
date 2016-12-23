(function() {
	'use strict';

	angular.module('sampleApp').controller('BodyController', Body);

	Body.$inject = [ '$scope', '$state','$window', '$log', '$timeout'];

	function Body($scope, $state, $window, $log, $timeout) {

        var vm = this;
        vm.showMenu = false;

        $scope.open = false;

        /**
		 * What happens when a user hovers over tab.
         * @param isHover
         */
        vm.setHover = function(isHover) {
            vm.showMenu = isHover;
        };

        /**
		 * What happens when a user mouse leaves a tab with a submenu.
         * @param event
         */
        vm.leaveTab = function(event) {
        	$log.info(event);
		};

        /**
		 * What happens when a user mouse enters a tab with a submenu.
         * @param event
         */
        vm.enterTab = function(event) {
        	if (vm.timeout) {
        		$timeout.cancel(vm.timeout);
			}
			vm.timeout = $timeout(function() {
				$log.info(event.clientX + ", " + event.clientY);
			}, 200);
		};

		function render()
		{

		}

		render();
	}
})();