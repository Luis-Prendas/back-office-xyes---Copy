import { getEnviroment } from "./getEnviroment";

const public_path_url = getEnviroment();


const FE_notifications_path = `${public_path_url}/notifications/api/v1`; 



export {
    FE_notifications_path
}