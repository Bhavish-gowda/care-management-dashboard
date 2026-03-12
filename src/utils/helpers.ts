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

export const downloadJson = (data: unknown, fileName: string) => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};


