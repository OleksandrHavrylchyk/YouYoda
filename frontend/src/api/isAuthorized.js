import { API } from './axiosConf';


async function isAuthorized(checkParam) {
    var tokenUser = localStorage.getItem('token');
    var datasend = {
        "token": tokenUser,
        "checkParam": checkParam
    }
    try {
        const response = await API.post(
            'user/check',
            datasend,
            {
                crossdomain: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if(response.status === 200){
                    if(response.data['data_status'])
                    {
                        if(response.data['data_status'] == 'authorized' && checkParam == 'authorized')
                            return true;
                        if(response.data['data_status'] == 'role' && checkParam == 'role')
                            return response.data;
                        
                    }
                    else
                        console.log(response.data);
                }
                else{
                    console.log(response);
                }
            });
        return response;
    } catch (error) {
        return false;
    }
}

export {isAuthorized}