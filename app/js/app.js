
function DesktopViewCtrl($rootScope, $scope) {
	$rootScope.weekdays = [
		'Montag','Dienstag','Mittwoch','Donnerstag','Freitag'
	];
	
	$rootScope.meals = [
		{ text:'Menü 1', id:0 },
		{ text:'Menü 2', id:1 }
	];
	
	$rootScope.days = [
		[
			{ text:'Spaghetti', price:'2,30', id:0 },
			{ text:'Fleisch', price:'3,00', id:1 }
		],
		[
			{ text:'Fisch', price:'4,30', id:0 },
			{ text:'Salat', price:'2,00', id:1 }
		],
		[
			{ text:'Geschnetzeltes', price:'3,30', id:0 },
			{ text:'Nudeln', price:'1,70', id:1 }
		],
		[
			{ text:'Braten', price:'4,10', id:0 },
			{ text:'Pizza', price:'3,00', id:1 }
		],
		[
			{ text:'Milchreis', price:'2,00', id:0 },
			{ text:'Currywurst', price:'4,00', id:1 }
		]
	];
	
	
}

function MobileViewCtrl($rootScope) {
	$rootScope.currentDay = new Date().getDay() - 1;
}
