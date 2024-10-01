const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        message: `Route ${req.url} not found!`
    });
};

export default notFoundHandler;