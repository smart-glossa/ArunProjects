$(document).ready(function() {
	if (getCookie("user") != undefined) {
		$("body")[0].appendChild(menu());
		$("body")[0].appendChild(menus());
		applyUser();
		$($(".mainArea")[0]).remove();
		var div = document.createElement("div");
		div.className = "mainArea";
		$("body")[0].appendChild(div);
		$(".mainArea")[0].appendChild( billdetails());
		$(".mainArea")[0].appendChild(totalbill());	
	}
	$(document).on("click", "#psubmit", function(key) {
		var billno = $("#billno").val();
		var paids = $("#paids").val();
		if(billno===""){
			alert("Please Enter BillNo..");
			$("#billno").focus().css("outline-color","#ff0000");
			return;
		}
		if(paids==""){
			alert("Please Enter Your PaidAmount..");
			$("#paids").focus().css("outline-color","#ff0000");
			return;
		}
		        //http://localhost:8080/arun/bill?operation=getcedit&billno=2&paids=2000
        	   //added user detail
        	   var url ="/arun/bill?operation=getcedit&billno=" +billno+ "&paids=" +paids; 
        	   $.ajax({
        	   	url : url,
        	   	type : 'POST'
        	   }).done(function(result) {
        	   	result = JSON.parse(result);
        	   	if (result.status == 1) {
        	   		alert("successfully Added");
        	   		$('#billno').val("");
        	   		$('#sales').val("");
        	   		$('#paid').val("");
        	   		$('#credit').val("");
        	   		$('#paids').val("");
        	   	} else {
        	   		//result = JSON.parse(result);
        	   		if (result.status == 0) {
        	   			alert("Error occurs");
        	   		}
        	   	}
        	   }).fail(function(result) {
        	   	alert("Please Check Details!..")
        	   });

        	})
	/*keyup and keydown*/
	$(document).on("keyup","#billno",function(key){
		var td = $(this).parent();
		var tr = td.parent();
		if (key.which == 13) {
			tr.next().children().children("#paids").focus();
		}
	})
	$(document).on("keyup","#paids",function(key){
		var td = $(this).parent();
		var tr = td.parent();
		if (key.which == 13) {
			tr.next().children().children("#paids").focus();
		}
		if(key.which == 13){
			tr.prev().children().children("#billno").focus();
		}
	})
	$('#psubmit').keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
	      //  alert('You pressed a "enter" key in textbox');  
	  }
	});
});
function paidAmount() {
	var div = document.createElement("div");
	div.className = "paid";
	var html = '<h3 class="fn">PaidAmount</h3>'
	+ '<table class="ss">'
	+  '<span id="errmsg"></span>'
	+ '<tr><td>BillNo<span>*<span>:</td><td> <input type=text id="billno"  placeholder="BillNo.."></td></tr>'
	+ '<tr><td>SalesAmount<span>*</span>:</td> <td><input type=text id="sales"  placeholder="SalesAmount.." class="chars" readOnly></td></tr>'
	+ '<tr><td>AllreadyPaidAmount<span>*</span>:</td><td> <input type=text id="paid"  placeholder="PaidAmount.." class="chars" readOnly></td></tr>'
	+ '<tr><td>CreditAmount<span>*</span>:</td><td> <input type=text id="credit"  placeholder="PaidAmount.." class="chars" readOnly></td></tr>'
	+ '<tr><td>PaidAmount<span>*</span>:</td><td> <input type=text id="paids" class="chars" placeholder="PrincipleAmount.." class="chars"></td></tr>'
	+ '<tr><td>Date<span>*</span>:</td><td> <input type=date id="date" class="add"></td></tr>'
	+ '<tr><td></td><td><button id="submit">SUBMIT</button>&nbsp;&nbsp;'
	
	+ '<button id="update">UPDATE</button></td><tr>'
	+'</table>';
	
	div.innerHTML = html;
	return div;
}
function menuss() {
	var div = document.createElement("div");
	div.className = "menuBars";
	var strVar="";
	strVar += "<ul id=\"menu\">";
	strVar += "  <li><div id=\"opener\" onclick=\"displaybill()\"><a href=\"#\" onclick=\"return show();\"><img src=\"img/7.png\">PaidAmount</a></div><\/li>";
	strVar += "<\/ul>";
	div.innerHTML = strVar;
	return div;
}
