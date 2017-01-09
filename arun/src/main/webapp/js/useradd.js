$(document).ready(function(){
	 var div = document.createElement("div");
				     div.className = "bill";
				     
				    $("body")[0].appendChild(div);
					$(".bill")[0].appendChild(menu());
					$(".bill")[0].appendChild(billdetail());
					$(".bill")[0].appendChild(getall());
					//$(".bill")[0].appendChild(menuss());
					$(".bill")[0].appendChild(dates());
					
					
})
function billdetails() {
	var div = document.createElement("div");
	div.className = "b";
	var html = '<h3 class="fnss">Add Bill Details</h3>'
	+ '<table class="sss">'
	+  '<span id="errmsg"></span>'
	+ '<tr><td>BillNo<span>*<span>:</td><td> <input type=text id="abillno"  placeholder="BillNo.."></td></tr>'
	+ '<tr><td>SalesAmount<span>*</span>:</td> <td><input type=text id="asales" class="chars" placeholder="SalesAmount.." class="chars"></td></tr>'
	+ '<tr><td>PaidAmount<span>*</span>:</td><td> <input type=text id="apaid" class="chars" placeholder="PaidAmount.." class="chars"></td></tr>'
	+ '<tr><td>PrincipleAmount<span>*</span>:</td><td> <input type=text id="aprinciple" class="chars" placeholder="PrincipleAmount.." class="chars"></td></tr>'
	+ '<tr><td>Date<span>*</span>:</td><td> <input type=date id="date" class="add"></td></tr>'
	+ '<tr><td></td><td><button id="addsubmit">SUBMIT</button>&nbsp;&nbsp;'
	+ '<button id="update">UPDATE</button></td><tr>'
	+'</table>'
	
	$('.myDIV1')[0].innerHTML = html;
	return div;
}
function paidAmount(){
	var html = '<h3 class="fm">PaidAmount</h3>'
	+ '<table class="pamount">'
	+  '<span id="errmsg"></span>'
	+ '<tr><td>BillNo<span>*<span>:</td><td> <input type=text id="bno"  placeholder="BillNo.."></td></tr>'
	+ '<tr><td>SalesAmount<span>*</span>:</td> <td><input type=text id="sal"  placeholder="SalesAmount.." class="chars" readOnly></td></tr>'
	+ '<tr><td>AllreadyPaidAmount<span>*</span>:</td><td> <input type=text id="pai"  placeholder="OldPaidAmount.." class="chars" readOnly></td></tr>'
	+ '<tr><td>CreditAmount<span>*</span>:</td><td> <input type=text id="cred"  placeholder="CreditAmount.." class="chars" readOnly></td></tr>'
	+ '<tr><td>PaidAmount<span>*</span>:</td><td> <input type=text id="pais" class="chars" placeholder="PaidAmount.." class="chars"></td></tr>'
	+ '<td>Date<span>*</span>:</td><td> <input type=date id="dat" class="add"></td></tr>'
	+ '<tr><td></td><td><button id="psubmit">SUBMIT</button>&nbsp;&nbsp;</td><tr>'
	+'</table>'
	$('.myDIV1')[0].innerHTML = html;
	  }

