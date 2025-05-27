// contact type code = cap_type_contact_code
export const contactTypeCodeMap = {
  interim_worker: 809020000,
  agency_contact: 809020001,
  partner_contact: 809020002,
  // interim_worker_child: 809020003,
  // company_contact: 809020005,
} as const;

export type ContactTypes = keyof typeof contactTypeCodeMap;
