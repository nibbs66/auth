<script lang="ts">

let color = $state('')
let logo = $state(null)
async function select_file(e) {

	if (e.target.files[0]) {
		logo = URL.createObjectURL(e.target.files[0])


	}

}


function on_click_image(event){

	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	const img = event.target;
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img, 0, 0, img.width, img.height);
	const imageData = ctx.getImageData(0, 0, img.width, img.height);
	const clickX = event.offsetX;
	const clickY = event.offsetY;
	const clickedPixelColor = getPixel(imageData, clickX, clickY);
	color = rgbToHex(clickedPixelColor[0], clickedPixelColor[1], clickedPixelColor[2]);
}
function getPixel(imageData, x, y) {
	const i = (x + y * imageData.width) * 4;
	return [imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]];
}

function componentToHex(c) {

	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
</script>

<div class="h-screen flex flex-col justify-center items-center space-y-4">
	<input type="file" accept="image/*" onchange={select_file} />
	{#if logo}
		<img id="logo" crossorigin="anonymous" src="{logo}" onclick="{on_click_image}">
		<div style="background: {color}" class="h-4 w-4 rounded-full"></div>
		<span>{color}</span>
	{/if}
</div>
