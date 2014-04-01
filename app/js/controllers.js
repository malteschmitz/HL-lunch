
// Add method getWeek to Date object
Date.prototype.getWeek = function() {
	var onejan = new Date(this.getFullYear(),0,1);
	return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
} 

var lunchControllers = angular.module('lunchControllers', []);

function withZeroPadding(value) {
	return (value < 10 ? '0' : '') + value;
}


lunchControllers.controller('DataCtrl', ['$rootScope', '$http', '$scope', 
	function($rootScope, $http, $scope) {
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
		
		$scope.canteens = ["Casino", "Mensa"];
		$scope.selectedCanteen = 0;
		$scope.canteenClicked = function($index) {
			$scope.selectedCanteen = $index;
			$rootScope.canteen = $scope.canteens[$index].toLowerCase();
		};
		
		var today = new Date();
		
		// static values
		$rootScope.weekdays = [
			'Montag','Dienstag','Mittwoch','Donnerstag','Freitag'
		];
		
		$rootScope.year = today.getFullYear();
		$rootScope.kw = today.getWeek();
		$rootScope.currentDay = today.getDay() - 1;
		
		// navigation variables
		$rootScope.canteen = 'casino';				// navigates canteen
		$rootScope.day = today.getDay() - 1; 		// navigates mobile view
		
		// watch function
		$rootScope.$watch('canteen', function() {
			$rootScope.getData($rootScope.year,$rootScope.kw,$rootScope.canteen);
		});
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
		};
		
		$rootScope.previousDay = function() {
			$rootScope.day = $rootScope.day - 1;
			
			if($rootScope.day < 0) {
				$rootScope.day = 0;
			}
		};
	}
]);

lunchControllers.controller('DesktopViewCtrl', ['$rootScope',
	function($rootScope) {
		
	}
]);
