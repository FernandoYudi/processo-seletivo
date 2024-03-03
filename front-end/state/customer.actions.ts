export class CustomerAction {
  static readonly type = '[Customer] Add item';
  constructor(public payload: string) { }
}

export class AddCustomer {
  static readonly type = '[Customer] Add Customer';
  
  constructor(public payload: string) {}
}

export class ValidateForm {
  static readonly type = '[CustomerForm] Validate Form';
}
