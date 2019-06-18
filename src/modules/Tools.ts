export class Tools {

    static newArray(size: number, content:any = null){
        return new Array(size).fill(content)
    }

    static shuffle(a: any[]) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    static arraySum(arr: number[]){
        return arr.reduce( (sum, e) => sum + e, 0)
    }
}