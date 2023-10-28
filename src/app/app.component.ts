import { YoutubeService } from './youtube.service';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map } from 'rxjs/operators';
import { VideoComponent } from './video/video.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'youtube-trending';
  countries$ = this.youtubeService.getAllCountry().pipe(
    map((countries) => {
      const sortedCountries = countries.sort(function (a, b) {
        const nameA = a.name.common.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.common.toUpperCase(); // ignore upper and lowercase
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
        name: country.name.common,
        code: country.cca2,
      }));
    })
  );
  countryTrendingYoutubeVideos = this.youtubeService.trendingVideos;

  constructor(
    private youtubeService: YoutubeService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    console.log(this.countryTrendingYoutubeVideos());
  }

  openModal(video: any) {
    this.modal.create({
      nzTitle: video.snippet.title,
      nzContent: VideoComponent,
      nzClosable: false,
      nzCentered: true,
      nzCancelText: null,
      nzData: video.id,
    });
  }

  selectCountry(event) {
    console.log(event);
    let alpha2code = event.target.value;
    this.youtubeService.selectCountry(alpha2code);
  }
}
