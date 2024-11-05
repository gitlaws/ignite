import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [],
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent {
  capturedImage: string | undefined;
  tempPhotoURL: string | undefined;
  user: { photoURL: string | undefined };
  disabled: boolean = false;

  constructor() {
    this.user = { photoURL: undefined };
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    this.capturedImage = image.webPath;
  }
}
