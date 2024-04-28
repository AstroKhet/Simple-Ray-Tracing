
let cam = new camera();

let anime = new renderer(cam);
anime.generate(1);

function mainScene() {
    // Colour generation
    anime.render();
};

mainScene();