function menuss() {
	var div = document.createElement("div");
	div.className = "paids";
	var paidVar="";
	paidVar += "<ul id=\"menu\">";
	paidVar += "<li><div  onclick=\"totalbill()\"><a href=\"#\" onclick=\"return piad();\"><img src=\"img/13.png\" width=\"20px\">TotalDetails<\/a></div><\/li>";
	paidVar += "<\/ul>";
	div.innerHTML = paidVar;
	return div;
}
function billdetail() {
	var div = document.createElement("div");
	div.className = "billdat";
	var paidVar="";
	paidVar += "<div class=\"dropdown\">";
	paidVar += "<div class=\"dropdtn\" id=\"divs\"><img src=\"img/0.png\" width=\"25\">BillDetail<\/div>";
	paidVar += "<div class=\"dropdown-content\">";
	paidVar += "<a href=\"#\"><div onclick=\"billdetails()\">Bill<\/div><\/a>";
	paidVar += "<a href=\"#\"><div onclick=\"paidAmount()\">PaidAmount<\/div><\/a>";
	//paidVar += "<a href=\"#\"><div onclick=\"myFunction3()\">Month<\/div><\/a>";
	//paidVar += "<a href=\"#\"><div onclick=\"myFunction4()\">Year<\/div><\/a>";
	paidVar += "<\/div>";
	paidVar += "<\/div>";
	div.innerHTML = paidVar;
	return div;
}
function getall() {
	var div = document.createElement("div");
	div.className = "get";
	var paidVar="";
	paidVar += "<div class=\"dropdown\">";
	paidVar += "<div class=\"dropdtn\" id=\"divs\"><img src=\"img/5.png\" width=\"20px\">BillTotal<\/div>";
	paidVar += "<div class=\"dropdown-content\">";
	paidVar += "<a href=\"#\"><div onclick=\"totalbill()\">Total<\/div><\/a>";
	paidVar += "<a href=\"#\"><div onclick=\"displaybill()\">AllBillDetail<\/div><\/a>";
	paidVar += "<a href=\"#\"><div onclick=\"myFunction3()\">Month<\/div><\/a>";
	paidVar += "<\/div>";
	paidVar += "<\/div>";
	div.innerHTML = paidVar;
	return div;
}

function dates() {
	var div = document.createElement("div");
	div.className = "dateweek";
	var paidVar="";
	paidVar += "<div class=\"dropdown\">";
	paidVar += "<div class=\"dropdtn\" id=\"divs\"><img src=\"img/8.png\" width=\"25\">DateDetail<\/div>";
	paidVar += "<div class=\"dropdown-content\">";
	paidVar += "<a href=\"#\"><div onclick=\"datestable()\">YesterDay<\/div><\/a>";
	paidVar += "<a href=\"#\"><div onclick=\"dateslist()\">Week<\/div><\/a>";
	paidVar += "<a href=\"#\"><div onclick=\"myFunction3()\">Month<\/div><\/a>";
	paidVar += "<a href=\"#\"><div onclick=\"myFunction4()\">Year<\/div><\/a>";
	paidVar += "<\/div>";
	paidVar += "<\/div>";
	div.innerHTML = paidVar;
	return div;
}
function menu() {
	var div = document.createElement("div");
	div.className = "menuBar";
	var strVar="";
	strVar += "<ul id=\"menu\">";
	strVar += "  <li style=\"float:right\"><a id=\"logout\"><img src=\"img/6.png\" width=\"20\">Logout<\/a><\/li>";
	strVar += "<\/ul>";
	div.innerHTML = strVar;
	return div;
}

function menus() {
	var div = document.createElement("div");
	div.className = "menuBars";
	var strVar="";
	strVar += "<ul id=\"menu\">";
	strVar += "<li><div id=\"opener\" onclick=\"displaybill()\"><a href=\"#\" onclick=\"return show();\"><img src=\"img/home.png\">AllBillDetail</a></div><\/li>";
	strVar += "<\/ul>";
	div.innerHTML = strVar;
	return div;
}
function dateslist(){
	
	var html = '<h3 class="fn">Date </h3>'
	+ '<table class="sss">'
	+  '<span id="errmsg"></span>'
	+ '<tr><td>Date<span>*</span>:</td><td> <input type=date id="date" class="add"></td></tr>'
	+ '<tr><td></td><td><button id="submit">SUBMIT</button>&nbsp;&nbsp;'
	+ '<button id="update">UPDATE</button></td><tr>'
	+'</table>';
	$('.myDIV1')[0].innerHTML = html;
	return div;
	
}

function datestable(){
	var html = '<h3 class="fn">Dates ...</h3>'
	+ '<table class="sss">'
	+  '<span id="errmsg"></span>'
	+ '<tr><td>From<span>*</span>:</td> <td><input type=date id="sales" ></td></tr>'
	+ '<tr><td>ToDate<span>*</span>:</td><td> <input type=date id="date" class="add"></td></tr>'
	+ '<tr><td></td><td><button id="submit">SUBMIT</button>&nbsp;&nbsp;'
	+ '<button id="update">UPDATE</button></td><tr>'
	+'</table>';
	$('.myDIV1')[0].innerHTML = html;
	return div;
	
}

