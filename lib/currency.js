export const formatAmount = (amount) => {
    const currencyParts = (amount / 12).toFixed(2).toString().split(".");
    currencyParts[0] = currencyParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${currencyParts.join(".")}`;
};
