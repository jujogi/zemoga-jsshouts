const saveSession = (req, res) => {
    const { user } = req.session.passport;
    req.session.accessToken = user.accessToken;
    req.session.user = user;
    req.session.save();
    res.cookie("jsshouts.session", req.cookies["jsshouts.session"]);
    res.redirect("/");
}

const destroySession = (req, res) => {
    req.session.destroy();
    res.redirect("/");
}

export {
    saveSession,
    destroySession,
}