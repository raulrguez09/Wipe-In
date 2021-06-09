import * as THREE from './libs/three.module.js';
import * as TWEEN from './libs/tween.esm.js'

class Pendulo extends THREE.Object3D{
    constructor(){
        super();
        
        // Creamos las texturas de la cuerda y la bola
        var textbola= new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('texturas/pendulo.jpg')});
        var textcuerda= new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('texturas/cuerda.jpg')});
        
      /*****************PENDULO*****************/
        this.pendulo = new THREE.Object3D();

        var cuerda = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 12, 0.5), textcuerda);
        this.bola = new THREE.Mesh(new THREE.SphereGeometry(2,15,20), textbola);

        cuerda.position.y = -6;
        this.bola.position.y = -13;

        this.pendulo.add(cuerda);
        this.pendulo.add(this.bola);

        this.pendulo.position.y = 13;

        // Creamos dos animaciones del péndulo con distintas velocidades
        var that = this;
        var ori = {p:  -Math.PI/2};
        var dest = {p: Math.PI/2};
        
        this.oscilar = new TWEEN.Tween(ori).to(dest,2000).easing(TWEEN.Easing.Quadratic.InOut)
       .onUpdate(function(){
        that.pendulo.rotation.z = ori.p/2;
      }).yoyo(true).repeat(Infinity);

        this.oscilar1 = new TWEEN.Tween(ori).to(dest,1500).easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function(){
        that.pendulo.rotation.z = ori.p/2;
      }).yoyo(true).repeat(Infinity);

        this.add(this.pendulo);
    }

    // Devuelve el tipo de obstáculo que es
    getTipo(){
      return 0;
    }

    // Devuelve el object3D 'this.bola' para usarla en las colisiones
    getBola(){
      return this.bola;
    }

    // Método update
    update () {
    }
  
  }

  export { Pendulo };