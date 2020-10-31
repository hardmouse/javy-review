import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGameComponent } from './video-game.component';

describe('VideoGameComponent', () => {
  let component: VideoGameComponent;
  let fixture: ComponentFixture<VideoGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
