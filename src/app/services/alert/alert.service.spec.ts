import { TestBed } from '@angular/core/testing';
import { Router, NavigationStart } from '@angular/router';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
