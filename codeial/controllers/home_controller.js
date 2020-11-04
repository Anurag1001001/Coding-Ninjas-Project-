module.exports.home = function(req, res){
    res.render('home',{
        title:"Home"
    });
}

module.exports.app = function(req,res){
    return res.send("Hey I'm Anurag Tripathi");
}