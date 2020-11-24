//  this is the first custom middleware we're going to define here
module.exports.setFlash = function(req, res, next){
    res.locals.flash ={
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    next();
}