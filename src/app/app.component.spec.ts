import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the correct skills data', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.skills.length).toBeGreaterThan(0);
    expect(app.skills[0].category).toBe('Core Frontend');
  });

  it('should have experience data for Doceree', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.experience[0].company).toBe('Doceree');
  });

  it('should have three projects', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.projects.length).toBe(3);
  });

  it('should have three education entries', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.education.length).toBe(3);
  });

  it('should correctly report active section', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // Default active section should be hero
    expect(app.isActive('hero')).toBeTrue();
    expect(app.isActive('skills')).toBeFalse();
  });
});
