import { Component, inject } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent {
  readonly nzModalData: string = inject(NZ_MODAL_DATA);

  getVideo() {
    return `https://www.youtube.com/embed/${this.nzModalData}`;
  }
}
