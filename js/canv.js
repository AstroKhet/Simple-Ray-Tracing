//temp

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

class canv{
    constructor(width, height, cid){
        this.cid = cid;  // Canvas ID
        this.canvas = document.getElementById(cid);
        this.ctx = this.canvas.getContext("2d");

        this.ctx.canvas.width = width;
        this.ctx.canvas.height = height;

        this.width = width;
        this.height = height;
    }

    // putImage(arr2){
    //     // Takes in a 2D image array
    //     let imageData = this.ctx.createImageData(this.width, this.height);

    //     for (let i = 0; i < imageData.data.length; i += 4) {
    //         // Set RGBA values for each pixel (red, green, blue, alpha)
    //         let j = i/4;
    //         imageData.data[i + 0] = arr2[Math.floor(j / this.width)][j % this.width][0];
    //         imageData.data[i + 1] = arr2[Math.floor(j / this.width)][j % this.width][1];
    //         imageData.data[i + 2] = arr2[Math.floor(j / this.width)][j % this.width][2];
    //         imageData.data[i + 3] = arr2[Math.floor(j / this.width)][j % this.width][3];    
    //     }
        
    //     this.ctx.putImageData(imageData, 0, 0);
    // }

    drawPixel(x, y, rgb){
        this.ctx.fillStyle = this.rgbToHex(rgb);
        this.ctx.fillRect(x, y, 1, 1);
    }

    rgbToHex(rgb) {
        rgb.scale255();
        let [r, g, b] = rgb.values();
        // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
      }
}
