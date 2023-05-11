const error = function (...param){
    if (process.env.NODE_ENV !== 'test')  console.error(...param);
}

const info = function(...param){
    if (process.env.NODE_ENV !== 'test')  console.log(...param) ;
}

module.exports = {info,error}