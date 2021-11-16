var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado)
{
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var cubeMaterial;
    switch(material)
    {
     case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe: alambrado});
      break;

     case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({color: color, wireframe: alambrado});
      break;

     case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({color: color, wireframe: alambrado});
      break;

     case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({color: color, wireframe: alambrado});
      break;

     case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({color: color, wireframe: alambrado});
      break;
    }
    
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    scene.add(cube);
    return(cube);
}
function init()
 {

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

   light = new THREE.PointLight(0xFFFF00); 
    light.position.set( -10, 12, 10 );            
    scene.add( light ); 


    Cubo = [];   
    var dim = prompt("Ingrese valor correspondiente a la dimension del cubo ","Valor"); 
    if(dim != null)
    {
	alert("Valor correspondiente a la dimension:" + dim); 
    } else 
    {
	alert("No se registro ningun valor."); 
    }

    delta= dim/2;
    diagonal= Math.sqrt(Math.pow(delta, 2)+ Math.pow(delta, 2));
    
    var Angulo = prompt("Ingrese en grados el valor correspondiente al angulo del cubo que desea rotar","Valor"); 
    if(Angulo != null)
    {
	alert("Valor correspondiente al angulo:" + Angulo); 
    } else 
    {
	alert("No se registro ningun valor."); 
    }
    ang_rad= (Angulo)*((2*Math.PI)/(360)); 
    Angulo_2= ((Math.PI)/4)-ang_rad;
    valor=(Math.cos(Angulo_2))*diagonal;

    Cubo.push(cubo(dim, dim, dim, 'green', 'Physical', false)); 

    Cubo.push(cubo(dim, dim, dim, 'red', 'Physical', false)); 

    Cubo.push(cubo(dim, dim, dim, 'blue', 'Physical', false)); 

    for(i=0; i<3; i++)
    {  

      Cubo[i].translateX(valor); 
      Cubo[i].translateZ(valor); 
      Cubo[i].translateY(delta); 
    }
    
    for(i=1; i<3; i++)
    { 

        escala= 1/(2*i); 
        unidades=dim/2+dim/4+((((dim/2)+(dim/4))/2))*(i-1);
        Cubo[i].scale.set(escala, escala, escala); 
        Cubo[i].translateY(unidades); 

    }

    Cubo[0].rotateY(ang_rad);
    Cubo[2].rotateY(ang_rad);


    camera.position.set(-3*dim, 4*dim, 3*dim);
    camera.lookAt(scene.position);

    document.getElementById("webgl-output").appendChild(renderer.domElement);

    renderer.render(scene, camera);
}