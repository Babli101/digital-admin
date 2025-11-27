import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberList } from './subscriber-list';

describe('SubscriberList', () => {
  let component: SubscriberList;
  let fixture: ComponentFixture<SubscriberList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriberList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriberList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
