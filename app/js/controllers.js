
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
		$rootScope.kw = 11;						// navigates desktop view
		$rootScope.canteen = 'casino';			// navigates canteen
		$rootScope.day = today.getDay() - 1; 	// navigates mobile view
		
		$rootScope.currentDay = today.getDay() - 1; // static value
		
		$rootScope.getData($rootScope.year,$rootScope.kw,$rootScope.canteen);
	}
]);

lunchControllers.controller('MobileViewCtrl', ['$rootScope', 
	function($rootScope) {
		
		$rootScope.showToday = function() {
			$rootScope.day = $rootScope.currentDay;
		};
		
		$rootScope.nextDay = function() {
			$rootScope.day = $rootScope.day + 1;
			
			if($rootScope.day > 4) {
				$rootScope.day = 4;
			}
			
			console.log($rootScope.day);
		};
		
		$rootScope.previousDay = function() {
			$rootScope.day = $rootScope.day - 1;
			
			if($rootScope.day < 0) {
				$rootScope.day = 0;
			}
			
			console.log($rootScope.day);
		};
	}
]);
