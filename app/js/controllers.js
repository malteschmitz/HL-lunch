
var lunchControllers = angular.module('lunchControllers', []);

function withZeroPadding(value) {
	return (value < 10 ? '0' : '') + value;
}


lunchControllers.controller('DataCtrl', ['$rootScope', '$http', 
	function($rootScope, $http) {
		$rootScope.getData = function(year, kw, canteen) {
			var config = {
				method:'GET',
				url:'../server/api.php',
				params:{
					'y':year,
					'kw':kw,
					'c':canteen
				}
			};
			
			$http(config).then(function(response) {
				$rootScope.meals = response.data.meals;
				$rootScope.days = response.data.week;
			});
		};
		
		var today = new Date();
		
		$rootScope.weekdays = [
			'Montag','Dienstag','Mittwoch','Donnerstag','Freitag'
		];
		
		$rootScope.year = today.getFullYear();
		$rootScope.kw = 11;
		$rootScope.canteen = 'casino';
		
		$rootScope.currentDay = new Date().getDay() - 1;
		
		$rootScope.getData($rootScope.year,$rootScope.kw,$rootScope.canteen);
	}
]);

lunchControllers.controller('MobileViewCtrl', ['$rootScope', 
	function($rootScope) {

	}
]);

lunchControllers.controller('DesktopViewCtrl', ['$rootScope',
	function($rootScope) {
		
	}
]);
