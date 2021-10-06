import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { PhotoFormComponent } from "./photo-form.component";

@NgModule({
    declarations: [PhotoFormComponent],
    imports: [
        CommonModule, 
        HttpClientModule
    ]
})
export class PhotoFormModule{}