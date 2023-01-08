import { Component, ElementRef, NgZone, ViewChild } from "@angular/core";
import * as THREE from "three";

@Component({
  selector: "app-root",
  template: `<canvas #canvasElement></canvas>`
})
export class AppComponent {
  @ViewChild("canvasElement", {
    static: true
  })
  canvasElementRef: ElementRef<HTMLCanvasElement>;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      const renderer = new THREE.WebGLRenderer({
        canvas: this.canvasElementRef.nativeElement
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;

      function animate() {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
      }

      animate();
    });
  }
}
