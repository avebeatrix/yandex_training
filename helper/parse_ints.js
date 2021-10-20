let parse_ints = (line) => {
    return line.trim().split(' ').filter(val => val != '').map(input => parseInt(input));
}