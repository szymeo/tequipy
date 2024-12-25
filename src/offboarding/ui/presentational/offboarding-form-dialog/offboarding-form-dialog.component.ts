import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

type DialogData = {
  name: string;
};

@Component({
  selector: 'app-offboarding-form-dialog',
  standalone: false,
  templateUrl: './offboarding-form-dialog.component.html',
  styleUrl: './offboarding-form-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffboardingFormDialogComponent {
  private formBuilder = inject(FormBuilder);
  readonly form = this.formBuilder.group({
    receiverName: ['', Validators.required],
    employee: this.formBuilder.group({
      email: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      }),
      notes: [''],
    }),
  });

  constructor(
    private readonly dialogRef: MatDialogRef<OffboardingFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: DialogData
  ) {}

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.dialogRef.close(this.form.value);
  }
}
