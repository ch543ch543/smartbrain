const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission')
    }  
    db.select('email', 'hash').from('login')
        .where('email', '=',  email)
        .then( data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            console.log(isValid);
            if (isValid) {
                return db.select('*').from('users') //return to make the database know about it
                .where('email', '=', email)
                .then(user => {
                    console.log(user);
                    res.json(user[0])
                })
                .catch(err => res.status(400).json(err))
            } else{
            res.status(400).json(err)
            }
        })
        .catch(err => res.status(400).json(err))
}

module.exports = {
    handleSignin: handleSignin
}