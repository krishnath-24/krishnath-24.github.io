// set the flash messages
module.exports.setFlash = (req, res, next) =>  {

    // create the locals flash object 
    res.locals.flash = {
        'success' : req.flash('success'),
        'error' : req.flash('error')
    }

    // pass on the callback
    next();
}

