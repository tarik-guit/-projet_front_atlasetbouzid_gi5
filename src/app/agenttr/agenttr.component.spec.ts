import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenttrComponent } from './agenttr.component';

describe('AgenttrComponent', () => {
  let component: AgenttrComponent;
  let fixture: ComponentFixture<AgenttrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgenttrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenttrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
