const sendResponse = (res, status, data) => {
    res.status(status);
    if (status >= 200 && status <= 299) {
        let body = {
            status: true,
            message: data.message ? data.message : data.error,
            data: data.data ? data.data : data.body,
        };
        res.json({
            status: status,
            body: body,
        });
    } else if (status >= 400 && status <= 499) {
        let body = {
            status: false,
            error: data.message ? data.message : data.error,
            data: null,
        };
        res.json({
            status: status,
            body: body,
        });
    } else {
        data.status = true;
        res.json({ status: status, body: data });
    }
};

module.exports = { sendResponse };
