var scene = new THREE.Scene();

function cubo(x, y, z, r,g,b, material, alambrado)
 {
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var cubeMaterial;
    switch (material) 
    {
        case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({wireframe: alambrado });
                         cubeMaterial.color.setRGB(r,g,b);
            break;

        case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({ wireframe: alambrado });
        cubeMaterial.color.setRGB(r,g,b);
            break;

        case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({ wireframe: alambrado });
        cubeMaterial.color.setRGB(r,g,b);
            break;

        case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({ wireframe: alambrado });
        cubeMaterial.color.setRGB(r,g,b);
            break;

        case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({ wireframe: alambrado });
        cubeMaterial.color.setRGB(r,g,b);
                        
            break;
    }

    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    scene.add(cube);
    return (cube);
}

function init() 
{
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    var axes = new THREE.AxesHelper(50);
    scene.add(axes);

    Cubo = [];   

    var dimension = prompt('Escriba el valor correspondiente a la dimension del cubo',5);
    var dim1 = parseInt(dimension, 10);

    dim = dim1; 
    dimscale = dim / dim; 
    dim2 = dimscale / 2; 
    dim3 = dimscale / 4;  
    angulo=(Math.PI/6);
    angulo1=(Math.PI/4)-angulo;

    delta = dim / 2; 
    beta = dim + delta; 
    alpha2 = delta * 2.5; 
    alpha3 = delta * 3.25;

    Cubo.push(cubo(dim, dim, dim, 0.55, 0.55, 0, 'Lambert', false));
    Cubo.push(cubo(dim, dim, dim, 0.5, 1.8, 0, 'Lambert', false));
    Cubo.push(cubo(dim, dim, dim, 0.5, 1.8, 0, 'Lambert', false));

    Cubo[0].translateX(delta); 
    Cubo[0].translateY(delta);
    Cubo[0].translateZ(delta);

    Cubo[1].translateX(delta); 
    Cubo[1].translateY(alpha2); 
    Cubo[1].translateZ(delta);
    Cubo[1].scale.set(dim2, dim2, dim2); 

    Cubo[2].translateX(delta); 
    Cubo[2].translateY(alpha3); 
    Cubo[2].scale.set(dim3, dim3, dim3); 

    light = new THREE.PointLight(0xFFFF00); 
    light.position.set((dim/2)+dim, ((dim/3)*2)+dim*2, (dim*3)+dim*3); 
    scene.add(light);

    camera.position.set((dim/2)+dim, ((dim/3)*2)+dim*2, (dim*3)+dim*3);
    camera.lookAt(scene.position);

    document.getElementById("webgl-output").appendChild(renderer.domElement);

    renderer.render(scene, camera);
}