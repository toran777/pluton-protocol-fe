function truncateAddress(address) {
    if (address === undefined || address.length === 0)
        return ''
    
    return address.substring(0, 6) + "..." + address.substring(address.length - 6, address.length);
}

export default truncateAddress;