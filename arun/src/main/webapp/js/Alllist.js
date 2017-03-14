function displaybill() {
	var url = "/arun/bill?operation=getall";
	var imgURL = "img/1.jpg";
	$.ajax({
		url : url,
		type : 'POST'
	})
	.done(
		function(result) {
			var array = JSON.parse(result);
			var query = "<table border= '2px solid black'>"
			query += "<tr><th>BillNo</th> <th>SalesAmount</th><th>PaidAmount</th><th>PrincipleAmount</th><th>CreaditAmount</th><th>ShortageAmount</th><th>Excess</th><th>Date</th><th>Delete</th></tr>"
			if(result!="undefined"){
				for (var i = 0; i < array.length; i++) {
					query += "<tr class='productRow'><td class='billno'>"
					+ array[i].billNO + "</td>";
					query += "<td>" + array[i].sales + "</td>";
					query += "<td>" + array[i].paid + "</td>";
					query += "<td>" + array[i].prin + "</td>";
					query += "<td>" + array[i].credit + "</td>";
					query += "<td>" + array[i].shortage + "</td>";
					query += "<td>" + array[i].Excess + "</td>";
					query += "<td>" + array[i].date + "</td>";
					query += "<td> <img class='delete' src='" + imgURL + "' width='25px' height='25px'/></td></tr>"
				}
			}
			query += "</table>"
			$(".myDIV1")[0].innerHTML =query;

		}).fail(function() {

		});

	
$(document).on("mousemove", ".billno", function(key) {
	var billno = $(this).val();
	var url="/arun/bill?operation=getOne&abillno=" + billno;
	$.ajax({
		url : url,
		type : 'POST'
	})
.done(
		function(result) {
			var array = JSON.parse(result);
	
		var query = "<div class='names'>";
		})
})
}
	function displaybills() {
		var url = "/arun/bill?operation=total";
		
		var imgURL = "img/1.jpg";
		$.ajax({
			url : url,
			type : 'POST'
		})
		.done(
			function(result) {
				var array = JSON.parse(result);
				var query = "<table border= '2px solid black'>"
				query += "<th>SalesAmount</th><th>PaidAmount</th><th>PrincipleAmount</th><th>CreaditAmount</th><th>ShortageAmount</th><th>Excess</th><th>Delete</th></tr>"
				if(result!="undefined"){
					for (var i = 0; i < array.length; i++) {
						
						query += "<td>.html<abbr title=" + array[i].sale + ">" + array[i].sales + "</td>";
						query += "<td>" + array[i].paid + "</td>";
						query += "<td>" + array[i].prin + "</td>";
						query += "<td>" + array[i].credit + "</td>";
						query += "<td>" + array[i].shortage + "</td>";
						query += "<td>" + array[i].excess + "</td>";
						query += "<td> <img class='delete' src='" + imgURL + "' width='25px' height='25px'/></td></tr>"
					}
				}
				query += "</table>"
				$("#alls")[0].innerHTML = query;

			}).fail(function() {

			});

		} 
		function totalbill() {
		//http://localhost:8080/arun/bill?operation=totlist
		var url = "/arun/bill?operation=totlist";
		$.ajax({
			url : url,
			type : 'POST'
		})
		.done(
			function(result) {
				var array = JSON.parse(result);
				var querys = "<table border= '2px solid black'>"
				querys += "<th>SalesAmount</th><th>PaidAmount</th><th>PrincipleAmount</th><th>CreditAmount</th><th>Shortage</th><th>Excess</th></tr>"
				if(result!="undefined"){
					for (var i = 0; i < array.length; i++) {
						
						querys += "<td>" + array[i].sales + "</td>";
						querys += "<td>" + array[i].paid + "</td>";
						querys += "<td>" + array[i].prin + "</td>";
						querys += "<td>" + array[i].credit + "</td>";
						querys += "<td>" + array[i].Shortage + "</td>";
						querys += "<td>" + array[i].Excess + "</td></tr>"
					//	query += "<td> <img class='delete' src='" + imgURL + "' width='25px' height='25px'/></td></tr>"
				}
			}
		querys += "</table>"
			$(".myDIV1")[0].innerHTML = querys;

		}).fail(function() {

		});

	} 
		
		