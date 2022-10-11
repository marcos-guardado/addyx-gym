export const formatCurrency = (value: number, id: string) => {
  if (id !== "CI") return value;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MXN",
  });

  return formatter.format(value);
};
