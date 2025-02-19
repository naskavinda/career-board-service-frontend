import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveComponent } from './remove.component';

describe('UserRemoveComponent', () => {
  let component: RemoveComponent;
  let fixture: ComponentFixture<RemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
