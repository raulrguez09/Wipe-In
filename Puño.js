import * as THREE from '../libs/three.module.js';
import * as TWEEN from '../libs/tween.esm.js';
import { ThreeBSP } from '../libs/ThreeBSP.js';

class Puño extends THREE.Object3D{
    constructor(){
        super();

        // Creamos la textura del 'brazo' de nuestro puño
        var textpalo = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('texturas/palo.jpg')});
        this.punio = new THREE.Object3D();

        // Creamos el brazo y el puño y lo colocamos
        this.palo = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), textpalo);
        this.pelota = this.crearPuño();

        this.palo.rotation.z = Math.PI/2;
        this.palo.position.x = 1;

        this.pelota.position.x = 4;

        // Creamos un object3D auxiliar para el escalado del brazo
        this.aux = new THREE.Object3D();
        this.aux.scale.x = 2;
        this.aux.add(this.palo);

        this.punio.add(this.aux);
        this.punio.add(this.pelota);

        this.add(this.punio);
  
        // Creamos animaciones del puño con distintas velocidades
        var that = this;
        var ori = {p:  4};
        var dest = {p: 20};
        
        this.anim0 = new TWEEN.Tween(ori).to(dest,1000).easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function(){
        that.aux.scale.x = ori.p /2;
        that.pelota.position.set(ori.p, 0.0, 0.0);
      }).yoyo(true).repeat(Infinity);
        
        this.anim1 = new TWEEN.Tween(ori).to(dest,2000).easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function(){
        that.aux.scale.x = ori.p / 2;
        that.pelota.position.set(ori.p, 0.0, 0.0);
      }).yoyo(true).repeat(Infinity);

      
        this.anim2 = new TWEEN.Tween(ori).to(dest,3000).easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function(){
        that.aux.scale.x = ori.p/2;
        that.pelota.position.set(ori.p, 0.0, 0.0);
      }).yoyo(true).repeat(Infinity);

        this.anim3 = new TWEEN.Tween(ori).to(dest,1500).easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function(){
        that.aux.scale.x = ori.p/2;
        that.pelota.position.set(ori.p, 0.0, 0.0);
      }).yoyo(true).repeat(Infinity);

        this.anim4 = new TWEEN.Tween(ori).to(dest,2500).easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function(){
        that.aux.scale.x = ori.p/2;
        that.pelota.position.set(ori.p, 0.0, 0.0);
      }).yoyo(true).repeat(Infinity);
  }

    // Método que crea el bsp de puño
    crearPuño(){
      // Creamos la textura del 'guante' y del dedo pulgar
      var textpunio = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('texturas/punio.jpg'),side:THREE.DoubleSide});
      var rojo = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('texturas/dedo.jpg'),side:THREE.DoubleSide});
      
      // Creamos la base del objeto bsp (una esfera)
      var base = new THREE.SphereGeometry (2,30,30);

      // Creamos la parte que será el hueco para simular los dedos
      var hueco = new THREE.CylinderGeometry(1.5,1.5,4,20,20);
      hueco.rotateX(Math.PI/2);
      hueco.translate(-1,-1,0);

      // Creamos lo que será la parte plana de por encima de la mano
      var corteSup = new THREE.BoxGeometry(4,1,4);
      corteSup.translate(0,2,0);

      // Quitamos el hueco y la parte de encima de la mano a la esfera
      var p = new ThreeBSP(base).subtract(new ThreeBSP(hueco));
      p = p.subtract(new ThreeBSP(corteSup));
      
      var geometry = p.toGeometry();
      var model = new THREE.BufferGeometry().fromGeometry(geometry);
      var punio = new THREE.Mesh (model, textpunio);
      
      // Creamos el dedo pulgar y lo colocamos
      var dedo = new THREE.Mesh( new THREE.TorusGeometry(2,0.5,20,20,Math.PI/2),rojo);
      dedo.rotation.x = Math.PI/2;
      dedo.rotation.z = Math.PI/2;
      dedo.position.set(0.5,0,0.5);

      var pulgar = new THREE.Mesh( new THREE.SphereGeometry(0.5,20,20,Math.PI/2),rojo);
      pulgar.position.set(0.5,0,2.5);

      var pundef = new THREE.Object3D();
      pundef.add(punio);
      pundef.add(dedo);
      pundef.add(pulgar);
      
      
      return pundef;
    }
  
    // Método que devuelve el puño para las colisiones
    getPelotaPuño(){
      return this.pelota;
    }

    // Método que devuelve el palo para las colisiones
    getPaloPuño(){
      return this.palo;
    }

    // Método que devuelve el escalado
    getEscalado(){
      return this.aux.scale;
    }

    // Método update
    update () {
      TWEEN.update();
    }

  }

  export { Puño };