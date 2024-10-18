cartrouter.post('/cart/add', Authenticated, async (req, res) => {
    const { medicineId, quantity } = req.body;

    if (!medicineId || !quantity) {
        return res.status(400).render('search', { error: 'Medicine ID and quantity are required.' });
    }

    try {
        // Check if there's an unpaid cart
        let existingCart= await Cart.findOne({ userId: req.user._id, paid: true });

        if(existingCart){  //if a paid cart exists in the current cart
           await Cart.deleteOne(existingCart);  //delete the existing cart
           let isExisting_in_prev= await prevCart.findOne({ userId: req.user._id, paid: true });
           if(isExisting_in_prev){
            await prevCart.deleteOne(isExisting_in_prev); //delete the duplicate cart in prevCart model
           }

        let inserted= await prevCart.create(existingCart);
        await inserted.save();
        await existingCart.save();
        }

        // If the user has already paid for their cart, create a new cart for new items
        else{
       let cart= await Cart.findOne({userId:req.user._id,paid: false});
        if (!cart) {
            cart = new Cart({
                userId: req.user._id,
                items: [{ medicineId: medicineId, quantity: parseInt(quantity) }],
                paid: false,
            });
        } else {
            // Find the medicine in the cart if it exists
            const itemExists = cart.items.find(item => item.medicineId.toString() === medicineId);

        const medicine = await Medicine.findById(medicineId);
        if (!medicine) {
            return res.status(404).render('search', { error: 'Medicine not found!' });
        }

            if (itemExists) {
                // Update the quantity if the medicine already exists in the cart
                if(medicine.stockQuantity< quantity)
                   itemExists.quantity += medicine.stockQuantity;
                else
                itemExists.quantity += parseInt(quantity);
            }
             else {
                // Otherwise, push the new medicine into the cart
                cart.items.push({ medicineId: medicineId, quantity: parseInt(quantity) });
            }
        }

        // Save the cart and medicine changes
        await cart.save();

        // Redirect user back to search page or any other appropriate page
        res.redirect('/search');
    }
    } catch (err) {
        console.error('Error adding to cart:', err.message);
        res.status(500).render('search', { error: 'An error occurred while adding to cart.' });
    }
});