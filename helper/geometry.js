let getAreaRectIntersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {
    let left = Math.max(x1, x3);
    let top = Math.min(y2, y4);
    let right = Math.min(x2, x4);
    let bottom = Math.max(y1, y3);

    let width = right - left;
    let height = top - bottom;

    if (width < 0 || height < 0)
        return 0;

    return width * height;
}