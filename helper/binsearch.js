let lLeftSearch = (l, r, check, checkparams) => {
    while (l < r) {
        let m = Math.floor((r + l) / 2);
        if (check(m, checkparams)) {
            r = m;				
        } else {
            l = m + 1;
        }
    }

    return l;
}

let lRightSearch = (l, r, check, checkparams) => {

    while (l < r) {
        let m = ((r + l + 1) / 2);
        if (check(m, checkparams)) {
            l = m;
        } else {
            r = m - 1;
        }
    }

    return l;
}