#jQuery Plugin || simpleFilter.js 

simpleFilter.js is an easy-to-use jQuery plugin with a library of photo filters for your website. Choose from eight filters and six modifiers to create subtle effects.

#How to use it

Start by downloading the simpleFilter.js file and link it in your HTML document. Make sure you have the jQuery CDN linked as well!

&lt;script src=&quot;jquery.simpleFilter.js&quot;&gt;&lt;/script&gt;

If you'd only like to target some of your images, add classes to the images you'd like to target. Perhaps like this:

&lt;img src=&quot;myimage.jpg&quot; class=&quot;filter1&quot;&gt;

Target your image with jQuery and add your chosen filter and/or lightleak/shadow option to your document ready selection. Because the plugin needs time to edit your images, you need to start on window load. It should look like the example below. Alternatively, if you don't want to wait for a window load, look into using [images loaded]:https://github.com/desandro/imagesloaded. See below for a full list of image options.

<pre>$(window).load(function(){
$('img.filter1').simpleFilter({
	filter : 'fade',
	lightleak : 'lightleak01',
	shadow : 'drama'
	});
});</pre>

Ta-da! Your images should be fresh and fancy now. Colours manipulate differently on different images, so play around with different options to find a filter that suits the images best. Shadows and light leaks should be used sparingly.

#Full list of image options

##Filters: 
fade, vintage, greyscale, luxen, subtle, olive, oldtimey

##Light Leaks: 
lightleak01, lightleak02, lightleak03

##Shadows: 
vignette, drama

#Enjoy! 

###Note: if you are testing this from your computer, this won't work. You will need to run testing on a local server :)

Feel free to add to this plugin or suggest improvements as you see fit!