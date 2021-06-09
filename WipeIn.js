
import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Personaje } from './Personaje.js'
import { Pendulo } from './Pendulo.js'
import { Recorrido } from './Recorrido.js'
import { ParedObstaculo } from './ParedObstaculo.js'
import { Pinchos } from './Pinchos.js'

class WipeIn extends THREE.Object3D {
  constructor() {
    super();
    
    // Creamos todos los objetos de nuestro juego y los colocamos
    // Personaje, pendulos, recorrido, paredes, pinchos
    this.personaje = new Personaje();
    this.pendulo1 = new Pendulo();
    this.pendulo2 = new Pendulo();
    this.pendulo3 = new Pendulo();
    this.pendulo4 = new Pendulo();
    this.pendulo5 = new Pendulo();
    this.recorrido = new Recorrido();
    this.pared1 = new ParedObstaculo();
    this.pared2 = new ParedObstaculo();
    this.pinchos1 = new Pinchos();
    this.pinchos2 = new Pinchos();
    this.pinchos3 = new Pinchos();
    this.pinchos4 = new Pinchos();

    this.pendulo1.position.z = 10;
    this.pendulo1.position.y = 2;
    this.pendulo1.oscilar.start();

    this.pendulo2.position.z = 20;
    this.pendulo2.position.y = 2;
    this.pendulo2.rotation.y = Math.PI;
    this.pendulo2.oscilar.start();

    this.pendulo3.position.x = -6;
    this.pendulo3.position.z = 15;
    this.pendulo3.position.y = 2;
    this.pendulo3.rotation.y = Math.PI/2;
    this.pendulo3.oscilar.start();

    this.pendulo4.position.x = 6;
    this.pendulo4.position.z = 15;
    this.pendulo4.position.y = 2;
    this.pendulo4.rotation.y = -Math.PI/2;
    this.pendulo4.oscilar.start();

    this.pendulo5.position.z = 15;
    this.pendulo5.position.y = 2;
    this.pendulo5.rotation.y = Math.PI/4;
    this.pendulo5.oscilar1.start();
   
    this.pared1.position.z = 70;
    this.pared1.position.y = 3.5;
    this.pared1.rotation.y =  Math.PI;
    this.pared1.position.x = 12;
    this.pared1.setOrientacion(1);

    this.pared2.position.z = 100;
    this.pared2.position.y = 3.5;
    this.pared2.position.x = -12;
    this.pared2.setOrientacion(0);

    this.pinchos1.position.z = 25;
    this.pinchos2.position.z = 35;
    this.pinchos3.position.z = 45;
    this.pinchos4.position.z = 90;

    this.recorrido.position.y = -0.5;
    this.personaje.position.y = 2.3;

    // Creamos un array de obstaculos y los añadimos
    this.obstaculos = [];
    this.obstaculos.push(this.pendulo1);
    this.obstaculos.push(this.pendulo2);
    this.obstaculos.push(this.pendulo3);
    this.obstaculos.push(this.pendulo4);
    this.obstaculos.push(this.pendulo5);
    this.obstaculos.push(this.pared1);
    this.obstaculos.push(this.pared2);
    this.obstaculos.push(this.pinchos1);
    this.obstaculos.push(this.pinchos2);
    this.obstaculos.push(this.pinchos3);
    this.obstaculos.push(this.pinchos4);

    // Hacer que el recorrido reciba sombra
    this.recorrido.traverseVisible(function(unNodo){
      unNodo.receiveShadow = true;
    });

    // Hacer que el recorrido proyecte sombra
    this.personaje.traverseVisible(function(unNodo){
      unNodo.castShadow = true;
    });

    // Hacer que todos los obstáculos proyecten sombras
    this.obstaculos.forEach(function(obs){
      obs.traverseVisible(function(unNodo){
        unNodo.castShadow = true;
      });
    })

    // Añadimos todos los elementos al nodo hijo
    this.add(this.personaje);
    this.obstaculos.forEach(obstaculo => this.add(obstaculo));
    this.add(this.recorrido);
  }

