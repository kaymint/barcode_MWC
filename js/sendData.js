
	function getXMLHttp(){
		        if (window.XMLHttpRequest) {
		          // code for IE7+, Firefox, Chrome, Opera, Safari
		          xmlhttp=new XMLHttpRequest();
		        } else {  // code for IE6, IE5
		          xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		        }
		        return xmlhttp;
	}

    function addReading(){
	    var meter = $("#qr").val();
		var reading = $("#reading").val();

		xmlhttp = getXMLHttp();
		xmlhttp.onreadystatechange=function() {
	    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
	        
	      document.getElementById("results").innerHTML=xmlhttp.responseText;
	    }
	  }
	  xmlhttp.open("GET","http://cs.ashesi.edu.gh/~csashesi/class2016/kenneth-mensah/mobile_web/meter_mini.php?reading="+reading+"&qr="+meter,true);
	  xmlhttp.send();
	}

	function sendRequest(u){
        // Send request to server
        //u a url as a string
        //async is type of request
                                
        var obj=$.ajax({url:u,async:false});

        //Convert the JSON string to object
        var result=$.parseJSON(obj.responseText);
        return result;	//return object
    }

    function liveSearch(){
		var str = $("#liveSearch").val();

        if(str.length == 0){
            $("#searchDisplay").html("");
            return;
        }
        var obj = sendRequest("http://cs.ashesi.edu.gh/~csashesi/class2016/kenneth-mensah/mobile_web/search.php?st="+str);
        if(obj.result == 1){
            displaySearch(obj);
        }else if(obj.result == 0){
            $('#recentReadings').text(obj.result);
        }
	}

	function displaySearch(obj){
        var i = 0;
        var display = "";
        for(; i < obj.meters.length; i++){
            display += "<div data-role='listview'><h2> Meter: "+ obj.meters[i].meter_code 
                + "</h2>";
            display += "<p>Reading: "+ obj.meters[i].reading 
                + "</p></div>";
    		//$("#recentReadings").append('<li><a href="#">'+ obj.meters[i].reading 
    		//	+'</a></li>'); 
    	}
        $("#searchDisplay").html(display);  
    }

    function displayList(obj){
        var i = 0;
        var display = "";
        //$("#viewList").append('<ul data-role="listview">');
        for(; i < obj.meters.length; i++){
            display += "<div data-role='listview'><h2> Meter: "+ obj.meters[i].meter_code 
                + "</h2>";
            display += "<p>Reading: "+ obj.meters[i].reading 
                + "</p></div>";

    		//$("#viewList").append('<li><a href="#">'+ obj.meters[i].reading 
    			//+'</a></li>'); 
    	}

    	//$("#viewList").append('</ul>')
    		//$("#viewList").show();
         $("#viewList").html(display);   
    }

    function viewList(){
    	var obj = sendRequest("http://cs.ashesi.edu.gh/~csashesi/class2016/kenneth-mensah/mobile_web/view.php");
        if(obj.result == 1){
            displayList(obj);
        }else if(obj.result == 0){
            $('#viewList').text(obj.result);
        }
    }