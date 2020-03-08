const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#f56a00',  '#ffbf00', '#00a2ae', '#f56a00', '#7265e6'];

export function getColorByFirstName(firstNameCode: string) {
    const numStr = firstNameCode.charCodeAt(0).toString().split('');
    const num = numStr[numStr.length - 1];
    return colorList[num];
}