  // Método que recibe la posición del checkpoint(x,y,z) y calcula las colisiones entre los obstáculos y el personaje
  colisiones(a,b,c){
    var posObstaculo = new THREE.Vector3();
    var posPersonaje = new THREE.Vector3();
    var that = this;
    var choca = false;
    
    // Obtenemos la posicion del personaje en el mundo
    this.personaje.getCuerpo().getWorldPosition(posPersonaje);

    // Recorremos el array de obstáculos
    this.obstaculos.forEach(function(obstaculo){
        // Obstaculo == péndulo
        if(obstaculo.getTipo() == 0){
          // Obtenemos la posicion de la bola del péndulo en el mundo
          obstaculo.getBola().getWorldPosition(posObstaculo);
          // Si se cumple la condición, la colisión se produce
          if(posObstaculo.distanceTo(posPersonaje) <= 3 ){
            // Movemos al personaje al checkpoint activo en ese momento
            that.personaje.position.set(a,b,c);
            choca = true;
        }
      // Obstaculo == paredObstaculos
      }else if(obstaculo.getTipo() == 1){
        // Recorremos los puños que hay en la pared
        obstaculo.punios.forEach(function(punio){
          // Obtenemos la posicion del puño del péndulo en el mundo
          punio.getPelotaPuño().getWorldPosition(posObstaculo);
          // Si se cumple la condición, la colisión se produce
          if(posObstaculo.distanceTo(posPersonaje) <= 3 ){
            // Movemos al personaje al checkpoint activo en ese momento
            that.personaje.position.set(a,b,c);
            choca = true;
          }
          // Obtenemos la posicion del 'brazo' del puño en el mundo
          punio.getPaloPuño().getWorldPosition(posObstaculo);

          // Comprobamos la posición del personaje y el 'brazo' para calcular la colision
          if(that.personaje.position.x > posObstaculo.x + punio.getEscalado().x  && obstaculo.getOrientacion() == 0)
            posObstaculo.setX(posObstaculo.x + punio.getPaloPuño().scale.x);
          else if(that.personaje.position.x < posObstaculo.x - punio.getEscalado().x  && obstaculo.getOrientacion() == 1)
            posObstaculo.setX(posObstaculo.x - punio.getPaloPuño().scale.x);
          else
            posObstaculo.setX(that.personaje.position.x);
          
            // Si se cumple la condición, la colisión se produce
          if(posObstaculo.distanceTo(posPersonaje) <= 1.5 ){
            // Movemos al personaje al checkpoint activo en ese momento
            that.personaje.position.set(a,b,c);
            choca = true;
          }

        })
      // Obstaculo == pinchos
      }else if(obstaculo.getTipo() == 2){
        // Obtenemos la posicion de la linea de pinchos en el mundo
        obstaculo.getWorldPosition(posObstaculo);
        // Obtenemos la posicion del personaje
        posObstaculo.setX(that.personaje.position.x);
        posObstaculo.setY(3);
        // Si se cumple la condición, la colisión se produce
        if(posObstaculo.distanceTo(posPersonaje) <= 1 ){
          // Movemos al personaje al checkpoint activo en ese momento
          that.personaje.position.set(a,b,c);
          choca = true;
        }
      }
    });

    return choca;
  }

  // Método para que el personaje no sobrepase el recorrido por los laterales
  bordesMapaLaterales(){
    var posPersonaje = new THREE.Vector3();
    this.personaje.getCuerpo().getWorldPosition(posPersonaje);

    if(posPersonaje.x <= -10){
      this.personaje.position.x = this.personaje.position.x + 1;
      return true;
    }

    if(posPersonaje.x >= 10){
      this.personaje.position.x = this.personaje.position.x - 1;
      return true;
    }

    return false;
  }

  // Método para que el personaje no sobrepase el recorrido por los laterales
  bordesMapaVerticales(){
    var posPersonaje = new THREE.Vector3();
    this.personaje.getCuerpo().getWorldPosition(posPersonaje);

    if(posPersonaje.z <= -2.5){
      this.personaje.position.z = this.personaje.position.z + 1;
      return true;
    }

    if(posPersonaje.z >= this.recorrido.longitudRecorrido()){
      this.personaje.position.z = this.personaje.position.z - 1;
      return true;
    }

    return false;
  }
  
  // Método para cambiar el color del personaje
  cambiarColorPersonaje(color){
    this.personaje.cambiarColor(color);
  }
  
  // Método update
  update () {
    TWEEN.update();
  }
}

export { WipeIn };
