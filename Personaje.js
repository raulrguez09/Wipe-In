import * as THREE from './libs/three.module.js'
import * as TWEEN from './libs/tween.esm.js'


class Personaje extends THREE.Object3D {
  constructor() {
    super();
    
    var that = this;

    // Material o color para el personaje y su ojo
    this.materialPersonaje = new THREE.MeshPhongMaterial({color: 0xA7DA3D , side:THREE.DoubleSide});
    this.colorOjo = new THREE.MeshPhongMaterial({color: 0x367958,side:THREE.DoubleSide});
    
    
    // Animaciones para realizar el movimiento de brazos y piernas al andar
    var ori = {p: 0};
    var dest = {p: Math.PI/2};

    this.andar = new TWEEN.Tween(ori).to(dest,200).easing(TWEEN.Easing.Linear.None)
    .onUpdate(function(){
      that.anteBrazoDer.rotation.x = -(ori.p/2+Math.PI/2);
      that.anteBrazoIzq.rotation.x = -(-ori.p/2+Math.PI/2);
      that.brazoDer.rotation.x = -ori.p;
      that.brazoIzq.rotation.x = ori.p;
      that.piernaDer.rotation.x = ori.p;
      that.piernaIzq.rotation.x = -ori.p;
    });

    var ori1 = {p: Math.PI/2};
    var dest1 = {p: -Math.PI/2};
    
    this.andar2 = new TWEEN.Tween(ori1).to(dest1,200).easing(TWEEN.Easing.Linear.None)
    .onUpdate(function(){
      that.anteBrazoDer.rotation.x = -(ori1.p/2+Math.PI/2);
      that.anteBrazoIzq.rotation.x = -(-ori1.p/2+Math.PI/2);
      that.brazoDer.rotation.x = -ori1.p;
      that.brazoIzq.rotation.x = ori1.p;
      that.piernaDer.rotation.x = ori1.p;
      that.piernaIzq.rotation.x = -ori1.p;
    });

    var ori2 = {p: -Math.PI/2};
    var dest2 = {p: 0};
    
    this.andar3 = new TWEEN.Tween(ori2).to(dest2,200).easing(TWEEN.Easing.Linear.None)
    .onUpdate(function(){
      that.anteBrazoDer.rotation.x = -(ori2.p/2+Math.PI/2);
      that.anteBrazoIzq.rotation.x = -(-ori2.p/2+Math.PI/2);
      that.brazoDer.rotation.x = -ori2.p;
      that.brazoIzq.rotation.x = ori2.p;
      that.piernaDer.rotation.x = ori2.p;
      that.piernaIzq.rotation.x = -ori2.p;
    });

    this.andar.chain(this.andar2);
    this.andar2.chain(this.andar3);
    
    // Creamos todas las partes del personaje llamando a sus respectivas funciones
    this.boca = this.crearBoca();
    this.ojo = this.crearOjo();
    this.piernas = this.crearPiernas();
    this.brazos = this.crearBrazos();
    this.cuernos = this.crearCuernos();
    this.cuerpo = this.crearCuerpo();

    // Añadimos las partes del cuerpo al nodo
    this.add(this.cuernos);
    this.add(this.ojo);
    this.add(this.cuerpo);
    this.add(this.piernas);
    this.add(this.brazos);
    this.add(this.boca);
    
  }

