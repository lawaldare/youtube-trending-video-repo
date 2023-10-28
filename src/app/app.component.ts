import { YoutubeService } from './youtube.service';
import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map } from 'rxjs/operators';
import { VideoComponent } from './video/video.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'youtube-trending';
  countries$ = this.youtubeService.getYouTubeRegionList().pipe(
    map((countries) => {
      const sortedCountries = countries.sort(function (a, b) {
        const nameA = a.snippet.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.snippet.name.toUpperCase(); // ignore upper and lowercase
        if (nameA > nameB) {
          return 1;
        }
        if (nameA < nameB) {
          return -1;
        }
        // names must be equal
        return 0;
      });
      return sortedCountries.map((country) => ({
        name: country.snippet.name,
        code: country.snippet.gl,
      }));
    })
  );
  countryTrendingYoutubeVideos = this.youtubeService.trendingVideos;
  alpha2Code: string;
  constructor(
    private youtubeService: YoutubeService,
    private modal: NzModalService
  ) {}

  openModal(video: any) {
    this.modal.create({
      nzTitle: video.snippet.title,
      nzContent: VideoComponent,
      nzClosable: false,
      nzCentered: true,
      nzOkText: null,
      nzData: video.id,
    });
  }

  selectCountry(event: string) {
    this.youtubeService.selectCountry(event);
  }
}
