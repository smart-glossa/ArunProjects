$(document).ready(function() {
	$(document).on("click", "#psubmit", function(key) {
		var billno = $("#bno").val();
		var pais = $("#pais").val();
		var dat=$('#dat').val()
		if(billno===""){
			alert("Please Enter BillNo..");
			$("#bno").focus().css("outline-color","#ff0000");
			return;
		}
		if(pais==""){
			alert("Please Enter Your New PaidAmount..");
			$("#pais").focus().css("outline-color","#ff0000");
			return;
		}
		if(dat==""){
			alert("Please Enter Your  Date..");
			$("#dat").focus().css("outline-color","#ff0000");
			return;
		}
		       
        	   var url ="/arun/bill?operation=getcedit&billno=" +billno+ "&pais=" +pais+"&dates="+dat; 
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
        	   		$('#pais').val("");
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
                    $("#sal").val(sal);
                    $("#pai").val(pai);
                    $("#cred").val(cred);
                  
                    
                })
            .fail(function(result) {
                alert("Some Errors Please Enter correct value");
            });
        } else {
            $("#sales").val("");
            $("#pai").val("");
            $("#pais").val("");
            $("#cred").val("");
        }
    });
    /*keyup and keydown*/
    $(document).on("keyup","#bno",function(key){
      var td = $(this).parent();
      var tr = td.parent();
      if (key.which ==38) {
         tr.next().children().children("#pais").focus();
     }
 })
    $(document).on("keyup","#pais",function(key){
      var td = $(this).parent();
      var tr = td.parent();
      if (key.which == 38) {
         tr.next().children().children("#psubmit").focus();
     }
     
 })
    $('#psubmit').keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
	      
	  }
	});
});
