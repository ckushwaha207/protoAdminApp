import { Directive, ElementRef, Input, Renderer, OnInit } from '@angular/core';
import { Principal } from './principal.service';

@Directive({
    selector: '[jhiHasAnyAuthority]'
})
export class HasAnyAuthorityDirective implements OnInit {

    @Input() jhiHasAnyAuthority: string;
    authority: string[];

    constructor(private principal: Principal, private el: ElementRef, private renderer: Renderer) {
    }

    ngOnInit() {
        this.authority = this.jhiHasAnyAuthority.replace(/\s+/g, '').split(',');

        if (this.authority.length > 0) {
            this.setVisibilitySync();
        }
        this.principal.getAuthenticationState().subscribe(identity => this.setVisibilitySync());
    }

    private setVisible () {
        this.renderer.setElementClass(this.el.nativeElement, 'invisible', false);
    }

    private setHidden () {
        this.renderer.setElementClass(this.el.nativeElement, 'invisible', true);
    }

    private setVisibilitySync () {

        let result = this.principal.hasAnyAuthority(this.authority);
        if (result) {
            this.setVisible();
        } else {
            this.setHidden();
        }
    }
}
