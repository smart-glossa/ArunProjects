$(document).ready(function() {
  $(document).on("click", "#logout", function(){
	    	//postToServer("logout");
	    	document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	    	window.location.href = '/arun/';
	    })   
  
  $(document).on("click","#addsubmit",function(key) {
    var billno = $('#abillno').val();
    var sales = $('#asales').val();
    var paid = $('#apaid').val();
    var prin=$('#aprinciple').val();
    var date=$('#date').val();
    if (billno === "") {
        alert("Please Enter BillNo");
        $("#abillno").focus().css("outline-color", "#ff0000");
        return;
    }
    if (sales === "") {
        alert("Please Enter Product sales");
        $("#asales").focus().css("outline-color", "#ff0000");
        return;
    }
    if (paid === "") {
        alert("Please Enter paid");
        $("#apaid").focus().css("outline-color", "ff0000");
        return;
    }
    if (prin === "") {
        alert("Please Enter principle");
        $("#aprinciple").focus().css("outline-color", "ff0000");
        return;
    }
    if(parseInt(paid)>parseInt(sales)){
        alert("Please max val");
        $("#asales").focus().css("outline-color","red");
        $("#apaid").focus().css("outline-color","red");
        return;
    }
    if(date==""){
       alert("Please select Date..");
       $('#date').focus().css('outline-color','ff0000');
       return;
   }
   
   var url = "/arun/bill?operation=add&abillno=" + billno + "&asales="+ sales + "&apaid=" + paid + "&aprinciple=" + prin+"&date="+date;
   $.ajax({
    url: url,
    type: 'POST'
}).done(function(result) {
    result =JSON.parse(result);
    if(result.status == 1) {
        alert("SuccessFully Added");
        $('#abillno').val("");
        $('#asales').val("");
        $('#apaid').val("");
        $('#aprinciple').val("");
              // totalbill() ;
           } else if(result.status == 0) {
            alert("Error occurs");
        }

    }).fail(function(result) {
           // console.log(result);
           alert("Please Check Details!..")
       });
})


  $(document).on("click", ".delete", function() {
	// If user not confirmed, then dont execute, just return back.
 if (!confirm(" Delete Are you sure?")) {
   return;
}
var tag = $(this).parent().parent();
var billno = tag.children(".billno")[0].innerHTML;
var url = "/arun/bill?operation=delete&abillno=" + billno;
$.ajax({
    url: url,
    type: 'POST'
}).done(function(result) {
   tag.remove();
}).fail(function(result) {
    console.log(result)
});
})
  $(document).on("keyup", "#abillno", function() {
    var billno = $('#abillno').val();
    if (billno != "") {
        var getUrl = "/arun/bill?operation=getOne&abillno=" + billno;
        $.ajax({
            url: getUrl,
            type: "POST"
        })
        .done(function(result) {
            result = JSON.parse(result);
            var asales = result.sales;
            var apaid=result.paid;
            var aprin=result.prin;
                    //var date=result.date;
                    $("#asales").val(asales);
                    $("#apaid").val(apaid);
                    $("#aprinciple").val(aprin);
                    
                })
        .fail(function(result) {
            alert("Some Errors Please Enter correct value");
        });
    } else {
        $("#asales").val("");
        $("#apaid").val("");
        $("#aprinciple").val("");
    }
});
  $(document).on("click", "#update", function() {
    var billno = $('#abillno').val();
    var sales=$('#asales').val();
    var paid=$('#apaid').val();
    var prin = $('#aprinciple').val();
    var date=$('#date').val();
    if (billno == "") {
        alert("Please Enter BillNo..");
        $("#abillno").focus().css("outline-color", "#ff0000");
        return;
    }
    if (sales === "") {
        alert("Please Enter From SalesAmount");
        $("#asales").focus().css("outline-color", "#ff0000");
        return;
    }
    if (paid === "") {
        alert("Please Enter To PaidAmount");
        $("#apaid").focus().css("outline-color", "#ff0000");
        return;
    }
    if (prin === "") {
        alert("Please Enter PrincipleAmount");
        $("#aprinciple").focus().css("outline-color", "ff0000");
        return;
    }if(parseInt(paid)>parseInt(sales)){
        alert("principleAmount maximum value Please Change minimum value");
        $("#asales").focus().css("outline-color","red");
        $("#apaid").focus().css("outline-color","red");
        return;
    }
    if(date===""){
       alert("Please select Date..");
       $('#date').focus().css("outline-color","ff0000");
       return;
       
   }
   var url = "/arun/bill?operation=update&abillno=" + billno + "&asales=" + sales + "&apaid=" + paid + "&aprinciple=" + prin+"&date="+date;
   $.ajax({
    url: url,
    type: 'POST'
})
   .done(function(result) {
       result = JSON.parse(result);
       if (result.status === 1) {
        alert("Updated SuccessFully");
        $('#abillno').val("");
        $('#asales').val("");
        $('#apaid').val("");
        $('#aprinciple').val("");
    } else {
        if (result.status === 0) {
            alert("Error occurs");
        }
    }
}).fail(function(result) {
    console.log(result);
});
   $(document).on('click','#datesub',function(){
		var cdate = $('#cdate').val();
		//http://localhost:8080/arun/bill?operation=daybill&cdate=01/03/2017
			var url = "/arun/bill?operation=daybill&cdate="+ cdate;
			$.ajax({
				url:url,
				type:'POST'
			})
			.done(function(result){
				res = JSON.parse(result);
		    	  var table = '<table>'
		    		  table += '<tr><th>BillNo</th><th>SalesAmount</th><th>PaidAmount</th><th>PrincipleAmount</th><th>CreditAmount</th><th>ShortageAmount</th><th>ExcessAmount</th></tr>';
		    	  if(result!="undefined"){
						for (var i = 0; i < res.length; i++) {
		    	    	  table += '<tr class="row">'
		    	    	  table += '<td>'+res.bnoamt +'</td>';
		    	    	  table += '<td >'+ res.salamt +'</td>';
		    	    	  table += '<td>'+ res.paidamt +'</td>';
		    	    	  table += '<td>'+ res.painamt +'</td>';
		    	    	  table += '<td>'+ res.credamt +'</td>';
		    	    	  table += '<td>'+ res.storamt +'</td>';
		    	    	  table += '<td>'+ res.examt +'</td>';
		    	    	  table += '<td>'+ res.dates +'</td>';
						}
		    	  }
		                  table += '</table>';  
		                  $('.myDIV1')[0].innerHTML = table;
			
	});
});

})
  /*keyup and keydown*/
  $(document).on("keyup","#billno",function(key){
    var td = $(this).parent();
    var tr = td.parent();
    if (key.which == 40) {
        tr.next().children().children("#sales").focus();
    }
})
  $(document).on("keyup","#sales",function(key){
    var td = $(this).parent();
    var tr = td.parent();
    if (key.which == 40) {
        tr.next().children().children("#paid").focus();
    }
    if(key.which == 38){
        tr.prev().children().children("#billno").focus();
    }
})
  $(document).on("keyup","#paid",function(key){
    var td = $(this).parent();
    var tr = td.parent();
    if (key.which == 40) {
        tr.next().children().children("#principle").focus();
    }
    if (key.which==38) {
        tr.prev().children().children("#sales").focus();
    }
})
  $(document).on("keyup","#principle",function(key){
    var td = $(this).parent();
    var tr = td.parent();
    if (key.which == 40) {
        tr.next().children().children("#date").focus();
    }
    if(key.which == 38){
        tr.prev().children().children("#paid").focus();
    }
})
  $(document).on("keyup","#date",function(key){
      var td=$(this).parent();
      var tr=td.parent();
      if(key.which==40){
         tr.next().children().children("#submit").focus();
     }
     if(key.which==38){
         tr.prev().children().children("#prin").foucs();
     }
 })
  $('#submit').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      //  alert('You pressed a "enter" key in textbox');  
  }
});
  $(document).on("keyup","#submit",function(key){
    var td = $(this).parent();
    var tr = td.parent();
    if (key.which == 40) {
        tr.next().children().children("#update").focus();
    }
    if(key.which == 38){
        tr.prev().children().children("#principle").focus();
    }
})
  //called when key is pressed in textbox not allowed char..
  $(".chars").keypress(function (e) {
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
          //display error message
          $("#errmsg").html("Please type Only Numbers.. ").show().fadeOut(4000);
          return false;
      }
  });

});