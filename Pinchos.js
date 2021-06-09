import * as THREE from './libs/three.module.js';

class Pinchos extends THREE.Object3D{
    constructor(){
        super();
        
        // Añadimos los pinchos despues de crearlos
        this.pinchos = this.crearSueloPinchos();
        this.add(this.pinchos);
    }

    // Método que crea una tira de pinchos
    crearSueloPinchos(){
        // Creamos varias serie de pinchos(cada serie de pinchos lo forman 5 individuales) y los colocamos 
        var pinchos1 = this.crearSeriePinchos();
        var pinchos2 = this.crearSeriePinchos();
        var pinchos3 = this.crearSeriePinchos();
        var pinchos4 = this.crearSeriePinchos();
        var pinchos5 = this.crearSeriePinchos();
        var pinchos6 = this.crearSeriePinchos();
        var pinchos7 = this.crearSeriePinchos();
        var pinchos8 = this.crearSeriePinchos();
        var pinchos9 = this.crearSeriePinchos();
        var pinchos10 = this.crearSeriePinchos();
        var pinchos11 = this.crearSeriePinchos();

        pinchos1.position.x = 9;
        pinchos2.position.x = 7;
        pinchos3.position.x = 5;
        pinchos4.position.x = 4;
        pinchos5.position.x = 3;
        pinchos6.position.x = 1;
        pinchos7.position.x = -1;
        pinchos8.position.x = -3;
        pinchos9.position.x = -5;
        pinchos10.position.x = -7;
        pinchos11.position.x = -9;

        // Añadimos esa serie de pinchos a un Object3D
        var sueloPinchos = new THREE.Object3D();
        sueloPinchos.add(pinchos1);
        sueloPinchos.add(pinchos2);
        sueloPinchos.add(pinchos3);
        sueloPinchos.add(pinchos4);
        sueloPinchos.add(pinchos5);
        sueloPinchos.add(pinchos6);
        sueloPinchos.add(pinchos7);
        sueloPinchos.add(pinchos8);
        sueloPinchos.add(pinchos9);
        sueloPinchos.add(pinchos10);
        sueloPinchos.add(pinchos11);

        return sueloPinchos;
    }

    // Método que une 5 pinchos en uno
    crearSeriePinchos(){
        // Creamos y colocamos los pinchos
        var pincho1 = this.crearPincho();
        var pincho2 = this.crearPincho();
        var pincho3 = this.crearPincho();
        var pincho4 = this.crearPincho();
        var pincho5 = this.crearPincho();

        pincho1.position.y = 1.5;
        pincho2.position.y = 1.5;
        pincho3.position.y = 1.5;
        pincho4.position.y = 1.5;
        pincho5.position.y = 1.5;
        
        pincho2.position.x = 0.5;
        pincho2.position.z = 0.5;
        pincho3.position.x = -0.5;
        pincho3.position.z = 0.5;
        pincho4.position.x = 0.5;
        pincho4.position.z = -0.5;
        pincho5.position.x = -0.5;
        pincho5.position.z = -0.5;
        
        // Añadimos los pinchos a un solo object3D
        var pinchos = new THREE.Object3D();
        pinchos.add(pincho1);
        pinchos.add(pincho2);
        pinchos.add(pincho3);
        pinchos.add(pincho4);
        pinchos.add(pincho5);

        return pinchos;
    }

    // Metodo que crea un pincho
    crearPincho(){
        // Creamos la textura del pincho
        var texture = new THREE.TextureLoader().load("/Wipe-In/texturas/metal.png");
        var metal = new THREE.MeshPhongMaterial ({map: texture});
        
        // Creamos la malla del pincho
        var pincho = new THREE.Mesh(new THREE.ConeGeometry(0.5,3,32), metal);

        return pincho;
    }

    // Método que devuelve el tipo de obstaculo
    getTipo(){
        return 2;
    }

    // Método update
    update () {
    }

}

  export { Pinchos };