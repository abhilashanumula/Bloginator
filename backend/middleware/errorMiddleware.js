// page not found
const notFound = (req,res,next)=>{
    const error = new error(`${req.originalUrl} - Not Found`);
    res.status(404);
    next(error);
}


// custom error middleware => err is the first arg
const errorHandler = (err, req, res, next) =>{
    //if custom error fired and status code is not set => status code is set to 500
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // mongoose error
    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        statusCode = 404;
        message = "Resource not found"
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

export { notFound, errorHandler };