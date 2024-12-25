export type OffboardingFormData = {
  receiverName: string;
  employee: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      country: string;
      zip: string;
    };
    notes: string;
  };
};
