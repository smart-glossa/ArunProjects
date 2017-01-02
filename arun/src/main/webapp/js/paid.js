$(document).ready(function() {
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
