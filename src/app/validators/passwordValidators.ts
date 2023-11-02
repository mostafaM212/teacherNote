import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordAndRepeatedPasswordValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  let password = group.get('password')?.value;
  let repeatedPassword = group.get('repeatPassword')?.value;

  if (password == repeatedPassword) {
    return null;
  }

  return {
    invalid: true,
  };
};
