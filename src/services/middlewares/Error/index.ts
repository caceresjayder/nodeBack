const ErrorHandler = (res: any, err: any) => {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify({message: "something is wrong",
see: err.toString()}))
}

export default ErrorHandler;