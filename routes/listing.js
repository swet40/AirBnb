const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listings");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.route("/")
.get(
    wrapAsync(listingController.index)
)
// .post(isLoggedIn,
//     wrapAsync(listingController.createListing)
// )
.post(upload.single('listing[image]'),(req,res)=>{
    res.send(req.file);
})

//new route
router.get('/new',isLoggedIn,listingController.renderNewForm)


router.route("/:id")
//show route
.get(wrapAsync(listingController.showListing)
)
//update route
.put(isLoggedIn,
    isOwner,
    wrapAsync(listingController.updateListing)
)
.delete(isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
);


//edit route
router.get('/:id/edit',isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.renderEditForm)
);


module.exports = router;