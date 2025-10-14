import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteContactListPage } from './favorite-contact-list-page';

describe('FavoriteContactListPage', () => {
  let component: FavoriteContactListPage;
  let fixture: ComponentFixture<FavoriteContactListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteContactListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteContactListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
