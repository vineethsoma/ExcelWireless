(function() {
	'use strict';

	angular.module('sampleApp').controller('BodyController', Body);

	Body.$inject = [ '$scope', '$state', '$window', '$log', '$timeout'];

	function Body($scope, $state, $window, $log, $timeout) {

        var vm = this;
        vm.showMenu = false;
        vm.showSubmenu = false;

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
        	console.dir(event);
            var element, pX, pY, eX, eY, eH, eW, leavingLeft, leavingRight, leavingTop, leavingBottom;
            pX = event.pageX;
            pY = event.pageY;
            element = angular.element(event.currentTarget);
            eX = event.target.getBoundingClientRect().left;
            eY = event.target.getBoundingClientRect().top;
            eH = element.prop('offsetHeight');
            eW = element.prop('offsetWidth');
            leavingLeft = pX <= eX;
            leavingRight = pX >= (eX + eW);
            leavingBottom = pY >= (eY + eH);
            leavingTop = pY <= eY;
            if (pY >= (eY + eH)) { // if pointer Y pos is gt (elem y + elem height)
                console.log("left: " + leavingLeft);
                console.log("right: " + leavingRight);
                console.log("bottom: " + leavingBottom);
                console.log("top: " + leavingTop);
            	vm.setHover(true);
			} else {
                console.log("left: " + leavingLeft);
                console.log("right: " + leavingRight);
                console.log("bottom: " + leavingBottom);
                console.log("top: " + leavingTop);
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
            vm.setHover(true);
		};

        vm.leaveSubmenu = function(event) {
            vm.setHover(false);
        };

		function render()
		{

		}

		render();
	}
})();