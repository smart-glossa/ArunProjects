/*<!DOCTYPE html>
<html>
<head>
	<title></title>
	<style type="text/css">
		 #myDIV1 {
      width: 150px;
      height: 150px;
      background-color: lightblue;
      display: none;
    }


    #myDIV2 {
      width: 150px;
      height: 150px;
      background-color: lightblue;
      display: none;
    }


    #myDIV3 {
      width: 150px;
      height: 150px;
      background-color: lightblue;
      display: none;
    }


    #myDIV4 {
      width: 150px;
      height: 150px;
      background-color: lightblue;
      display: none;
    }
	</style>
	<script type="text/javascript">*/
	function myFunction1() {

        document.getElementById("myDIV1").style.display = 'block';

        document.getElementById("myDIV2").style.display = 'none';

        document.getElementById("myDIV3").style.display = 'none';

        document.getElementById("myDIV4").style.display = 'none';

    }

    function myFunction2() {

      document.getElementById("myDIV1").style.display = 'none';

      document.getElementById("myDIV2").style.display = 'block';

      document.getElementById("myDIV3").style.display = 'none';

      document.getElementById("myDIV4").style.display = 'none';

    }

    function myFunction3() {

      document.getElementById("myDIV1").style.display = 'none';

      document.getElementById("myDIV2").style.display = 'none';

      document.getElementById("myDIV3").style.display = 'block';

      document.getElementById("myDIV4").style.display = 'none';

    }

    function myFunction4() {

      document.getElementById("myDIV1").style.display = 'none'; 

      document.getElementById("myDIV2").style.display = 'none';

      document.getElementById("myDIV3").style.display = 'none';

      document.getElementById("myDIV4").style.display = 'block';

    }

	/*</script>
</head>
<body>
<p>Click button to see div.</p>

      <button onclick="myFunction1()">One</button>

      <button onclick="myFunction2()">Two</button>

      <button onclick="myFunction3()">Three</button>

      <button onclick="myFunction4()">Four</button>

    <div id="myDIV1">

      This is the div1 element.

    </div>

    <div id="myDIV2">

      This is the div2 element.

    </div>

    <div id="myDIV3">

      This is the div3 element.

    </div>

    <div id="myDIV4">

      This is the div4 element.

    </div>
</body>
</html>*/