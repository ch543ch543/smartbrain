const handleProfile = (req, res, db) => {
    const { id } = req.params;  //取帶冒號的參數
    db.select('*').from('users').where({
      id: id
    })
    .then( user => {
        console.log(user)
        if(user.length){res.json(user[0]);
      } else {
          res.status(400).json('Not found')
      } //要另外設定條件式因為在javascript中empty array並非error，所以不會直接執行.catch，而是回傳empty array
    })
    .catch(err => res.status(400).json('error geting user'))
  //   if(!found){
  //       res.status(400).json('not found');
  //   } 
}

module.exports = {
    handleProfile: handleProfile
};