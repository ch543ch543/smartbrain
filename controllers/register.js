
const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password} = req.body; //deconstruction
    if(!email || !name || !password) {
        res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction( trx =>{
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login') //先insert into login table
        .returning('email')
        .then( loginEmail => { //再insert到user table
            return trx('users')
            .returning('*')
            .insert({ 
            email: loginEmail[0],
            name: name,
            joined: new Date()
        })
        .then(user => {
            res.json(user[0]);
        })
    })
    .then(trx.commit) //如果以上都pass就commit trx
    .catch(trx.rollback)
    })
        .catch( err => res.status(400).json('unable to register'))

}
    // bcrypt. hash(password, null, null, function(err,hash) {
    //     console.log(hash);
    // })
    // database.users.push(
    // {
    //     id: '125',
    //     name: name,
    //     email: email,
    //     password: password,
    //     entries: 0,
    //     joined:  new Date()
    // })

module.exports = {
    handleRegister: handleRegister
};