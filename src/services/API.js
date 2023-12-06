import axios from 'axios';

export default axios.create({
    baseURL: `https://rpc.sumotex.co`

})

// //    headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
// }