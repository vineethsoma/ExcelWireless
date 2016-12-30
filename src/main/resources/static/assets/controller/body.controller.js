(function() {
	'use strict';

	angular.module('sampleApp').controller('BodyController', Body);

	Body.$inject = [ '$scope', '$state', '$window', '$log', '$timeout', 'dataService'];

	function Body($scope, $state, $window, $log, $timeout, dataService) {

        var vm = this;
        vm.showMenu = false;
        vm.showSubmenu = false;
        vm.service = dataService;
        vm.mock =
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
            vm.setHover(true);
		};

        vm.leaveSubmenu = function(event) {
            vm.setHover(false);
        };

        vm.subMenuButtonEnter = function(event) {
            vm.showSubmenu = true;
        };

        vm.leaveSubSubmenu = function(event) {
            vm.showSubmenu = false;
        };

		function render()
		{
            // vm.service.callGenericMethod('/getWebMenu', 'GET', {}).then(
            //     function success(response) {
            //         console.log(response);
            //
            //     },
            //     function error(reason) {
            //
            //     }
            // )
		}

		render();
	}
})();