import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { BerryConfig } from 'src/app/app-config';

@Component({
    selector: 'app-etudiant-configuration',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './etudiant-configuration.component.html',
    styleUrl: './etudiant-configuration.component.scss'
})
export class EtudiantConfigurationComponent implements OnInit {
    // public method
    styleSelectorToggle!: boolean; // open configuration menu
    setFontFamily!: string; // fontFamily

    constructor(private renderer: Renderer2) { }

    ngOnInit(): void {
        this.setFontFamily = BerryConfig.font_family;
        this.fontFamily(this.setFontFamily);
        this.styleSelectorToggle = false;
    }

    fontFamily(font: string) {
        this.setFontFamily = font;
        this.renderer.removeClass(document.body, 'Roboto');
        this.renderer.removeClass(document.body, 'Poppins');
        this.renderer.removeClass(document.body, 'Inter');
        this.renderer.addClass(document.body, font);
    }

    toggleStyle() {
        this.styleSelectorToggle = !this.styleSelectorToggle;
    }
} 