class DateConverter{
    converDate(arr){
        if(arr.length < 2 || arr.indexOf('-') === -1)
            return arr;
        const ver = arr.split('-');
        return ver[1] + "/" + ver[2] + "/" + ver[0];
    }

    extractDate(arr){
        if(arr.length < 2 || arr.indexOf('/') === -1)
            return arr;

        const ver = arr.split('/');
        ver[0] = ver[0].length === 1 ? "0" + ver[0] : ver[0];
        ver[1] = ver[1].length === 1 ? "0" + ver[1] : ver[1];
        return ver[2] + "-" + ver[0] + "-" + ver[1];
    }
}

export default DateConverter;