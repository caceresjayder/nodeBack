const ErrorHandler = (res: any, err: any) => {
    console.log(err);
    res.status(500).send({message: "something is wrong",
see: err.toString()})
}

export default ErrorHandler;