  // Método que según el entero que reciba (int color), modifica la apariencia del personaje
  cambiarColor(color){
    if(color == 0){
      this.materialPersonaje = new THREE.MeshPhongMaterial({color: 0xA7DA3D , side:THREE.DoubleSide});
      this.colorOjo = new THREE.MeshPhongMaterial({color: 0x367958,side:THREE.DoubleSide});
    }
    else if(color == 1){
      this.materialPersonaje = new THREE.MeshPhongMaterial({color: 0x67C0D6 , side:THREE.DoubleSide});
      this.colorOjo = new THREE.MeshPhongMaterial({color: 0x67C0D6,side:THREE.DoubleSide});
    }
    else if(color == 2){
      this.materialPersonaje = new THREE.MeshPhongMaterial({color: 0x800000 , side:THREE.DoubleSide});
      this.colorOjo = new THREE.MeshPhongMaterial({color: 0x800000,side:THREE.DoubleSide});
    }
    else if(color == 3){
      let texture = new THREE.TextureLoader().load("/Wipe-In/texturas/especial.png");
      this.materialPersonaje = new THREE.MeshPhongMaterial ({map: texture , side:THREE.DoubleSide});
      this.colorOjo = new THREE.MeshPhongMaterial({map: texture,side:THREE.DoubleSide});
    }

    this.update();
  }

  // Método para devolver el cuerpo del personaje
  getCuerpo(){
    return this.cuerpo;
  }

  // Método para crear el cuerpo del personaje
  crearCuerpo(){
    let esfera = new THREE.SphereBufferGeometry(1,20,20);

    let cuerpo = new THREE.Mesh (esfera, this.materialPersonaje);
    cuerpo.scale.y=1.3;

    return cuerpo;
  }

  // Método que crea los cuernos del personaje 
  crearCuernos(){
    let rojo= new THREE.MeshPhongMaterial({color: 0xF9E4B7,side:THREE.DoubleSide});
    let cono = new THREE.ConeBufferGeometry(0.2,0.4,20,20);

    let cuerno1 = new THREE.Mesh (cono, rojo);
    cuerno1.rotateZ(THREE.Math.degToRad(30));
    cuerno1.position.set(-0.7,0,0);

    let cuerno2 = new THREE.Mesh (cono, rojo);
    cuerno2.rotateZ(THREE.Math.degToRad(-30));
    cuerno2.position.set(0.7,0,0);

    var cuernos = new THREE.Object3D();
    cuernos.add(cuerno1);
    cuernos.add(cuerno2);
    cuernos.position.set(0,1.1,0);

    return cuernos;
  }

  // Método que crea la boca del personaje 
  crearBoca(){
    let negro= new THREE.MeshPhongMaterial({color: 0x000000,side:THREE.DoubleSide});
    let torus = new THREE.TorusBufferGeometry(0.5,0.3,30,30,Math.PI);

    let boc = new THREE.Mesh (torus, negro);
    boc.rotateX(THREE.Math.degToRad(130));
    boc.position.set(0,-0.3,0);

    var boca = new THREE.Object3D();
    boca.add(boc);
    boca.position.set(0,0,0.3);

    return boca;
    
  }

  // Método que crea el único ojo del personaje 
  crearOjo(){
    let blanco= new THREE.MeshPhongMaterial({color: 0xFFFFFF,side:THREE.DoubleSide});
    let negro= new THREE.MeshPhongMaterial({color: 0x000000,side:THREE.DoubleSide});
    let esfera = new THREE.SphereBufferGeometry(1,20,20);

    let pupila = new THREE.Mesh (esfera, negro);
    pupila.scale.y=0.1;
    pupila.scale.z=0.01;
    pupila.scale.x=0.1;
    pupila.position.set(0,0,0.1);

    let iris = new THREE.Mesh (esfera, this.colorOjo);
    iris.scale.y=0.2;
    iris.scale.z=0.01;
    iris.scale.x=0.2;
    iris.position.set(0,0,0.09);

    let ojo = new THREE.Mesh (esfera, blanco);
    ojo.scale.y=0.5;
    ojo.scale.z=0.1;
    ojo.scale.x=0.5;
    

    var ojol = new THREE.Object3D();
    ojol.add(pupila);
    ojol.add(ojo);
    ojol.add(iris);
    ojol.position.set(0,0.4,0.85);
    ojol.rotateX(THREE.Math.degToRad(-15));


    return ojol;

  }

