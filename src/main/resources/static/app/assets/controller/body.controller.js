(function() {
	'use strict';

	angular.module('sampleApp').controller('BodyController', Body);

	Body.$inject = [ '$scope', '$state', '$window', '$log', '$timeout'];

	function Body($scope, $state, $window, $log, $timeout) {

        var vm = this;
        vm.showMenu = false;

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
        	//console.dir(event);
            var element, pX, pY, eX, eY, eH, eW;
            pX = event.clientX;
            pY = event.clientY;
            element = jQuery(event.currentTarget);
            eX = element.prop('offsetLeft');
            eY = element.prop('offsetTop');
            eH = element.prop('offsetHeight');
            eW = element.prop('offsetWidth');
            console.log(pX);
            console.log(pY);
            console.log(eX);
            console.log(eY);
            console.log(eH);
            console.log(eW);
            console.log(event);
            console.log(element);
            console.log("pointer: " + pY);
            console.log("element: " + (eY + eH));
            if (pY > (eY + eH)) {
            	vm.setHover(true);
			} else {
            	vm.setHover(false);
			}
		};

        /**
		 * What happens when a user mouse enters a tab with a submenu.
         * @param event
         */
        vm.enterTab = function(event) {
            var element, pX, pY, eX, eY, eH, eW;
            pX = event.clientX;
            pY = event.clientY;
            element = jQuery(event.currentTarget);
            eX = element.prop('offsetLeft');
            eY = element.prop('offsetTop');
            eH = element.height();
            eW = element.width();
            console.log(pX);
            console.log(pY);
            console.log(eX);
            console.log(eY);
            console.log(eH);
            console.log(eW);
            console.log(event);
            console.log(element);
            vm.setHover(true);
            // if (vm.timeout) {
        		// $timeout.cancel(vm.timeout);
			// }
			// vm.timeout = $timeout(function() {
			// 	$log.info(event.clientX + ", " + event.clientY);
            //
			// }, 200);
		};

		function render()
		{

		}

		render();
	}
})();