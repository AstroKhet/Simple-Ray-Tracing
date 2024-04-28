
let cam = new camera();

let anime = new renderer(cam);
anime.generate(0);

function mainScene() {
    // Colour generation
    anime.render();
};

mainScene();
