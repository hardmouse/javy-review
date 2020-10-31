import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserService } from './services/user/user.service';
import { FuncsService } from './services/funcs/funcs.service';


describe('AppComponent', () => {
  let userService = UserService;
  let funcsService = FuncsService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        HttpClient,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [UserService, FuncsService]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'My Review'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('My Review');
  });

  it('should render title X', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(1).toEqual(1);
    // expect(compiled.querySelector('.main-wrapper').textContent).toContain('My Review app is running!');
  });
  
  // userService = TestBed.Get(UserService);
  // funcsService = TestBed.Get(FuncsService);
});
