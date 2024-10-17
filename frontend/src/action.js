export function getUrl(val){
    let api = `http://localhost:5000/api${val}`;
    return api;
}
// module.exports = {getUrl}; //not work in es6 as i am using 'import' while importing not 'require'