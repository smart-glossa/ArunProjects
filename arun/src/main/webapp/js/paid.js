$(document).ready(function() {
	$(document).on("click", "#psubmit", function(key) {
		var billno = $("#bno").val();
		var paids = $("#paidss").val();
		var dat=$('#dat').val()
		if(billno===""){
			alert("Please Enter BillNo..");
			$("#billno").focus().css("outline-color","#ff0000");
			return;
		}
		if(paids==""){
			alert("Please Enter Your New PaidAmount..");
			$("#paidss").focus().css("outline-color","#ff0000");
			return;
		}
		if(dat==""){
			alert("Please Enter Your  Date..");
			$("#dat").focus().css("outline-color","#ff0000");
			return;
		}
		       
        	   var url ="/arun/bill?operation=getcedit&billno=" +billno+ "&paids=" +paids+"&dates="+dat; 
        	   $.ajax({
        	   	url : url,
        	   	type : 'POST'
        	   }).done(function(result) {
        	   	result = JSON.parse(result);
        	   	if (result.status == 1) {
        	   		alert("successfully Added");
        	   		$('#bno').val("");
        	   		$('#sal').val("");
        	   		$('#pai').val("");
        	   		$('#cred').val("");
        	   		$('#paidss').val("");
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
    $(document).on("keyup", "#bno", function() {
        var billno = $('#bno').val();
        if (billno != "") {  
            var getUrl = "/arun/bill?operation=getcredits&bno=" + billno;
            $.ajax({
                url: getUrl,
                type: "POST"
            })
            .done(function(result) {
                result = JSON.parse(result);
                var sal = result.sal;
                var pai=result.pai;
                var cred=result.cred;
                    //var date=result.date;
                    $("#sal").val(sal);
                    $("#pai").val(pai);
                    $("#cred").val(cred);
                  
                    
                })
            .fail(function(result) {
                alert("Some Errors Please Enter correct value");
            });
        } else {
            $("#sales").val("");
            $("#paid").val("");
            $("#principle").val("");
        }
    });
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
	      
	  }
	});
});
