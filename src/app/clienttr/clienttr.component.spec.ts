import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienttrComponent } from './clienttr.component';

describe('ClienttrComponent', () => {
  let component: ClienttrComponent;
  let fixture: ComponentFixture<ClienttrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienttrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienttrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
