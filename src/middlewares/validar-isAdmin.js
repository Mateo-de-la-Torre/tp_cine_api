

export const isAdminRole = (req, res, next) => {
    if (!req.user) {
        return res.status(500).send({ message: 'Se quiere verificar el rol sin validar el token' })
    }

    const { role, fullName } = req.user;

    if (role !== 'admin' && role !== 'superadmin') {
        return res.status(401).send({ message: `${fullName} no tiene privilegios de admin o superadmin` })
    }

    next()
}


export const isSuperAdminRole = (req, res, next) => {
    if (!req.user) {
        return res.status(500).send({ message: 'Se quiere verificar el rol sin validar el token' })
    }

    const { role, fullName } = req.user;

    if (role !== 'superadmin') {
        return res.status(401).send({ message: `${fullName} no tiene privilegios de superadmin` })
    }

    next()
}