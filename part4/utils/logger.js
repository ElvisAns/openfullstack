const error = function (...param){
    console.error(...param);
}

const info = function(...param){
    console.log(...param)
}

module.exports = {info,error}