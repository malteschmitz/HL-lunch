
var page = require('webpage').create();

page.open('http://studentenwerk-s-h.de/seiten_essen/plan_mensa_luebeck.html', function(status) {
	
	if(status !== 'success') {
		console.log('Page load error');
	} else {
		
		page.includeJs("http://code.jquery.com/jquery-1.10.1.min.js", function() {
			
			var week_data = page.evaluate(function() {
				
				var $gerichte = $(".schrift_gerichte");
				
        var meals = [
          { "text":"Menü 1", "id":0 },
          { "text":"Menü 2", "id":1 },
          { "text":"Vegetarisch", "id":2 },
          { "text":"Spezial", "id":3 },
          { "text":"Beilagen", "id":4 }
        ];
				
				var numberOfMeals = 5;
				
        var rawData = [];
        
        var week = [];
				var day = [];
				
				
				$gerichte.each(function(index, element) {
					
          var text = $(this).text().replace(/(\r\n|\n|\r)/gm,",").replace(/(\t)/gm,"").replace(/(\s+)/gm," ");
          
          /*
          text = text.replace("ü","&uuml;").replace("Ü","&Uuml;");
					text = text.replace("ä","&auml;").replace("Ä","&Auml;");
          text = text.replace("ö","&ouml;").replace("Ö","&Ouml;");*/
          
          if(text.length < 100) {
            rawData.push(text);
          }
				});
				
        // rebuild table as JavaScript arrays
        var nroCols = 5;
        var nroRows = rawData.length / nroCols;
        
        var table = [];
        
        for(row = 0; row < nroRows; row++) {
          
          var rowData = [];
          for(col = 0; col < nroCols; col++) {
            rowData.push(rawData[row*nroCols + col]);
          }
          
          table.push(rowData);
        }
        
        // Create meal objects by type (not by day)
        var mealsByType = [];
        var type = 0;
        
        for(row = 0; row < table.length; row++) {
          
          var currentMeals = [];
          
          for(col = 0; col < table[row].length; col++) {
            var cell = (table[row])[col];
            
            // process cell only if it does not contain a price
            if(cell.match(/€/) == null) {
              var price = "";
              
              // try to obtain value of current meal
              if(((row+1)*table[row].length+col) < (table.length * table[row].length)) {
                var nextCell = (table[row+1])[col];
                if(nextCell.match(/€/) != null) {
                  price = nextCell.split("€")[0];
                }
              }
              
              if(cell != undefined) {
                cell = cell.split(",");
              } else {
                cell = [""];
              }
              
              for(m=cell.length-1; m >= 0; m--) {
                cell[m] = $.trim(cell[m].replace(/\(\d+\)/g,""));
                if(cell[m].length < 2) {
                  cell.splice(m,1);
                }
              }
              
              var meal = {
                "text":cell,
                "price":price,
                "id":meals[type].id
              };
              
              currentMeals.push(meal);
            }
          }
          
          if(currentMeals.length > 0) {
            mealsByType.push(currentMeals);
            type = type + 1;
          }
        }
        
        // re-order meals to meals by day (week)
        for(d = 0; d < mealsByType[0].length; d++) {
          day = [];
          
          for(m = 0; m < mealsByType.length; m++) {
            day.push((mealsByType[m])[d]);
          }
          
          week.push(day);
        }
        
				return { "meals":meals, "week":week };
			});
      
			console.log(week_data);
			 
			var fs = require('fs');
			fs.write('mensa_new.json', JSON.stringify(week_data), 'w');
			
			phantom.exit();
		});
	}
});
