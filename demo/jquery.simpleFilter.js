$.fn.simpleFilter = function(options) {

	
	// first create a canvas that is the same size as the image
	var img = this[0]; // grab the first one
	var imgWidth = this.width();
	var imgHeight = this.height();

	var canvas = $("<canvas>");

	// set the acutal w and h
	canvas[0].width = imgWidth;
	canvas[0].height = imgHeight;

	var ctx = canvas[0].getContext('2d');

	// dump the image into the canvas
	// console.log(ctx);
	ctx.drawImage(img,0,0, imgWidth, imgHeight);

	// get image pixels 
	var pixels = ctx.getImageData(0,0, imgWidth, imgHeight);
	var data = pixels.data;


	// COLOR ARRAYS //

	var greyscaleMatrix = 
	 [
	 0.33, 0.34, 0.33, 0, 0,
	 0.33, 0.34, 0.33, 0, 0,
	 0.33, 0.34, 0.33, 0, 0,
	 0, 0, 0, 1, 0,
	 ];

	var subtleMatrix = 
	 [
	 1, 0, 0, 0, 40,
	 0, 1, 0, 0, 40,
	 0, 0, 1, 0, 40,
	 0, 0, 0, 1, 0,
	 ];

	var luxenMatrix = 
	 [
	 0.9, 0.2, 0, 0, 60,
	 0, 0.8, 0.1, 0, 60,
	 0, 0, 0.8, 0, 70,
	 0, 0, 0, 1, 0,
	 ];

	var dramaMatrix = 
	 [
	 1.1, 0.2, 0, 0, -20,
	 0, 1, 0.2, 0, -10,
	 0.1, 0, 1, 0, -10,
	 0, 0, 0, 1, 0,
	 ];

	var vintageMatrix = 
	 [
	 0.55, 0.4, 0, 0, 20,
	 0.1, 0.5, 0.5, 0, 20,
	 0, 0.5, 0.4, 0.1, 20,
	 0, 0, 0, 1, 0,
	 ];

	var beachMatrix =
	[
	1.1, 0, 0, 0, 20,
	0, 0.8, 0.5, 0, 20,
	0.1, 0, 0.8, 0.2, 20,
	0, 0, 0, 1, 0,
	];

	var fadeMatrix = 
	[
	1, 0, 0, 0, 20,
	0, 1, 0, 0, 20,
	0, 0, 1, 0, 20,
	0, 0, 0, 0.8, 0,
	];

	// GRADIENTS & SHADOWS //

	var radialGradient = ctx.createRadialGradient(200, 150, 100, 200, 150,400);
		 radialGradient.addColorStop(0, "transparent");
		 radialGradient.addColorStop(1, "rgba(0,0,0,1)");

	var shadowGradient1 = ctx.createLinearGradient(imgWidth, 0,0,0);
		shadowGradient1.addColorStop(0, "rgba(0,0,0,0.6)");
		shadowGradient1.addColorStop(0.5, "transparent");
		shadowGradient1.addColorStop(1, "rgba(0,0,0,0.6)");

	var shadowGradient2 = ctx.createLinearGradient(imgWidth, 0,0,0);
		shadowGradient1.addColorStop(0, "rgba(0,0,0,0.6)");
		shadowGradient1.addColorStop(0.5, "transparent");
		shadowGradient1.addColorStop(1, "rgba(0,0,0,0.6)");

	// LIGHT LEAKS //	

	var lightGradient1 = ctx.createLinearGradient(imgHeight, imgWidth,0,0);
		lightGradient1.addColorStop(0, "rgba(255,255,255,0.9)");
		lightGradient1.addColorStop(0.5, "transparent");
		lightGradient1.addColorStop(1, "rgba(138,243,255,0.5)");

	var lightGradient2 = ctx.createLinearGradient(5,imgHeight,imgWidth,50);
		lightGradient2.addColorStop(0, "rgba(250,37,193,0.1)");
		lightGradient2.addColorStop(0.5, "transparent");
		lightGradient2.addColorStop(1, "rgba(37,250,211,0.2)");	

	var lightGradient3 = ctx.createLinearGradient(imgWidth+10,imgHeight, 0,imgHeight);
		lightGradient3.addColorStop(0, "rgba(255,255,71,0.2)");
		lightGradient3.addColorStop(0.5, "transparent");
		lightGradient3.addColorStop(0.85, "rgba(255,255,255,0.2)");	
		lightGradient3.addColorStop(1, "transparent");


	 // COLOUR FUNCTIONS // 

	matrixFilter = function (pixels, m) {
	    for (var i = 0; i < data.length; i += 4) {
		     var r = data[i];
		     var g = data[i + 1];
		     var b = data[i + 2]; 
		     var a = data[i + 3];

		     data[i]   = r * m[0] + g * m[1] + b * m[2] + a * m[3] + m[4];
		     data[i+1] = r * m[5] + g * m[6] + b * m[7] + a * m[8] + m[9];
		     data[i+2] = r * m[10]+ g * m[11]+ b * m[12]+ a * m[13]+ m[14];
		     data[i+3] = r * m[15]+ g * m[16]+ b * m[17]+ a * m[18]+ m[19]; 
	   }
	 };

	greyscaleFilter = function () {
 	    for (var i = 0; i < data.length; i += 4) {
	 	    var avg = (data[i] + data[i + 1] + data[i + 2]) / 2.3;
 		    data[i]     = avg; // R
 		    data[i + 1] = avg; // G 
 		    data[i + 2] = avg; // B
		 }
		}; 

	oldFilter = function () {
	 	for (var i = 0; i < data.length; i += 4) {
	 	
	 		data[i] = data[i] + 40;
	 		data[i + 1] = data[i+1] + 20;
	 		data[i + 2] = data[i+2] * 2;
	 	}
	 };


	 // OPTIONS FOR FILTERS //

	if (options.filter === 'greyscale') {

		matrixFilter(pixels, greyscaleMatrix);

	} else if (options.filter === 'oldtimey') { 

		oldFilter();

	} else if (options.filter === 'beach') {

		matrixFilter(pixels, beachMatrix);

    } else if (options.filter === 'luxen') {

    	matrixFilter(pixels, luxenMatrix);

	} else if (options.filter === 'subtle') {

    	matrixFilter(pixels, subtleMatrix);

	} else if (options.filter === 'olive') {

		matrixFilter(pixels, dramaMatrix);

	} else if (options.filter === 'vintage') {

		matrixFilter(pixels, vintageMatrix);

	} else if (options.filter === 'fade') {

		matrixFilter(pixels, fadeMatrix);
	}

	ctx.putImageData(pixels, 0, 0);

	// PHOTO EFFECTS //

	if (options.shadow === 'vignette') {

		ctx.fillStyle = radialGradient;
		console.log(radialGradient);
		ctx.fillRect(0,0,imgWidth,imgHeight);

	} else if (options.shadow === 'drama') {

		ctx.fillStyle = shadowGradient1;
		ctx.fillRect(0,0,imgWidth,imgHeight);

	} else if (options.lightleak === 'lightleak01') {

		ctx.fillStyle = lightGradient1;
		ctx.fillRect(0,0,imgWidth,imgHeight);

	} else if (options.lightleak === 'lightleak02') {

		ctx.fillStyle = lightGradient2;
		ctx.fillRect(0,0,imgWidth,imgHeight);

	} else if (options.lightleak === 'lightleak03') {

		ctx.fillStyle = lightGradient3;
		ctx.fillRect(0,0,imgWidth,imgHeight);

	} 


	// get canvas data url 
	var data = canvas[0].toDataURL();
	// replace original image with canvas data 
	$(this).attr('src', data);

} // ends grammify


