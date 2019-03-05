window.onload = function() {
    document.getElementById("menu").onclick = function fun() {
        document.getElementById("sideNav").style.width = "250px";
    }
    
    document.getElementById("closeButton").onclick = function fun() {
        document.getElementById("sideNav").style.width = "0";
    }
    
}

