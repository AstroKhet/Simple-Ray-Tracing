// LETSGOOOO

let generateButton = document.getElementById("generate");
generateButton.addEventListener("click", mainScene);

let cam = new camera();

let anime = new animator(cam);
anime.generate(0);


function mainScene(){
    // Colour generation
    anime.render();
};

mainScene();


/* TODO:

- Implement defocus blur
- Implement animations
- Implement canvas to png to video conversion
- Upload onto GitHub

*/
