import { Injectable, ComponentRef } from '@angular/core';
// import { OverlayRef, Overlay, OverlayConfig } from '@angular/cdk/overlay';
// import { ComponentPortal } from '@angular/cdk/portal';
// import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';

@Injectable()
export class ConfirmationModalService {
  /** This property is used to store overlay reference. */
  // private overlayRef: OverlayRef;
  // constructor(private overlay: Overlay) { }


  // /** This method is invoke when user call this method. */
  // public openModal(): ConfirmationModalComponent {
  //   // set Configuration for overlay
  //   const overlayConfig: OverlayConfig = new OverlayConfig();
  //   overlayConfig.hasBackdrop = true;
  //   overlayConfig.positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
  //   // create overlay
  //   this.overlayRef = this.overlay.create(overlayConfig);
  //   // instance of conformation modal component
  //   const portal: ComponentPortal<ConfirmationModalComponent> = new ComponentPortal<ConfirmationModalComponent>(ConfirmationModalComponent);
  //   // attach component portal 
  //   const componentRef: ComponentRef<ConfirmationModalComponent> = this.overlayRef.attach(portal);
  //   this.overlayRef.backdropClick().subscribe(() => {
  //     this.overlayRef.detach();
  //   });
  //   return componentRef.instance
  // }

  /** This method is invoke when user call this method. */
  public closeModal(): void {
    // this.overlayRef.detach();
  }
}
