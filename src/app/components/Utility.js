function truncateAddress(address) {
    return address.substring(0, 6) + "..." + address.substring(address.length - 6, address.length);
}

export default truncateAddress;