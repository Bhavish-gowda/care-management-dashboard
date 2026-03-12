export const formatAddress = (address?: {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}) => {
  if (!address) return 'N/A';
  return `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`;
};

export const formatDateTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString();
};