  // Método que crea los brazos del personaje 
  crearBrazos(){
    this.anteBrazoDer = this.crearAnteBrazo();
    this.anteBrazoDer.position.set(0,-0.8,0);
    this.anteBrazoDer.scale.x = -1;
    this.anteBrazoDer.rotateY(-Math.PI/2);

    this.anteBrazoIzq = this.crearAnteBrazo();
    this.anteBrazoIzq.position.set(0,-0.8,0);
    this.anteBrazoIzq.rotateY(Math.PI/2);

    let bd = this.crearBrazo();
    let bi = this.crearBrazo();

    this.brazoDer = new THREE.Object3D();
    this.brazoDer.add(this.anteBrazoDer);
    this.brazoDer.add(bd);
    this.brazoDer.position.set(-1,0,0);

    this.brazoIzq = new THREE.Object3D();
    this.brazoIzq.add(this.anteBrazoIzq);
    this.brazoIzq.add(bi);
    this.brazoIzq.position.set(1,0,0);

    this.brazos = new THREE.Object3D();
    this.brazos.add(this.brazoIzq);
    this.brazos.add(this.brazoDer);

    return this.brazos;
  }

  // Método que crea las piernas del personaje 
  crearPiernas(){
    this.piernaDer = this.crearPierna();
    this.piernaDer.position.set(-0.5,-1,0);

    this.piernaIzq = this.crearPierna();
    this.piernaIzq.scale.x = -1;
    this.piernaIzq.position.set(0.5,-1,0);


    this.piernas = new THREE.Object3D();
    this.piernas.add(this.piernaIzq);
    this.piernas.add(this.piernaDer);

    return this.piernas;
  }

  // Método que crea una pierna del personaje 
  crearPierna(){
    let cilindro = new THREE.CylinderBufferGeometry(0.2,0.2,1.2,20,20);
    let esfera = new THREE.SphereBufferGeometry(0.2,20,20);

    let a = new THREE.Mesh (cilindro, this.materialPersonaje);
    let cadera = new THREE.Mesh (esfera, this.materialPersonaje);

    let pie = this.crearPie();
    pie.position.set(0,-1.3,0);
    

    var femur = new THREE.Object3D();
    femur.add(a);
    femur.position.set(0,-0.6,0);


    var pierna= new THREE.Object3D();
    pierna.add(pie);
    pierna.add(cadera);
    pierna.add(femur);
    
    return pierna;
  }

  // Método que crea un pie del personaje 
  crearPie(){
    
    let esfera = new THREE.SphereBufferGeometry(0.25,20,20,0,Math.PI);
    let tapa = new THREE.CylinderBufferGeometry(0.25,0.25,0.01,30,30);
    esfera.rotateX(THREE.Math.degToRad(-90));
    let a = new THREE.Mesh (esfera, this.materialPersonaje);
    let b = new THREE.Mesh (tapa, this.materialPersonaje);

    let d1 = this.crearDedo();
    d1.position.set(0.15,0.05,0.15);
    d1.rotateX(THREE.Math.degToRad(90));
    d1.rotateZ(THREE.Math.degToRad(-30));
    let d2 = this.crearDedo();
    d2.position.set(0.05,0.05,0.13);
    d2.rotateX(THREE.Math.degToRad(90));
    d2.rotateZ(THREE.Math.degToRad(-15));
    let d3 = this.crearDedo();
    d3.position.set(0,0.05,0.08);
    d3.rotateX(THREE.Math.degToRad(90));
    d3.rotateZ(THREE.Math.degToRad(15));
    let d4 = this.crearDedo();
    d4.rotateX(THREE.Math.degToRad(90));
    d4.rotateZ(THREE.Math.degToRad(20));
    d4.position.set(-0.09,0.05,0);

    var pie = new THREE.Object3D();
    pie.add(a);
    pie.add(b);
    pie.add(d1);
    pie.add(d2);
    pie.add(d3);
    pie.add(d4);

    return pie;
  }

