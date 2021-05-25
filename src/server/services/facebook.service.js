import { GRAPH_URL, requestData } from "../utils/auth";

const fbOptions = (accessToken, fields)  => ({
    url: `${GRAPH_URL}/me`,
    method: "get",
    params: {
        access_token: accessToken,
        fields,
    }
});

const getMyProfile = async (req, res) => {
    const { accessToken } = req.session;
    const options = fbOptions(accessToken, "name,email");
    const profile = await requestData(options);
    res.status(200).send(profile);
};

const getMyPosts = async (req, res) => {
    const { accessToken } = req.session;
    const options = fbOptions(accessToken, "posts{message,comments,attachments}");
    const posts = await requestData(options);
    res.status(200).send(posts);
};

const getMyPhotos = async (req, res) => {
    const { accessToken } = req.session;
    const options = fbOptions(accessToken, "photos{name,picture.type(large),comments}");
    const photos = await requestData(options);
    res.status(200).send(photos);
};

export {
    getMyProfile,
    getMyPosts,
    getMyPhotos
}