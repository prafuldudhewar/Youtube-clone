export const API_KEY='AIzaSyB_0yIviJGx-_hdC4I6vPBLChv1rofN8k4';

export const value_converter = (value) => {
    if(value >= 1000000){
        return Math.floor(value/1000000) + "M";
    }else if(value >= 1000){
        return Math.floor(value/1000)+"K";
    }else{
        return value;
    }
}