import { GRAPH_URL, requestData } from "../utils/auth";

const getProfileDetails = async (req, res) => {
    const { accessToken } = req.session;

    const options = {
        url: `${GRAPH_URL}/me`,
        method: "get",
        params: {
            access_token: accessToken,
            fields: "name,email,photos{images},posts",
        }
    };
    
    const profile = await requestData(options);
    res.status(200).send(profile);
};

export {
    getProfileDetails
}