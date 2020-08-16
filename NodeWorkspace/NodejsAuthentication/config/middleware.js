// set the flash messages
module.exports.setFlash = (req, res, next) =>  {

    // console.log(req.flash('success'));
    // console.log(req.flash('error'));

    res.locals.flash = {
        'success' : req.flash('success'),
        'error' : req.flash('error')
    }


    next();
}

