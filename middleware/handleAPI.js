const handleAPI = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        // res.json({
        //     status: err.statusCode,
        //     message: "" + err,
        // });
        // next(err);
    });
};
export default handleAPI;