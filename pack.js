function packContent(func){
	var file_content = document.querySelector("#text").innerHTML;
	var zip = new JSZip();
	console.log(zip);
	zip.file("content.txt",file_content);
	var i = 0;
	var dat = window.image_data;
	console.log(zip);
	while (i < dat.length){
		zip.file(i + ".bmp",dat[i],{base64:true});
		i++;
	};
	console.log(zip);
	zip.generateAsync({type:"blob"}).then(function(content){
		saveAs(content);
		func(content);
	});
};
function uploadfile(){
	packContent(function(){
	});
};
onload = function(){
document.querySelector("#import_image").onchange = function(){
	var files = document.querySelector("#import_image").files;
	var i = 0;
	while (i < files.length){
		AsyncCallFunction(function(arr){
			var file = arr[0];
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(){
				var dataurl = reader.result;
				var base64 = dataurl.substring(dataurl.indexOf("base64,")+7);
				if (base64.length > 10 * 1024 * 1024){
					alert("图片大小不得大于10M");
					return false;
				};
				window.image_data[window.image_data.length] = base64;
				refreshImageDisplay();
			};
		},files[i]);
		i++;	
	};
};
	document.querySelector("#text").innerHTML = localStorage.fileContent;
	var len = parseInt(localStorage.data_image_length);
	var i = 0;
	while (i < len){
		window.image_data[i] = localStorage["data_image_" + i];
		i++;
	};
	refreshImageDisplay();
};
window.image_data = [];
function refreshImageDisplay(){
	var dat = window.image_data;
	var i = 0;
	document.querySelector("#show_import_image").innerHTML = "";
	while (i < dat.length){
		var blob = base64ToBlob("data:image/bmp;base64," + dat[i]);
		document.querySelector("#show_import_image").innerHTML += "<img src=" + window.URL.createObjectURL(blob) + " alt=Image data-image-id=" + i + " data-image-loadstatus=false>";
		i++;
		
	};
};















        const base64ToBlob = function(base64){
            let arr = base64.split(','), type = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type});
        };
