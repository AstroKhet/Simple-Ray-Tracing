class canv {
    constructor(width, height, cid) {
        this.cid = cid; // Canvas ID
        this.canvas = document.getElementById(cid);
        this.ctx = this.canvas.getContext("2d");

        this.ctx.canvas.width = width;
        this.ctx.canvas.height = height;

        this.width = width;
        this.height = height;
    };

    drawPixel(x, y, rgb) {
        this.ctx.fillStyle = this.rgbToHex(rgb);
        this.ctx.fillRect(x, y, 1, 1);
    };

    rgbToHex(rgb) {
        rgb.scale255();
        let [r, g, b] = rgb.values();
        // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
    };
};
