let countsort = seq => {
    let minval = Math.min(...seq)
    let maxval = Math.max(...seq)
    let k = (maxval - minval + 1)
    let count = new Array(k).fill(0);
    for (let now of seq) {
        count[now - minval] += 1
    }
    let nowpos = 0
    for (let val = 0; val < k; val++) {
        for (let i = 0; i < count[val]; i++) {
            seq[nowpos] = val+minval
            nowpos+=1
        }
    }
    return seq
}
console.log(countsort([5,4,5,3,2,1,5]));