  // Método que crea un brazo del personaje 
  crearBrazo(){
    let cilindro = new THREE.CylinderBufferGeometry(0.1,0.1,0.8,20,20);
    let esfera = new THREE.SphereBufferGeometry(0.1,20,20);

    let a = new THREE.Mesh (cilindro, this.materialPersonaje);
    let hombro = new THREE.Mesh (esfera, this.materialPersonaje);

    var humero = new THREE.Object3D();
    humero.add(a);
    humero.position.set(0,-0.4,0);


    var brazo= new THREE.Object3D();
    //brazo.add(anteBrazo);
    brazo.add(hombro);
    brazo.add(humero);
    
    return brazo;

  }

  // Método que crea un antebrazo del personaje 
  crearAnteBrazo(){
    let cilindro = new THREE.CylinderBufferGeometry(0.1,0.1,1,20,20);
    let esfera = new THREE.SphereBufferGeometry(0.1,20,20);
    
    let br = new THREE.Mesh (cilindro, this.materialPersonaje);
    let codo = new THREE.Mesh (esfera, this.materialPersonaje);

    let mano = this.crearMano();
    mano.rotateX(THREE.Math.degToRad(180));
    mano.position.set(0,-1,0);
    
    var cubito = new THREE.Object3D();
    cubito.add(br);
    cubito.position.set(0,-0.5,0);

    var anteBrazo = new THREE.Object3D();
    anteBrazo.add(mano);
    anteBrazo.add(cubito);
    anteBrazo.add(codo);

    return anteBrazo;
  }

  // Método que crea una mano del personaje 
  crearMano(){
    let esfera = new THREE.SphereBufferGeometry(0.2,20,20);
    let a = new THREE.Mesh (esfera, this.materialPersonaje);

    let d1 = this.crearDedo();
    d1.position.set(0,0.05,0);
    d1.rotateX(THREE.Math.degToRad(-30));
    let d2 = this.crearDedo();
    d2.rotateZ(THREE.Math.degToRad(45));
    d2.position.set(-0.05,0.05,0);
    let d3 = this.crearDedo();
    d3.rotateZ(THREE.Math.degToRad(-45));
    d3.position.set(0.05,0.05,0);
    let d4 = this.crearDedo();
    d4.rotateX(THREE.Math.degToRad(60));
    d4.rotateZ(THREE.Math.degToRad(20));
    d4.position.set(-0.05,0,0);

    var mano = new THREE.Object3D();
    mano.add(a);
    mano.add(d1);
    mano.add(d2);
    mano.add(d3);
    mano.add(d4);

    return mano;
  }

  // Método que crea un dedo del personaje 
  crearDedo(){
    let matunias= new THREE.MeshPhongMaterial({color: 0xF9E4B7,side:THREE.DoubleSide});
    let cilindro = new THREE.CylinderBufferGeometry(0.05,0.05,0.3,20,20);
    let cono = new THREE.ConeBufferGeometry(0.05,0.1,20,20,false,0,2*Math.PI);

    let a = new THREE.Mesh (cono, matunias);
    let b = new THREE.Mesh (cilindro, this.materialPersonaje);
    
    var unia = new THREE.Object3D();
    unia.add(a);
    unia.position.set(0,0.35,0);

    var falange = new THREE.Object3D();
    falange.add(b);
    falange.position.set(0,0.15,0);
    
    var dedo = new THREE.Object3D();
    dedo.add(unia);
    dedo.add(falange);
    
    return dedo;
  }
  
  // Método update 
  update () {
    //TWEEN.update();
    this.remove(this.cuerpo);
    this.remove(this.piernas);
    this.remove(this.brazos);
    this.remove(this.ojo);
    this.piernas = this.crearPiernas();
    this.brazos = this.crearBrazos();
    this.cuerpo = this.crearCuerpo();
    this.ojo = this.crearOjo();
    this.add(this.cuerpo);
    this.add(this.piernas);
    this.add(this.brazos);
    this.add(this.ojo);
  }
}

export { Personaje };