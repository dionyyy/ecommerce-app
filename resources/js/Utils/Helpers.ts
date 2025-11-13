export function formatAmount(value: string | number, decimals: number = 2): string {
    if (value === null || value === undefined || value === "") return "0.00";

    const numericValue = Number(String(value));
    if (isNaN(numericValue)) return "0.00";

    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(numericValue);
}
