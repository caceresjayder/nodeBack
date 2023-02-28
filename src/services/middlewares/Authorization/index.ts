

const OnlyAdmin = (req: any, res: any, next: any) => {
    const user = req.user;
    if(user.role === 'ADMIN'){
        next()
    }
    else{
        res.status(403).send('Insufficient privileges')
    }
}

const OnlyWorker = (req: any, res: any, next: any) => {
    const user = req.user;
    if(user.role === 'WORKER'){
        next()
    }
    else{
        res.status(403).send('Insufficient privileges')
    }
}

const OnlyUser = (req: any, res: any, next: any) => {
    const user = req.user;
    if(user.role === 'USER'){
        next()
    }
    else{
        res.status(403).send('Insufficient privileges')
    }
}

const SameUserTranfer = (req: any, res: any, next: any) => {
    
}

export {OnlyAdmin, OnlyWorker, OnlyUser, SameUserTranfer}