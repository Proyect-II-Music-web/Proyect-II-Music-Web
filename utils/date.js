function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
module.exports = {
    //Este archivo exposta un objeto que su clave es una fuinción que formatea la fecha
    formatDate
}