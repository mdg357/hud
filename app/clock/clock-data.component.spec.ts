import { TestBed } from '@angular/core/testing';
import { ClockDateComponent } from './clock-date.component';

describe('Component: ClockDateComponent', () => {
    let component: ClockDateComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ClockDateComponent]
        });

        const fixture = TestBed.createComponent(ClockDateComponent);
        component = fixture.componentInstance;
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });
});
